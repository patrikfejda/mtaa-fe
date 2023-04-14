import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppBar from '../components/AppBar';
import ChatsScreen from '../screens/ChatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {selectIsLoggedIn} from '../store/authSlice';
import {useAppSelector} from '../store/hooks';
import type {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const MainNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{animation: 'none', header: AppBar}}
      initialRouteName="Login">
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Chats" component={ChatsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
