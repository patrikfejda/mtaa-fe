import type {Draft} from 'immer';
import {Button, Icon, Pressable, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useImmerReducer} from 'use-immer';
import {v4 as uuidv4} from 'uuid';
import {useGetUsersQuery} from '../services/api';
import {selectCurrentUser} from '../store/authSlice';
import {
  addConversation,
  selectDirectConversationsUserIds,
} from '../store/conversationsSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {ConversationCreateStore, User} from '../types/api';
import type {AppModalInstanceProps} from '../types/component';
import AppAvatarItem from './AppAvatarItem';
import AppModal from './AppModal';
import AppModalGroupConversation from './AppModalGroupConversation';

function createInitialForm(currentUser: User): ConversationCreateStore {
  return {
    synchronizationKey: uuidv4(),
    name: '',
    isGroup: false,
    author: currentUser,
    userIds: [currentUser.id],
    messages: [],
    users: [currentUser],
  };
}

type Action =
  | {type: 'reseted'; payload: User}
  | {type: 'user_pressed'; payload: User};

function reducer(
  formDraft: Draft<ConversationCreateStore>,
  {type, payload}: Action,
) {
  switch (type) {
    case 'reseted':
      return createInitialForm(payload);
    case 'user_pressed':
      formDraft.name = payload.displayName || payload.username;
      formDraft.userIds.push(payload.id);
      formDraft.users.push(payload);
  }
}

export default function AppModalDirectConversation({
  isOpen,
  onClose,
}: AppModalInstanceProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const existingDirectConversationsUserIds = useAppSelector(
    selectDirectConversationsUserIds,
  );

  const dispatch = useAppDispatch();

  const {data: usersData} = useGetUsersQuery();

  const [isGroupModalOpen, setIsGroupModalOpened] = useState(false);

  const [form, formDispatch] = useImmerReducer(
    reducer,
    currentUser,
    createInitialForm,
  );

  useEffect(() => {
    if (form.users.length === 2) {
      dispatch(addConversation(form));
      formDispatch({type: 'reseted', payload: currentUser});
    }
  }, [form, dispatch, formDispatch, currentUser]);

  function onUserPress(user: User) {
    onClose();
    formDispatch({type: 'user_pressed', payload: user});
  }

  return (
    <>
      <AppModal isOpen={isOpen} onClose={onClose}>
        <AppModal.Header>New Chat</AppModal.Header>
        <AppModal.Body>
          <VStack space="3">
            {usersData?.map(
              user =>
                user.id !== currentUser?.id &&
                existingDirectConversationsUserIds.has(user.id) === false && (
                  <Pressable
                    onPress={() => onUserPress(user)}
                    key={user.id}
                    borderRadius="sm"
                    _pressed={{bgColor: 'muted.700'}}>
                    <AppAvatarItem
                      isHighlighted={true}
                      title={user.displayName || user.username}
                      user={user}
                    />
                  </Pressable>
                ),
            )}
          </VStack>
        </AppModal.Body>
        <AppModal.Footer>
          <Button
            onPress={() => {
              onClose();
              setIsGroupModalOpened(true);
            }}
            leftIcon={
              <Icon as={MaterialIcons} mr="0.5" name="group-add" size="md" />
            }
            py="9px"
            variant="outline"
            width="full">
            Start a group chat
          </Button>
        </AppModal.Footer>
      </AppModal>

      <AppModalGroupConversation
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpened(false)}
      />
    </>
  );
}
