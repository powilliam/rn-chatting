import React, {useContext, createContext} from 'react';

export const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={{id: '12345'}}>
      {children}
    </UserContext.Provider>
  );
};
