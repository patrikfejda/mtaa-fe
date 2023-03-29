import {Button, extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({config});
function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Button>HELLO</Button>
    </NativeBaseProvider>
  );
}

export default App;
