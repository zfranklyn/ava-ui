import {
  MediumType,
} from './';
export const TASK_TYPE = {
  CUSTOM_MESSAGE: 'CUSTOM_MESSAGE',
  SURVEY: 'SURVEY',
  REMINDER: 'REMINDER',
  RESET: 'RESET',
};

export type TaskType =
  'CUSTOM_MESSAGE'
  |'SURVEY'
  |'REMINDER';

export interface ITask {
  scheduledTime: Date;
  type: TaskType;
  message: string;
  description: string;
  subject?: string;
  mediumType: MediumType;
  completed: boolean;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  ParentSurveyTaskId: string;
}

export interface ITaskAPI {
  scheduledTime: string;
  type: string;
  message: string;
  description: string;
  subject?: string;
  mediumType: string;
  id: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  studyId: string;
  ParentSurveyTaskId: string;
  taskId: string;
}

export const convertTask = (rawData: ITaskAPI): ITask => {
  const { 
    scheduledTime, 
    type, 
    message, 
    mediumType, 
    description, 
    id, 
    createdAt, 
    updatedAt, 
    completed,
    ParentSurveyTaskId,
  } = rawData;
  return {
    scheduledTime: new Date(scheduledTime),
    type: type as TaskType,
    id,
    completed,
    mediumType: mediumType as MediumType,
    message, description,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
    ParentSurveyTaskId,
  };
};
