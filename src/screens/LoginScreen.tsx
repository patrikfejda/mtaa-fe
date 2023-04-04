import {Box, Button, FormControl, Input, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import {RootStackScreenProps} from '../types/navigation';

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function onSubmit() {
    // TODO
    // console.log('FORM DATA', formData);
  }

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
              onChangeText={value =>
                setFormData({...formData, username: value})
              }
              type="text"
              variant="filled"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={value =>
                setFormData({...formData, password: value})
              }
              type="password"
              variant="filled"
            />
          </FormControl>
        </VStack>

        <VStack alignItems="center">
          <Button onPress={onSubmit} width="full">
            Login
          </Button>

          <Text mt="6" mb="2">
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
