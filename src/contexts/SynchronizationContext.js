import React, {useState, useEffect, useContext, createContext} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

import {useRealm} from './RealmContext';

import {synchronize, MESSAGE_STATUS} from 'src/database';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isConnected, isInternetReachable} = useNetInfo();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!realm || !isConnected || !isInternetReachable) return;
    (async () => {
      setIsSynchronizing(true);
      const scheduleds = realm
        .objects('message')
        .filtered(`status == '${MESSAGE_STATUS.SCHEDULED}'`);
      const storedLastSync = await AsyncStorage.getItem(TOKENS.LAST_SYNC);
      await synchronize({
        realm,
        lastSync: storedLastSync,
        scheduleds,
      });
      const timestamps = Date.now();
      await AsyncStorage.setItem(TOKENS.LAST_SYNC, timestamps.toString());
      setLastSync(timestamps);
      setIsSynchronizing(false);
    })();
  }, [realm, isConnected, isInternetReachable]);

  return (
    <SynchronizationContext.Provider value={{isSynchronizing, lastSync}}>
      {children}
    </SynchronizationContext.Provider>
  );
};
