export const messageSchema = {
  name: 'message',
  properties: {
    uuid: 'string',
    content: 'string',
    author_uuid: 'string',
    author_name: 'string',
    timestamps: 'int',
  },
  primaryKey: 'uuid',
};
