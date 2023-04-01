import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box, extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {RootStackParamList} from './src/types/navigation';

const nativeBaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({config: nativeBaseConfig});
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Box bgColor="muted.900">
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;
