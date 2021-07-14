import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';

import {getAuthenticated, setAuthenticated} from 'src/utils';

import {signup} from 'src/services';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsAuthenticating(true);
        const authenticated = await getAuthenticated();
        if (!authenticated) {
          await doSignup();
          return;
        }
        setUser(authenticated);
      } catch (error) {
      } finally {
        setIsAuthenticating(false);
      }
    })();
  }, [doSignup]);

  const doSignup = useCallback(async () => {
    const {data} = await signup();
    setUser(data);
    await setAuthenticated(data);
  }, []);

  return (
    <AuthContext.Provider value={{user, isAuthenticating}}>
      {children}
    </AuthContext.Provider>
  );
};
