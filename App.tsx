import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';
import AppBar from './src/components/AppBar';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {RootStackParamList} from './src/types/navigation';

const nativeBaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const nativeBaseTheme = extendTheme({config: nativeBaseConfig});
const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#171717',
  },
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <RootStack.Navigator
          screenOptions={{animation: 'none', header: AppBar}}
          initialRouteName="Login">
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
        </RootStack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
