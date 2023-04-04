import {Box, Button, FormControl, Input, Text, View, VStack} from 'native-base';
import React from 'react';
import {RootStackScreenProps} from '../types/navigation';

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
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
            <Input variant="filled" type="text" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input variant="filled" type="text" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input variant="filled" type="password" />
          </FormControl>
        </VStack>

        <VStack alignItems="center">
          <Button width="full">Register</Button>

          <Text mt="6" mb="2">
            Already have an account?
          </Text>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}
