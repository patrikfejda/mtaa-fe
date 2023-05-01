import type {AnyAction, Dispatch, Middleware} from '@reduxjs/toolkit';
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
import {
  addConversation,
  addMessage,
  syncServerConversation,
  syncServerMessage,
} from '../conversationsSlice';
import {addToQueue, removeFromQueue} from '../websocketSlice';

// TODO refactor all of this
let ws: WebSocket;
let intervalId;

export function addWebsocketListeners(dispatch: Dispatch<AnyAction>) {
  ws?.addEventListener('open', event => {
    // TODO remove
    console.log('websocketMiddleware open', event);
  });

  ws?.addEventListener('close', event => {
    // TODO remove
    console.log('websocketMiddleware close', event);
  });

  ws?.addEventListener('error', event => {
    console.log('websocketMiddleware error', event);
  });

  ws?.addEventListener('message', event => {
    const message = JSON.parse(event.data) as WebSocketMessage;

    // TODO remove
    console.log('websocketMiddleware recieved', message);

    switch (message.event) {
      case WebSocketServerEvent.NEW_CONVERSATION:
        dispatch(syncServerConversation(message.data as Conversation));
        break;
      case WebSocketServerEvent.NEW_MESSAGE:
        dispatch(syncServerMessage(message.data as Message));
    }
  });
}

export const websocketMiddleware: Middleware = ({getState, dispatch}) => {
  return next => action => {
    // TODO maybe memoize
    const {accessToken} = (getState() as AppRootState).auth;

    // TODO setInterval here
    // TODO Get base url from .env
    if (!intervalId && accessToken) {
      // TODO remove
      intervalId = setInterval(() => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
          // TODO remove
          console.log('websocketMiddleware setInterval');
          ws = new WebSocket(
            `ws://localhost:8000/v2/conversations/ws?token=${accessToken}`,
          );
          addWebsocketListeners(dispatch);
        }
      }, 1000);
    }

    if (addToQueue.match(action)) {
      // TODO remove
      console.log(
        'websocketMiddleware sending',
        JSON.stringify(action.payload),
      );

      ws?.send(JSON.stringify(action.payload));
      dispatch(removeFromQueue());
    } else if (addConversation.match(action)) {
      const message: WebSocketMessage<ConversationCreateRequest> = {
        // TODO accessToken could be null
        token: accessToken,
        event: WebSocketClientEvent.CREATE_CONVERSATION,
        data: action.payload,
      };
      dispatch(addToQueue(message));
    } else if (addMessage.match(action)) {
      const message: WebSocketMessage<MessageCreateRequest> = {
        // TODO accessToken could be null
        token: accessToken,
        event: WebSocketClientEvent.CREATE_MESSAGE,
        data: action.payload,
      };
      dispatch(addToQueue(message));
    }

    return next(action);
  };
};
