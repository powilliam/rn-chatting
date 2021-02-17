import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import {StatusBar} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

import {useRealm} from './RealmContext';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isInternetReachable} = useNetInfo();
  const {red, yellow, black} = useTheme();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const statusBarBackgroundColor = useMemo(() => {
    if (isSynchronizing) return yellow;
    if (!isInternetReachable) return red;
    else return black;
  }, [isSynchronizing, isInternetReachable, yellow, red, black]);

  useEffect(() => {
    if (!realm || !isInternetReachable) return;
    (async () => {
      try {
        setIsSynchronizing(true);
        await realm.syncSession.downloadAllServerChanges();
        await realm.syncSession.uploadAllLocalChanges();
      } finally {
        const timestamps = Date.now();
        await AsyncStorage.setItem(TOKENS.LAST_SYNC, timestamps.toString());
        setLastSync(timestamps);
        setIsSynchronizing(false);
      }
    })();
  }, [realm, isInternetReachable]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={statusBarBackgroundColor}
      />
      <SynchronizationContext.Provider value={{isSynchronizing, lastSync}}>
        {children}
      </SynchronizationContext.Provider>
    </>
  );
};
