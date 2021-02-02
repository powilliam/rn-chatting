import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import Routes from 'src/routes';

import {darkTheme} from 'src/styles/themes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={darkTheme.black} />
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  </>
);

export default App;
