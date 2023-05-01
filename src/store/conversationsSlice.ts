import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {api} from '../services/api';
import type {
  Conversation,
  ConversationCreateStore,
  Message,
  MessageCreateStore,
} from '../types/api';
import type {AppRootState, ConversationState} from '../types/store';

const initialState: ConversationState = {
  all: [],
};

function getConversationById(state: ConversationState, id: number) {
  return state.all.find(
    conversation => 'id' in conversation && conversation.id === id,
  );
}

function getConversationBySynchronizationKey(
  state: ConversationState,
  synchronizationKey: string,
) {
  return state.all.find(
    conversation => conversation.synchronizationKey === synchronizationKey,
  );
}

const slice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (
      state,
      {payload}: PayloadAction<ConversationCreateStore>,
    ) => {
      state.all.push(payload);
    },
    syncServerConversation(state, {payload}: PayloadAction<Conversation>) {
      const conversation = getConversationBySynchronizationKey(
        state,
        payload.synchronizationKey,
      );
      if (conversation) {
        Object.assign(conversation, payload);
      } else {
        state.all.push(payload);
      }
    },
    addMessage: (state, {payload}: PayloadAction<MessageCreateStore>) => {
      const conversation = getConversationById(state, payload.conversationId);
      // TODO wtf typescript
      conversation?.messages.push(payload);
    },
    syncServerMessage(state, {payload}: PayloadAction<Message>) {
      const conversation = getConversationById(state, payload.conversationId);
      const conversationMessage = conversation?.messages.find(
        message => message.synchronizationKey === payload.synchronizationKey,
      );
      if (conversationMessage) {
        Object.assign(conversationMessage, payload);
      } else {
        conversation?.messages.push(payload);
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getUserConversations.matchFulfilled,
      (state, {payload}) => {
        state.all = payload;
      },
    );
  },
});

export const {
  addConversation,
  syncServerConversation,
  addMessage,
  syncServerMessage,
} = slice.actions;

export const selectAllConversations = (state: AppRootState) =>
  state.conversations.all;
export const selectDirectConversationsUserIds = (state: AppRootState) =>
  state.conversations.all.reduce(
    (acc, conversation) =>
      conversation.isGroup
        ? acc
        : new Set([...acc, ...conversation.users.map(user => user.id)]),
    new Set<number>(),
  );
export const createSelectConversationById =
  (id: number) => (state: AppRootState) =>
    getConversationById(state.conversations, id);

export default slice.reducer;
