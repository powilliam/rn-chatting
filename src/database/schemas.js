export const messageSchema = {
  name: 'Message',
  properties: {
    _id: 'string',
    content: 'string',
    author_uuid: 'string',
    author_name: 'string',
    timestamps: 'int',
  },
  primaryKey: '_id',
};
