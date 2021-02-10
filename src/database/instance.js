import Realm from 'realm';

import {messageSchema, scheduledSchema} from './schemas';

const realmConfig = {
  schema: [messageSchema, scheduledSchema],
  schemaVersion: 0,
};

export const getRealmInstance = async () => await Realm.open(realmConfig);
