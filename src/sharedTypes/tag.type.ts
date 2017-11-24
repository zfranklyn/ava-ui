export enum Color {
  BLUE = '#2965CC',
  FOREST = '#29A634',
  ORANGE = '#D99E0B',
  RED = '#D13913',
  PURPLE = '#8F398F',
  TEAL = '#00B3A4',
  PINK = '#DB2C6F',
  LIGHT_GREEN = '#9BBF30',
  BROWN = '#96622D',
  GRAY = '#5C7080',
}

export interface ITag {
  text: string;
  color: Color;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITagAPI {
  text: string;
  color: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertTag = (rawData: ITagAPI): ITag => {
  const { text, color, id, createdAt, updatedAt } = rawData;
  return {
    text,
    color: color as Color,
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
