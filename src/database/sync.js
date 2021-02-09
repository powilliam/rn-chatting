import {apiService} from 'src/services';

import {MESSAGE_STATUS} from './schemas';

export const pull = async (realm, lastSync) => {
  const {
    data: {messages},
  } = await apiService.get('/v1/sync/pull', {
    params: {last_sync: Number(lastSync)},
  });
  messages.forEach((message) => {
    realm.create('message', {...message, status: MESSAGE_STATUS.SYNCED}, true);
  });
};

export const synchronize = async ({realm, lastSync, scheduleds}) => {
  try {
    realm.beginTransaction();
    await pull(realm, lastSync);
    realm.commitTransaction();
  } catch (error) {
    realm.cancelTransaction();
  }
};
