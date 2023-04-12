import {Text, View} from 'native-base';
import React from 'react';
import {selectIsLoggedIn} from '../store/authSlice';
import {useAppSelector} from '../store/hooks';
import type {RootStackScreenProps} from '../types/navigation';

export default function ChatsScreen({
  navigation,
}: RootStackScreenProps<'Chats'>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <View>
      <Text>{JSON.stringify(isLoggedIn)}</Text>
    </View>
  );
}
