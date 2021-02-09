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

import {MESSAGE_STATUS} from 'src/database';

import {useRealm} from './RealmContext';
import {useUser} from './UserContext';
import {useSynchronization} from './SynchronizationContext';

export const MessagesContext = createContext({});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({children}) => {
  const realm = useRealm();
  const {username, uuid} = useUser();
  const {isConnected, isInternetReachable} = useNetInfo();
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
    const messageObjects = realm.objects('message');
    messageObjects.addListener(() => {
      setMessages([...messageObjects.sorted('timestamps')]);
    });
    return () => messageObjects.removeAllListeners();
  }, [realm]);

  useEffect(() => {
    if (!realm || isSynchronizing || !isConnected || !isInternetReachable)
      return;
    socket.connect();
    socket.on('new-message', (data) => {
      realm.write(() => {
        realm.create('message', {...data, status: MESSAGE_STATUS.SYNCED}, true);
      });
    });
    socket.on('pushed-messages', (data) => {
      realm.write(() => {
        data.forEach((message) => {
          realm.create(
            'message',
            {...message, status: MESSAGE_STATUS.SYNCED},
            true,
          );
        });
      });
    });
    return () => socket.close();
  }, [realm, socket, isSynchronizing, isConnected, isInternetReachable]);

  const create = useCallback(
    async (content) => {
      const message = {
        uuid: uuidv4(),
        content,
        author_uuid: uuid,
        author_name: username,
        status:
          isConnected && isInternetReachable
            ? MESSAGE_STATUS.PENDING
            : MESSAGE_STATUS.SCHEDULED,
        timestamps: Date.now(),
      };
      realm.write(() => {
        realm.create('message', message);
      });
      if (isConnected && isInternetReachable) {
        await apiService.post('/v1/messages', message);
        realm.write(() => {
          realm.create(
            'message',
            {...message, status: MESSAGE_STATUS.SYNCED},
            true,
          );
        });
      }
    },
    [realm, uuid, isConnected, username, isInternetReachable],
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
