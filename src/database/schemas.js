export const messageSchema = {
  name: 'message',
  properties: {
    uuid: 'string',
    content: 'string',
    author_id: 'string',
    timestamps: 'int',
  },
  primaryKey: 'uuid',
};
