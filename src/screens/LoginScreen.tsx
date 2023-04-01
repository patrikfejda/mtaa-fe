import {Button, View} from 'native-base';
import React from 'react';
import {RootStackScreenProps} from '../types/navigation';

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<'Login'>) {
  return (
    <View>
      <Button>Login</Button>
      <Button onPress={() => navigation.navigate('Register')}>Register</Button>
    </View>
  );
}
