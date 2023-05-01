import type {Action, ThunkAction} from '@reduxjs/toolkit';
import type {store} from '../store';
import type {Conversation, ConversationCreateStore, User} from './api';
import type {WebSocketMessage} from './websocket';

export interface AuthState {
  user: User;
  accessToken: string | null;
}

export interface ConversationState {
  all: (Conversation | ConversationCreateStore)[];
}

export interface WebSocketState {
  queue: WebSocketMessage[];
}

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
// TODO is this needed?
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  Action<string>
>;
