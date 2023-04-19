import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {produce} from 'immer';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import MainNavigator from './src/navigators/MainNavigator';
import {store} from './src/store';

const navigationTheme = produce(DarkTheme, draftTheme => {
  draftTheme.colors.background = '#171717';
});

const nativeBaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const nativeBaseTheme = extendTheme({
  config: nativeBaseConfig,
  components: {
    Input: {
      baseStyle: {
        py: '5px',
      },
    },
  },
});

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
