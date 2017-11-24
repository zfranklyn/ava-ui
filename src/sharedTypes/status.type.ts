export interface IStatus {
  completed: boolean;
  completionTime: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStatusAPI {
  completed: boolean;
  completionTime: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertStatus = (rawData: IStatusAPI): IStatus => {
  const { completed, completionTime, id, createdAt, updatedAt } = rawData;
  return {
    completed,
    completionTime: new Date(completionTime),
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
