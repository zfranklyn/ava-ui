export const MESSAGE_MEDIUM = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  APP: 'APP',
};

export const MESSAGE_TYPE = {
  SURVEY: 'SURVEY',
  REMINDER: 'REMINDER',
  CUSTOM: 'CUSTOM',
  REPLY: 'REPLY',
  OTHER: 'OTHER',
};

export type MessageType =
  'SURVEY'
  | 'REMINDER'
  | 'CUSTOM'
  | 'REPLY'
  | 'OTHER';

export type MediumType =
  'EMAIL'
  |'SMS'
  |'APP';

export interface IMessage {
  content: string;
  messageType: MessageType;
  mediumType: MediumType;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageAPI {
  content: string;
  messageType: string;
  mediumType: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertMessage = (rawData: IMessageAPI): IMessage => {
  const { content, messageType, mediumType, id, createdAt, updatedAt } = rawData;
  return {
    content,
    messageType: messageType as MessageType,
    mediumType: mediumType as MediumType,
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
