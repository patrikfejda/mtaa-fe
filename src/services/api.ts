import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {AuthResponse, LoginRequest, RegisterRequest} from '../types/api';
import type {AppRootState} from '../types/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // TODO .env file for this (react-native-config)
    baseUrl: 'http://localhost:8000/v2/',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as AppRootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: request => ({url: 'auth/login', method: 'POST', body: request}),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: request => ({url: 'auth/register', method: 'POST', body: request}),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = api;
