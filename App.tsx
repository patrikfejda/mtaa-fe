import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import MainNavigator from './src/navigators/MainNavigator';
import {store} from './src/store';

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

function App(): JSX.Element {
  return (
    <StoreProvider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <NativeBaseProvider theme={nativeBaseTheme}>
          <MainNavigator />
        </NativeBaseProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
