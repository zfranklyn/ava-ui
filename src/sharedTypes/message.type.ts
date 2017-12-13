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
  message: string;
  messageType: MessageType;
  mediumType: MediumType;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageAPI {
  message: string;
  messageType: string;
  mediumType: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertMessage = (rawData: IMessageAPI): IMessage => {
  const { message, messageType, mediumType, id, createdAt, updatedAt } = rawData;
  return {
    message,
    messageType: messageType as MessageType,
    mediumType: mediumType as MediumType,
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
