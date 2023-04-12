import type {Middleware} from '@reduxjs/toolkit';
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {Toast} from 'native-base';
import React from 'react';
import AppToast from '../../components/AppToast';

export const toastMiddleware: Middleware = () => next => action => {
  const serverErrorMessage = action.payload?.data?.detail;

  if (isRejectedWithValue(action) && typeof serverErrorMessage === 'string') {
    Toast.show({
      render: () => <AppToast text={serverErrorMessage} type="error" />,
    });
  }

  return next(action);
};
