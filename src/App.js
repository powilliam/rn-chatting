import React from 'react';
import {StatusBar} from 'react-native';

import {AppProvider} from 'src/contexts';

import Routes from 'src/routes';

import {darkTheme} from 'src/styles/themes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={darkTheme.black} />
    <AppProvider>
      <Routes />
    </AppProvider>
  </>
);

export default App;
