import {Box, Button, FormControl, Input, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {useRegisterMutation} from '../services/api';
import type {RootStackScreenProps} from '../types/navigation';

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [register, {isLoading}] = useRegisterMutation();

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
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, email: value})}
              variant="filled"
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, username: value})}
              variant="filled"
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, password: value})}
              variant="filled"
              type="password"
            />
          </FormControl>
        </VStack>

        <VStack alignItems="center">
          <Button
            onPress={() => register(form)}
            isDisabled={!form.email || !form.username || !form.password}
            isLoading={isLoading}
            width="full">
            Register
          </Button>

          <Text color="text.500" mt="6" mb="2">
            Already have an account?
          </Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            variant="outline">
            Login
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}
