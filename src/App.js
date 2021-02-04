import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import {RealmProvider, MessagesProvider, UserProvider} from 'src/contexts';

import Routes from 'src/routes';

import {darkTheme} from 'src/styles/themes';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={darkTheme.black} />
    <RealmProvider>
      <UserProvider>
        <MessagesProvider>
          <ThemeProvider theme={darkTheme}>
            <Routes />
          </ThemeProvider>
        </MessagesProvider>
      </UserProvider>
    </RealmProvider>
  </>
);

export default App;
