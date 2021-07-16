import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Database, appSchema} from '@nozbe/watermelondb';

import {watermelonMessagesSchema} from './schemas';

import {Message} from './models';

const databaseSchema = appSchema({
  version: 1,
  tables: [watermelonMessagesSchema],
});

export const database = new Database({
  adapter: new SQLiteAdapter({
    schema: databaseSchema,
  }),
  modelClasses: [Message],
  actionsEnabled: true,
});
