import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {api} from '../services/api';
import type {User} from '../types/api';
import type {AppRootState, AuthState} from '../types/store';

const initialState: AuthState = {
  user: {} as User,
  accessToken: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = null;
      state.user = {} as User;
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
export const selectCurrentUser = (state: AppRootState) => state.auth.user;

export default slice.reducer;
