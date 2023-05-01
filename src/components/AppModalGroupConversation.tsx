import type {Draft} from 'immer';
import {Button, Checkbox, FormControl, Icon, Input, VStack} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useImmerReducer} from 'use-immer';
import {v4 as uuidv4} from 'uuid';
import {useGetUsersQuery} from '../services/api';
import {selectCurrentUser} from '../store/authSlice';
import {addConversation} from '../store/conversationsSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {ConversationCreateStore, User} from '../types/api';
import type {AppModalInstanceProps} from '../types/component';
import AppAvatarItem from './AppAvatarItem';
import AppModal from './AppModal';

function createInitialForm(currentUser: User): ConversationCreateStore {
  return {
    synchronizationKey: uuidv4(),
    name: '',
    isGroup: true,
    author: currentUser,
    userIds: [currentUser.id],
    messages: [],
    users: [currentUser],
  };
}

type Action =
  | {type: 'reseted'; payload: User}
  | {type: 'name_changed'; payload: {name: string}}
  | {type: 'user_updated'; payload: {user: User; isSelected: boolean}};

function reducer(
  formDraft: Draft<ConversationCreateStore>,
  {type, payload}: Action,
) {
  switch (type) {
    case 'reseted':
      return createInitialForm(payload);
    case 'name_changed':
      formDraft.name = payload.name;
      break;
    case 'user_updated':
      if (payload.isSelected) {
        formDraft.userIds.push(payload.user.id);
        formDraft.users.push(payload.user);
      } else {
        formDraft.userIds = formDraft.userIds.filter(
          id => id !== payload.user.id,
        );
        formDraft.users = formDraft.users.filter(
          user => user.id !== payload.user.id,
        );
      }
  }
}

export default function AppModalDirectConversation({
  isOpen,
  onClose,
}: AppModalInstanceProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const {data: usersData} = useGetUsersQuery();

  const [form, formDispatch] = useImmerReducer(
    reducer,
    currentUser,
    createInitialForm,
  );

  function onButtonPress() {
    onClose();
    dispatch(addConversation(form));
    formDispatch({type: 'reseted', payload: currentUser});
  }

  function closeModal() {
    onClose();
    formDispatch({type: 'reseted', payload: currentUser});
  }

  return (
    <>
      <AppModal isOpen={isOpen} onClose={closeModal}>
        <AppModal.Header>Start a group chat</AppModal.Header>
        <AppModal.Body>
          <FormControl>
            <FormControl.Label>Group name</FormControl.Label>
            <Input
              onChangeText={value =>
                formDispatch({type: 'name_changed', payload: {name: value}})
              }
              bgColor="muted.700"
              size="md"
              type="text"
              variant="filled"
            />
          </FormControl>

          <VStack pt="4" space="3">
            {usersData?.map(
              user =>
                user.id !== currentUser?.id && (
                  <Checkbox
                    onChange={isSelected =>
                      formDispatch({
                        type: 'user_updated',
                        payload: {user, isSelected},
                      })
                    }
                    key={user.id}
                    id={String(user.id)}
                    value={String(user.id)}
                    bgColor="muted.800"
                    flexDirection="row-reverse"
                    _checked={{bgColor: 'primary.500'}}>
                    <AppAvatarItem
                      isHighlighted={form.userIds.includes(user.id)}
                      title={user.displayName || user.username}
                      user={user}
                    />
                  </Checkbox>
                ),
            )}
          </VStack>
        </AppModal.Body>
        <AppModal.Footer>
          <Button
            onPress={onButtonPress}
            leftIcon={
              <Icon as={MaterialIcons} mr="0.5" name="group-add" size="md" />
            }
            isDisabled={form.name?.length === 0 || form.userIds.length < 2}
            width="full">
            Start a group chat
          </Button>
        </AppModal.Footer>
      </AppModal>
    </>
  );
}
