import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import {v4 as uuidv4} from 'uuid';

import {useRealm} from './RealmContext';
import {useUser} from './UserContext';

export const MessagesContext = createContext({});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({children}) => {
  const realm = useRealm();
  const {id} = useUser();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!realm) return;
    const messageObjects = realm.objects('message');
    messageObjects.addListener(() => {
      setMessages([...messageObjects.sorted('timestamps')]);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm]);

  const create = useCallback(
    (content) => {
      realm.write(() => {
        realm.create('message', {
          uuid: uuidv4(),
          content,
          author_id: id,
          timestamps: Date.now(),
        });
      });
    },
    [realm, id],
  );

  const deleteAll = useCallback(() => {
    realm.write(() => {
      realm.delete(messages);
    });
  }, [realm, messages]);

  return (
    <MessagesContext.Provider value={{messages, create, deleteAll}}>
      {children}
    </MessagesContext.Provider>
  );
};
