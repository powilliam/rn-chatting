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

import {useRealm} from './RealmContext';

import {synchronize} from 'src/database';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const realm = useRealm();
  const {isConnected, isInternetReachable} = useNetInfo();
  const {red, yellow, black} = useTheme();

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const statusBarBackgroundColor = useMemo(() => {
    if (isSynchronizing) return yellow;
    if (!isInternetReachable) return red;
    else return black;
  }, [isSynchronizing, isInternetReachable, yellow, red, black]);

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
