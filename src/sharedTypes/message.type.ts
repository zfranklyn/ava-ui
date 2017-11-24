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
