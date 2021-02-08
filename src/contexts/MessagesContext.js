import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useNetInfo} from '@react-native-community/netinfo';
import {io} from 'socket.io-client';

import {apiService} from 'src/services';

import {useRealm} from './RealmContext';
import {useUser} from './UserContext';

export const MessagesContext = createContext({});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({children}) => {
  const realm = useRealm();
  const {username, uuid} = useUser();
  const {isConnected} = useNetInfo();
  const socket = io('https://guarded-sands-64792.herokuapp.com');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!realm) return;
    const messageObjects = realm.objects('message');
    messageObjects.addListener(() => {
      setMessages([...messageObjects.sorted('timestamps')]);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm]);

  useEffect(() => {
    if (!realm) return;
    socket.on('new-message', (data) => {
      realm.write(() => {
        realm.create('message', data, true);
      });
    });
  }, [realm, socket]);

  const create = useCallback(
    async (content) => {
      const message = {
        uuid: uuidv4(),
        content,
        author_uuid: uuid,
        author_name: username,
        timestamps: Date.now(),
      };
      realm.write(() => {
        realm.create('message', message);
      });
      if (isConnected) {
        await apiService.post('/v1/messages', message);
      }
    },
    [realm, uuid, isConnected, username],
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
