import Realm from 'realm';

import {messageSchema} from './schemas';

export const REALM_APP_CONFIG = {
  id: 'application-0-jchoy',
};

export const REALM_DATABASE_CONFIG = {
  schema: [messageSchema],
  schemaVersion: 0,
};

export const app = new Realm.App(REALM_APP_CONFIG);

export const getSyncedRealmConfig = async () => {
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  return {
    ...REALM_DATABASE_CONFIG,
    sync: {
      user,
      partitionValue: 'message',
      fullSynchronization: true,
    },
  };
};
