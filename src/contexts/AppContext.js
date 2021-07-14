import React from 'react';

import {RealmProvider} from './RealmContext';
import {SynchronizationProvider} from './SynchronizationContext';
import {AuthProvider} from './AuthContext';
import {MessagesProvider} from './MessagesContext';

export const AppProvider = ({children}) => (
  <RealmProvider>
    <SynchronizationProvider>
      <AuthProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </AuthProvider>
    </SynchronizationProvider>
  </RealmProvider>
);
