import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKENS} from 'src/constants/storage';

import {apiService} from 'src/services';

export const pull = async (realm, lastSync) => {
  const {
    data: {messages},
  } = await apiService.get('/v1/sync/pull', {
    params: {last_sync: Number(lastSync)},
  });
  realm.write(() => {
    messages.forEach((message) => {
      realm.create('Message', message, true);
    });
  });
};

export const push = async (messages) => {
  await apiService.post('/v1/sync/push', {messages});
};

export const synchronize = async (realm) => {
  const timestamps = Date.now();
  const scheduleds = realm.objects('Scheduled');
  const lastSync = await AsyncStorage.getItem(TOKENS.LAST_SYNC);
  await pull(realm, lastSync);
  if (scheduleds.length > 0) {
    await push(
      scheduleds
        .map((scheduled) => scheduled.message)
        .filter((message) => message !== null),
    );
    realm.write(() => {
      realm.delete(scheduleds);
    });
  }
  await AsyncStorage.setItem(TOKENS.LAST_SYNC, timestamps.toString());
  return timestamps;
};
