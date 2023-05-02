import type {Middleware} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import wsManager from '../../services/websocket';
import type {
  Conversation,
  ConversationCreateRequest,
  Message,
  MessageCreateRequest,
} from '../../types/api';
import type {AppRootState} from '../../types/store';
import type {WebSocketMessage} from '../../types/websocket';
import {
  WebSocketClientEvent,
  WebSocketServerEvent,
} from '../../types/websocket';
import {logout} from '../authSlice';
import {
  addConversation,
  addMessage,
  syncServerConversation,
  syncServerMessage,
} from '../conversationsSlice';
import {addToQueue, clearQueue, removeFromQueue} from '../websocketSlice';

export const websocketMiddleware: Middleware = ({getState, dispatch}) => {
  let isOffline = true;

  wsManager.onOpen(() => {
    const {accessToken} = (getState() as AppRootState).auth;
    const {queue} = (getState() as AppRootState).websocket;

    if (isOffline && accessToken) {
      isOffline = false;

      api.endpoints.getUsers.initiate(undefined, {
        subscribe: false,
        forceRefetch: true,
      });
      api.endpoints.getUserConversations.initiate(undefined, {
        subscribe: false,
        forceRefetch: true,
      });

      for (const message of queue) {
        wsManager.sendMessage(message);
      }

      dispatch(clearQueue());
    }
  });

  wsManager.onClose(event => {
    if (event.code !== 1003 && event.code !== 1008) {
      isOffline = true;
    }
  });
  wsManager.onMessage(event => {
    const message = JSON.parse(event.data) as WebSocketMessage;

    switch (message.event) {
      case WebSocketServerEvent.NEW_CONVERSATION:
        dispatch(syncServerConversation(message.data as Conversation));
        break;
      case WebSocketServerEvent.NEW_MESSAGE:
        dispatch(syncServerMessage(message.data as Message));
    }
  });

  return next => action => {
    const {accessToken} = (getState() as AppRootState).auth;
    const queueItem = (getState() as AppRootState).websocket.queue[0];

    if (accessToken && wsManager.isWorkerRunning() === false) {
      wsManager.startWorker(accessToken);
    }

    if (logout.match(action)) {
      wsManager.stopWorker();
    }

    if (
      addToQueue.match(action) &&
      queueItem &&
      wsManager.sendMessage(queueItem)
    ) {
      dispatch(removeFromQueue());
    }

    if (addConversation.match(action)) {
      const message: WebSocketMessage<ConversationCreateRequest> = {
        // @ts-ignore
        token: accessToken,
        event: WebSocketClientEvent.CREATE_CONVERSATION,
        data: action.payload,
      };
      dispatch(addToQueue(message));
    } else if (addMessage.match(action)) {
      const message: WebSocketMessage<MessageCreateRequest> = {
        // @ts-ignore
        token: accessToken,
        event: WebSocketClientEvent.CREATE_MESSAGE,
        data: action.payload,
      };
      dispatch(addToQueue(message));
    }

    return next(action);
  };
};
