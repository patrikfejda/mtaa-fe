import {Box, Button, FormControl, Input, Text, VStack, View} from 'native-base';
import {selectIsLoggedIn} from '../store/authSlice';
import {useAppSelector} from '../store/hooks';
import type {RootStackScreenProps} from '../types/navigation';
import React, {useState} from 'react';
import {useLoginMutation} from '../services/api';

export default function SettingsScreen({
  navigation,
}: RootStackScreenProps<'Settings'>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [login, {isLoading}] = useLoginMutation();

  return (
    <View>
      <Text>This page is under construction</Text>

      <VStack px="2" space="9">
        <VStack space="5">
          <FormControl>
            <FormControl.Label>Display Name</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, username: value})}
              type="text"
              variant="filled"
            />
          </FormControl>
        </VStack>

        <VStack alignItems="center">
          <Button
            onPress={() => login(form)}
            isLoading={isLoading}
            width="full">
            Log Out
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}
