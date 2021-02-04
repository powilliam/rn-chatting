import React, {useState, useEffect, useContext, createContext} from 'react';

import {getRealmInstance} from 'src/database';

export const RealmContext = createContext(null);

export const useRealm = () => useContext(RealmContext);

export const RealmProvider = ({children}) => {
  const [realmInstance, setRealmInstance] = useState(null);

  useEffect(() => {
    if (realmInstance) return;
    getRealmInstance()
      .then(setRealmInstance)
      .catch((error) => {
        console.log(`Realm initialization failed due to ${error.message}`);
      });
    return () => realmInstance?.close();
  }, [realmInstance]);

  return (
    <RealmContext.Provider value={realmInstance}>
      {children}
    </RealmContext.Provider>
  );
};
