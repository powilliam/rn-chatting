import Realm from 'realm';

import {messageSchema} from './schemas';

const realmConfig = {
  schema: [messageSchema],
  schemaVersion: 0,
};

export const getRealmInstance = async () => await Realm.open(realmConfig);
