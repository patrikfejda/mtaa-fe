import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {api} from '../services/api';
import type {AppRootState, AuthState} from '../types/store';

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        api.endpoints.login.matchFulfilled,
        api.endpoints.register.matchFulfilled,
      ),
      (state, {payload}) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      },
    );
  },
});

export const {logout} = slice.actions;

export const selectIsLoggedIn = (state: AppRootState) => state.auth.accessToken;

export default slice.reducer;
