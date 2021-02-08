import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

import {apiService} from 'src/services';

export const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  const [uuid, setUuid] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    (async () => {
      const [[, storedUsername], [, storedUuid]] = await AsyncStorage.multiGet([
        TOKENS.USERNAME,
        TOKENS.USER_UUID,
      ]);
      if (!storedUsername && !storedUuid) {
        await signup();
        return;
      }
      setUsername(storedUsername);
      setUuid(storedUuid);
    })();
  }, [signup]);

  const signup = useCallback(async () => {
    const {
      data: {name, uuid: userUuid},
    } = await apiService.post('/v1/users/signup');
    setUsername(name);
    setUuid(userUuid);
    await AsyncStorage.multiSet([
      [TOKENS.USERNAME, name],
      [TOKENS.USER_UUID, userUuid],
    ]);
  }, []);

  return (
    <UserContext.Provider value={{uuid, username, signup}}>
      {children}
    </UserContext.Provider>
  );
};
