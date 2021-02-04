import React from 'react';
import {ThemeProvider} from 'styled-components';

import {RealmProvider} from './RealmContext';
import {UserProvider} from './UserContext';
import {MessagesProvider} from './MessagesContext';

import {darkTheme as theme} from 'src/styles/themes';

export const AppProvider = ({children}) => (
  <ThemeProvider theme={theme}>
    <RealmProvider>
      <UserProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </UserProvider>
    </RealmProvider>
  </ThemeProvider>
);
