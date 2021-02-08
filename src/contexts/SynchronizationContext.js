import React, {useState, useEffect, useContext, createContext} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

import {useRealm} from './RealmContext';

import {synchronize} from 'src/database';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isConnected} = useNetInfo();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!realm || !isConnected) return;
    (async () => {
      setIsSynchronizing(true);
      const storedLastSync = await AsyncStorage.getItem(TOKENS.LAST_SYNC);
      const timestamps = await synchronize({realm, lastSync: storedLastSync});
      setIsSynchronizing(false);
      setLastSync(timestamps);
      await AsyncStorage.setItem(TOKENS.LAST_SYNC, timestamps.toString());
    })();
  }, [realm, isConnected]);

  return (
    <SynchronizationContext.Provider value={{isSynchronizing, lastSync}}>
      {children}
    </SynchronizationContext.Provider>
  );
};
