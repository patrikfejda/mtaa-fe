import {Button, View} from 'native-base';
import React from 'react';
import {RootStackScreenProps} from '../types/navigation';

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  return (
    <View>
      <Button>Register</Button>
      <Button onPress={() => navigation.navigate('Login')}>Login</Button>
    </View>
  );
}
