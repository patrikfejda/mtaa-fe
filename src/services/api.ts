import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {REHYDRATE} from 'redux-persist';
import type {
  AuthResponse,
  Conversation,
  LoginRequest,
  RegisterRequest,
  Status,
  StatusDeleteRequest,
  StatusRequest,
  User,
  UserChangeRequest,
} from '../types/api';
import type {AppRootState} from '../types/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.REST_BASE_URL}/`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as AppRootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: request => ({url: 'auth/login', method: 'POST', body: request}),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: request => ({url: 'auth/register', method: 'POST', body: request}),
    }),
    getStatuses: builder.query<Status[], void>({
      query: () => 'statuses',
    }),
    createStatus: builder.mutation<Status, StatusRequest>({
      query: request => ({url: 'statuses', method: 'POST', body: request}),
    }),
    deleteStatus: builder.mutation<AuthResponse, StatusDeleteRequest>({
      query: ({id}) => ({url: `statuses/${id}`, method: 'DELETE'}),
    }),
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getUserConversations: builder.query<Conversation[], void>({
      query: () => 'users/me/conversations',
    }),
    updateUser: builder.mutation<User, UserChangeRequest>({
      query: request => {
        // TODO
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

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateStatusMutation,
  useDeleteStatusMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetUserConversationsQuery,
  useGetStatusesQuery,
} = api;
