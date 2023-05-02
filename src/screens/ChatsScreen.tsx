import {useIsFocused} from '@react-navigation/native';
import {produce} from 'immer';
import {Fab, Icon, Pressable, ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppAvatarItem from '../components/AppAvatarItem';
import AppModalDirectConversation from '../components/AppModalDirectConversation';
import {useGetUserConversationsQuery, useGetUsersQuery} from '../services/api';
import {selectCurrentUser} from '../store/authSlice';
import {selectAllConversations} from '../store/conversationsSlice';
import {useAppSelector} from '../store/hooks';
import type {Conversation, ConversationCreateStore} from '../types/api';
import type {AppAvatarItemProps} from '../types/component';
import type {TabScreenProps} from '../types/navigation';

function getDirectConversationReciever(
  conversation: Conversation | ConversationCreateStore,
  currentUserId: number,
) {
  const reciever = conversation.users.find(user => user.id !== currentUserId);

  if (!reciever) {
    throw new Error('No reciever found');
  }

  return reciever;
}

function getConversationName(
  conversation: Conversation | ConversationCreateStore,
  currentUserId: number,
) {
  const conversationReceiver = getDirectConversationReciever(
    conversation,
    currentUserId,
  );

  return conversation.isGroup
    ? conversation.name
    : conversationReceiver.displayName || conversationReceiver.username;
}

function getLastConversationMessage(
  conversation: Conversation | ConversationCreateStore,
) {
  return conversation.messages.slice(-1)[0]?.text;
}

function isNotSynchronized(
  conversation: Conversation | ConversationCreateStore,
) {
  return 'id' in conversation === false;
}

function getConditionalConversationProps(
  conversation: Conversation | ConversationCreateStore,
  currentUserId: number,
) {
  return produce<Partial<AppAvatarItemProps>>({}, propsDraft => {
    if (isNotSynchronized(conversation)) {
      propsDraft.titleGrayedOut = 'synchronizing';
    }
    if (conversation.isGroup) {
      propsDraft.avatarCustomFallback = conversation.name
        .substring(0, 2)
        .toUpperCase();
    } else {
      propsDraft.user = getDirectConversationReciever(
        conversation,
        currentUserId,
      );
    }
  });
}

export default function ChatsScreen({navigation}: TabScreenProps<'Chats'>) {
  useGetUsersQuery();
  useGetUserConversationsQuery();

  const currentUser = useAppSelector(selectCurrentUser);

  const conversations = useAppSelector(selectAllConversations);

  const [showModal, setShowModal] = useState(false);

  const isFocused = useIsFocused();

  function onConversationPress(
    conversation: Conversation | ConversationCreateStore,
  ) {
    if (isNotSynchronized(conversation)) {
      return;
    }

    navigation.navigate('Messages', {
      name: getConversationName(conversation, currentUser.id),
      conversationId: (conversation as Conversation).id,
    });
  }

  return (
    <ScrollView>
      <VStack px="2" pb="2" space="4">
        {conversations.map(conversation => (
          <Pressable
            onPress={() => onConversationPress(conversation)}
            key={conversation.synchronizationKey}
            borderRadius="sm"
            _pressed={{bgColor: 'muted.800'}}>
            {/* @ts-ignore */}
            <AppAvatarItem
              isHighlighted={true}
              title={getConversationName(conversation, currentUser.id)}
              subtitle={
                getLastConversationMessage(conversation) ||
                'You have no messages yet'
              }
              {...getConditionalConversationProps(conversation, currentUser.id)}
            />
          </Pressable>
        ))}
      </VStack>

      {isFocused && (
        <Fab
          onPress={() => setShowModal(true)}
          icon={<Icon as={MaterialIcons} name="person-add" size="lg" />}
          right="2"
          bottom="16"
        />
      )}

      <AppModalDirectConversation
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </ScrollView>
  );
}
