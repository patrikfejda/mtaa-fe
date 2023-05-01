import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {produce} from 'immer';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';
import 'react-native-get-random-values';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import MainNavigator from './src/navigators/MainNavigator';
import {persistor, store} from './src/store';

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
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto-Thin',
        italic: 'Roboto-ThinItalic',
      },
      200: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      300: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic',
      },
      400: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
      500: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
      700: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
      900: {
        normal: 'Roboto-Black',
        italic: 'Roboto-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
});

function App(): JSX.Element {
  return (
    <StoreProvider store={store}>
      {/* TODO maybe splash screen as loading prop */}
      <PersistGate persistor={persistor}>
        <NavigationContainer theme={navigationTheme}>
          <NativeBaseProvider theme={nativeBaseTheme}>
            <MainNavigator />
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
