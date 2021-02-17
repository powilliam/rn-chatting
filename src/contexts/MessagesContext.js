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
  const {username, uuid} = useUser();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!realm) return;
    const messageObjects = realm.objects('Message');
    messageObjects.addListener(() => {
      setMessages([...messageObjects.sorted('timestamps')]);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm]);

  const create = useCallback(
    async (content) => {
      if (!realm) return;
      realm.write(() => {
        realm.create('Message', {
          _id: uuidv4(),
          content,
          author_uuid: uuid,
          author_name: username,
          timestamps: Date.now(),
        });
      });
    },
    [realm, uuid, username],
  );

  const deleteAll = useCallback(() => {
    if (!realm) return;
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
