import React, {useState, useEffect, useContext, createContext} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {useRealm} from './RealmContext';

import {synchronize} from 'src/database';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isConnected, isInternetReachable} = useNetInfo();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!realm || !isConnected || !isInternetReachable) return;
    setIsSynchronizing(true);
    synchronize(realm)
      .then((timestamps) => {
        setLastSync(timestamps);
        setIsSynchronizing(false);
      })
      .catch((_) => {
        setIsSynchronizing(false);
      });
  }, [realm, isConnected, isInternetReachable]);

  return (
    <SynchronizationContext.Provider value={{isSynchronizing, lastSync}}>
      {children}
    </SynchronizationContext.Provider>
  );
};
