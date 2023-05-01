import {Box, Button, FormControl, Input, Text, VStack, View} from 'native-base';
import React, {useState} from 'react';
import {useLoginMutation} from '../services/api';
import type {RootStackScreenProps} from '../types/navigation';

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [login, {isLoading}] = useLoginMutation();

  return (
    <View>
      <Box pt="6" pb="5" alignItems="center">
        <Text fontSize="5xl" fontWeight="bold">
          COM.LY
        </Text>
      </Box>

      <VStack px="2" space="9">
        <VStack space="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, username: value})}
              type="text"
              variant="filled"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, password: value})}
              type="password"
              variant="filled"
            />
          </FormControl>
        </VStack>

        <VStack alignItems="center">
          <Button
            onPress={() => login(form)}
            isLoading={isLoading}
            width="full">
            Login
          </Button>

          <Text color="text.500" mt="6" mb="2">
            Don't have an account?
          </Text>
          <Button
            onPress={() => navigation.navigate('Register')}
            variant="outline">
            Register
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}
