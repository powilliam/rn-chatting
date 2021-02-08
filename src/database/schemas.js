export const MESSAGE_STATUS = {
  SYNCED: 'SYNCED',
  PENDING: 'PENDING',
  SCHEDULED: 'SCHEDULED',
};

export const messageSchema = {
  name: 'message',
  properties: {
    uuid: 'string',
    content: 'string',
    author_uuid: 'string',
    author_name: 'string',
    status: 'string',
    timestamps: 'int',
  },
  primaryKey: 'uuid',
};
