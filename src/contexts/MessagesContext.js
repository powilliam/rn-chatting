import React, {useEffect, useContext, useCallback, createContext} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useNetInfo} from '@react-native-community/netinfo';
import {io} from 'socket.io-client';

import {postMessage} from 'src/services';

import {database} from 'src/database';

import {useAuth} from './AuthContext';
import {useSynchronization} from './SynchronizationContext';

export const MessagesContext = createContext({});

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({children}) => {
  const {user} = useAuth();
  const {isConnected, isInternetReachable} = useNetInfo();
  const {isSynchronizing} = useSynchronization();

  const socket = io('https://guarded-sands-64792.herokuapp.com', {
    multiplex: false,
    autoConnect: false,
    forceNew: true,
    reconnection: false,
  });

  useEffect(() => {
    if (isSynchronizing || !isConnected || !isInternetReachable) return;
    socket.connect();
    socket.on('new-message', async (message) => {
      await database.action(async () => {
        if (message.author_uuid === user?.uuid) return;
        await database.get('messages').create((it) => {
          Object.assign(it, message);
        });
      });
    });
    socket.on('pushed-messages', async (pushedMessages) => {
      await database.action(async () => {
        pushedMessages.forEach(async (message) => {
          if (message.author_uuid === user?.uuid) return;
          await database.get('messages').create((it) => {
            Object.assign(it, message);
          });
        });
      });
    });
    return () => socket.close();
  }, [socket, user, isSynchronizing, isConnected, isInternetReachable]);

  const create = useCallback(
    async (content) => {
      const isSynced = isConnected && isInternetReachable;
      let message;

      await database.action(async () => {
        message = await database.get('messages').create((it) => {
          it.uuid = uuidv4();
          it.content = content;
          it.author_uuid = user.uuid;
          it.author_name = user.name;
          it.is_synchronized = isSynced;
          it.timestamps = Date.now();
        });
      });

      if (isSynced) {
        await postMessage(message._raw);
      }
    },
    [isConnected, user, isInternetReachable],
  );

  const deleteAll = useCallback(async () => {}, []);

  return (
    <MessagesContext.Provider value={{create, deleteAll}}>
      {children}
    </MessagesContext.Provider>
  );
};
