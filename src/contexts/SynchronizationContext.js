import React, {useState, useEffect, useContext, createContext} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {useRealm} from './RealmContext';

import {synchronize} from 'src/database';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isInternetReachable} = useNetInfo();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!realm || !isInternetReachable) return;
    (async () => {
      setIsSynchronizing(true);
      try {
        const timestamps = await synchronize(realm);
        setLastSync(timestamps);
      } finally {
        setIsSynchronizing(false);
      }
    })();
  }, [realm, isInternetReachable]);

  return (
    <SynchronizationContext.Provider value={{isSynchronizing, lastSync}}>
      {children}
    </SynchronizationContext.Provider>
  );
};
