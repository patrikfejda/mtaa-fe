import type {Action, ThunkAction} from '@reduxjs/toolkit';
import type {store} from '../store';
import type {User} from './api';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
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
