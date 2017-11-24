export const TASK_TYPE = {
  CUSTOM_MESSAGE: 'CUSTOM_MESSAGE',
  SURVEY: 'SURVEY',
  REMINDER: 'REMINDER',
  RESET: 'RESET',
};

export type TaskType =
  'CUSTOM_MESSAGE'
  |'SURVEY'
  |'REMINDER'
  |'RESET';

export interface ITask {
  scheduledTime: Date;
  type: TaskType;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskAPI {
  scheduledTime: string;
  type: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertTask = (rawData: ITaskAPI): ITask => {
  const { scheduledTime, type, id, createdAt, updatedAt } = rawData;
  return {
    scheduledTime: new Date(scheduledTime),
    type: type as TaskType,
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
