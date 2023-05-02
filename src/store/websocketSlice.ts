import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {WebSocketState} from '../types/store';
import type {WebSocketMessage} from '../types/websocket';

const initialState: WebSocketState = {
  queue: [],
};

const slice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    addToQueue: (state, {payload}: PayloadAction<WebSocketMessage>) => {
      state.queue.push(payload);
    },
    removeFromQueue: state => {
      state.queue.shift();
    },
    clearQueue: state => {
      state.queue = [];
    },
  },
});

export const {addToQueue, clearQueue, removeFromQueue} = slice.actions;

export default slice.reducer;
