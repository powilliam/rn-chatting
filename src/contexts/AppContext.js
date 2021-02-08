import React from 'react';

import {RealmProvider} from './RealmContext';
import {UserProvider} from './UserContext';
import {MessagesProvider} from './MessagesContext';

export const AppProvider = ({children}) => (
  <RealmProvider>
    <UserProvider>
      <MessagesProvider>{children}</MessagesProvider>
    </UserProvider>
  </RealmProvider>
);
