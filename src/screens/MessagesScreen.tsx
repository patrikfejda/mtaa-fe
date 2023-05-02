import type {Draft} from '@reduxjs/toolkit';
import {
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useRef} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useImmerReducer} from 'use-immer';
import {v4 as uuidv4} from 'uuid';
import AppMessage from '../components/AppMessage';
import {selectCurrentUser} from '../store/authSlice';
import {
  addMessage,
  createSelectConversationById,
} from '../store/conversationsSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {MessageCreateStore, User} from '../types/api';
import type {RootStackScreenProps} from '../types/navigation';

type InitialMessagePayload = {currentUser: User; conversationId: number};

function createInitialMessage({
  currentUser,
  conversationId,
}: InitialMessagePayload): MessageCreateStore {
  return {
    synchronizationKey: uuidv4(),
    conversationId,
    text: '',
    author: currentUser,
  };
}

type Action =
  | {type: 'reseted'; payload: InitialMessagePayload}
  | {type: 'message_sent'; payload: string};

function reducer(
  messageDraft: Draft<MessageCreateStore>,
  {type, payload}: Action,
) {
  switch (type) {
    case 'reseted':
      return createInitialMessage(payload);
    case 'message_sent':
      messageDraft.text = payload;
  }
}

export default function MessagesScreen({
  route: {
    params: {conversationId},
  },
}: RootStackScreenProps<'Messages'>) {
  const currentUser = useAppSelector(selectCurrentUser);
  const scrollViewRef = useRef<typeof ScrollView>();

  const dispatch = useAppDispatch();

  const conversation = useAppSelector(
    createSelectConversationById(conversationId),
  );

  const [newMessage, newMessageDispatch] = useImmerReducer(
    reducer,
    {currentUser, conversationId},
    createInitialMessage,
  );

  function onSendPress() {
    dispatch(addMessage(newMessage));
    newMessageDispatch({
      type: 'reseted',
      payload: {currentUser, conversationId},
    });
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          // @ts-ignore
          scrollViewRef.current?.scrollToEnd({animated: false})
        }>
        <VStack px="2" pb="8" space="6">
          {conversation?.messages.length === 0 && (
            <Text color="text.50" mt="2">
              You don't have any messages yet.
            </Text>
          )}
          {conversation?.messages.map(message => (
            <AppMessage
              key={message.synchronizationKey}
              message={message}
              isMine={message.author.id === currentUser.id}
              isHighlighted={'id' in message}
            />
          ))}
        </VStack>
      </ScrollView>

      <HStack
        bgColor="muted.800"
        position="relative"
        overflow="scroll"
        px="2"
        py="5px">
        <Input
          onChangeText={value =>
            newMessageDispatch({type: 'message_sent', payload: value})
          }
          maxLength={256}
          multiline={true}
          scrollEnabled={true}
          value={newMessage.text}
          bgColor="muted.700"
          flex="1"
          minHeight="10"
          maxHeight="100px"
          pl="2"
          pr="10"
          size="md"
          variant="solid"
        />
        <IconButton
          onPress={onSendPress}
          disabled={newMessage.text.length === 0}
          icon={
            <Icon
              as={MaterialIcons}
              color={newMessage.text.length === 0 ? 'text.500' : 'primary.400'}
              name="send"
            />
          }
          borderRadius="md"
          position="absolute"
          bottom="5px"
          right="2"
          width="10"
          height="10"
          variant="ghost"
        />
      </HStack>
    </>
  );
}
