import React from 'react';

import {RealmProvider} from './RealmContext';
import {SynchronizationProvider} from './SynchronizationContext';
import {UserProvider} from './UserContext';
import {MessagesProvider} from './MessagesContext';

export const AppProvider = ({children}) => (
  <RealmProvider>
    <SynchronizationProvider>
      <UserProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </UserProvider>
    </SynchronizationProvider>
  </RealmProvider>
);
