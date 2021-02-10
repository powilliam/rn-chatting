import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import {AppProvider} from 'src/contexts';

import Routes from 'src/routes';

import {darkTheme as theme} from 'src/styles/themes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={theme.black} />
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  </>
);

export default App;
