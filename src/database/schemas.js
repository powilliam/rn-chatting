export const messageSchema = {
  name: 'Message',
  properties: {
    uuid: 'string',
    content: 'string',
    author_uuid: 'string',
    author_name: 'string',
    timestamps: 'int',
  },
  primaryKey: 'uuid',
};

export const scheduledSchema = {
  name: 'Scheduled',
  properties: {
    uuid: 'string',
    message: 'Message',
  },
  primaryKey: 'uuid',
};
