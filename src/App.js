import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import Routes from './routes';

import {darkTheme} from './styles/themes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={darkTheme.black} />
      <ThemeProvider theme={darkTheme}>
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;
