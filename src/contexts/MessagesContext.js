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
import {useSynchronization} from './SynchronizationContext';

export const MessagesContext = createContext({});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({children}) => {
  const realm = useRealm();
  const {username, uuid} = useUser();
  const {isInternetReachable} = useNetInfo();
  const {isSynchronizing} = useSynchronization();

  const socket = io('https://guarded-sands-64792.herokuapp.com', {
    multiplex: false,
    autoConnect: false,
    forceNew: true,
    reconnection: false,
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!realm) return;
    const messageObjects = realm.objects('Message');
    messageObjects.addListener(() => {
      setMessages([...messageObjects.sorted('timestamps')]);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm]);

  useEffect(() => {
    if (!realm || isSynchronizing || !isInternetReachable) return;
    socket.connect();
    socket.on('new-message', (message) => {
      realm.write(() => {
        realm.create('Message', message, true);
      });
    });
    socket.on('pushed-messages', (pushedMessages) => {
      realm.write(() => {
        pushedMessages.forEach((message) => {
          realm.create('Message', message, true);
        });
      });
    });
    return () => socket.close();
  }, [realm, socket, isInternetReachable, isSynchronizing]);

  const create = useCallback(
    async (content) => {
      let message;
      realm.write(() => {
        message = realm.create('Message', {
          uuid: uuidv4(),
          content,
          author_uuid: uuid,
          author_name: username,
          timestamps: Date.now(),
        });
      });
      if (isInternetReachable) {
        await apiService.post('/v1/messages', message);
      } else {
        realm.write(() => {
          realm.create('Scheduled', {
            uuid: uuidv4(),
            message,
          });
        });
      }
    },
    [realm, uuid, username, isInternetReachable],
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
