import React, {useState, useEffect, useContext, createContext} from 'react';
import Realm from 'realm';

import {getSyncedRealmConfig} from 'src/database';

export const RealmContext = createContext(null);

export const useRealm = () => useContext(RealmContext);

export const RealmProvider = ({children}) => {
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    if (realm) return;
    (async () => {
      try {
        const config = await getSyncedRealmConfig();
        const instance = await Realm.open(config);
        setRealm(instance);
      } catch (error) {
        console.log(`Cannot instanciate realm due to: ${error.message}`);
      }
    })();
    return () => realm?.close();
  }, [realm]);

  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};
