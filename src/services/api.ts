import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {AuthResponse, StatusResponse, LoginRequest, RegisterRequest, UserChangeRequest, StatusRequest} from '../types/api';
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
    status: builder.mutation<AuthResponse, StatusRequest>({
      query: request => ({url: 'statuses', method: 'POST', body: request}),
    }),
    getStatuses: builder.query<StatusResponse[], void>({
      query: () => 'statuses',
    }),
    changeUser: builder.mutation<AuthResponse, UserChangeRequest>({
      query: (request) => {
        const formData = new FormData();
        formData.append('displayName', request.displayName);
        if (request.profilePhoto) {
          formData.append('profilePhoto', request.profilePhoto);
        }
        return {
          url: 'users/me',
          method: 'PUT',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useStatusMutation, useChangeUserMutation, useGetStatusesQuery } = api;
