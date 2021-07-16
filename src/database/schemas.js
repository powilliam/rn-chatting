import {tableSchema} from '@nozbe/watermelondb';

export const watermelonMessagesSchema = tableSchema({
  name: 'messages',
  columns: [
    {name: 'uuid', type: 'string'},
    {name: 'content', type: 'string'},
    {name: 'author_uuid', type: 'string'},
    {name: 'author_name', type: 'string'},
    {name: 'is_synchronized', type: 'boolean'},
    {name: 'timestamps', type: 'number'},
  ],
});
