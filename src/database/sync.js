import {MESSAGE_STATUS} from './schemas';

import {apiService} from 'src/services';

export const pull = async ({realm, lastSync}) => {
  const {
    data: {messages},
  } = await apiService.get('/v1/sync/pull', {
    params: {last_sync: Number(lastSync)},
  });
  messages.forEach((message) => {
    realm.write(() => {
      realm.create(
        'message',
        {...message, status: MESSAGE_STATUS.SYNCED},
        true,
      );
    });
  });
};

export const push = async (realm) => {
  const messages = realm
    .objects('message')
    .filtered(`status == '${MESSAGE_STATUS.SCHEDULED}'`);
  if (messages.length > 0) {
    await apiService.post('/v1/sync/push', {messages});
    messages.forEach((message) => {
      realm.write(() => {
        realm.create(
          'message',
          {...message, status: MESSAGE_STATUS.SYNCED},
          true,
        );
      });
    });
  }
};

export const synchronize = async ({realm, lastSync}) => {
  await pull({realm, lastSync});
  await push(realm);
  return Date.now();
};
