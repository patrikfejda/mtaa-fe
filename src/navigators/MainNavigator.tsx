import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppBar from '../components/AppBar';
import LoginScreen from '../screens/LoginScreen';
import MessagesScreen from '../screens/MessagesScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {selectIsLoggedIn} from '../store/authSlice';
import {useAppSelector} from '../store/hooks';
import type {RootStackParamList} from '../types/navigation';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const MainNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        // eslint-disable-next-line react/no-unstable-nested-components
        header: props => <AppBar {...props} />,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={({route}) => ({title: route.params.name})}
          />
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
