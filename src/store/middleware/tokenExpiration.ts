import type {Middleware} from '@reduxjs/toolkit';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {logout} from '../authSlice';

// TODO test token expiration
export const unauthenticatedMiddleware: Middleware =
  ({dispatch}) =>
  next =>
  action => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      dispatch(logout());
    }

    return next(action);
  };
