import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import type {Storage} from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {api} from '../services/api';
import authReducer, {logout} from './authSlice';
import conversationsReducer from './conversationsSlice';
import {toastMiddleware} from './middleware/toast';
import {unauthenticatedMiddleware} from './middleware/tokenExpiration';
import {websocketMiddleware} from './middleware/websocket';
import websocketReducer from './websocketSlice';

const mmkv = new MMKV();

const storage: Storage = {
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    mmkv.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage,
};

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  conversations: conversationsReducer,
  websocket: websocketReducer,
});

// @ts-ignore
const rootReducer = (state, action) => {
  if (logout.match(action)) {
    // Reset the entire store on logout
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      api.middleware,
      toastMiddleware,
      unauthenticatedMiddleware,
      websocketMiddleware,
    ]),
});

export const persistor = persistStore(store);
