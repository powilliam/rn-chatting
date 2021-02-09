import {apiService} from 'src/services';

import {MESSAGE_STATUS} from './schemas';

export const pull = async (lastSync) => {
  const {
    data: {messages},
  } = await apiService.get('/v1/sync/pull', {
    params: {last_sync: Number(lastSync)},
  });
  return messages;
};

export const push = async (messages) => {
  await apiService.post('/v1/sync/push', {messages});
};

export const synchronize = async ({realm, lastSync, scheduleds}) => {
  try {
    realm.beginTransaction();
    const messagesSinceLastSync = await pull(realm, lastSync);
    if (scheduleds.length > 0) {
      await push(scheduleds);
    }
    [...messagesSinceLastSync, ...scheduleds].forEach((message) => {
      realm.create(
        'message',
        {...message, status: MESSAGE_STATUS.SYNCED},
        true,
      );
    });
    realm.commitTransaction();
  } catch (error) {
    realm.cancelTransaction();
  }
};
