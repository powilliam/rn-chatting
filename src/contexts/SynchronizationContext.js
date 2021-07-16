import React, {useState, useMemo, useContext, createContext} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'styled-components';

export const SynchronizationContext = createContext({});

export const useSynchronization = () => useContext(SynchronizationContext);

export const SynchronizationProvider = ({children}) => {
  const {black} = useTheme();

  const [lastSync] = useState(null);

  const statusBarBackgroundColor = useMemo(() => black, [black]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={statusBarBackgroundColor}
      />
      <SynchronizationContext.Provider value={{lastSync}}>
        {children}
      </SynchronizationContext.Provider>
    </>
  );
};
