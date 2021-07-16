import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';

import {database} from 'src/database';

import {SynchronizationProvider} from './SynchronizationContext';
import {AuthProvider} from './AuthContext';
import {MessagesProvider} from './MessagesContext';

export const AppProvider = ({children}) => (
  <DatabaseProvider database={database}>
    <SynchronizationProvider>
      <AuthProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </AuthProvider>
    </SynchronizationProvider>
  </DatabaseProvider>
);
