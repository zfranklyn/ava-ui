export interface IAPITask {
  id: string;
  timestamp: string;
  type: TaskType;
  message: string;
  medium: MediumType;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskType =
'CUSTOM_MESSAGE'
| 'SURVEY'
| 'REMINDER'
| 'RESET';

export type MediumType =
'EMAIL'
| 'SMS'
| 'APP';

export interface ITask {
  timestamp: string;
  type: TaskType;
  medium: MediumType;
  message: string;
  completed: boolean;
}

export class Task implements ITask {
  public timestamp: string;
  public type: TaskType;
  public message: string;
  public completed: boolean;
  public medium: MediumType;

  public constructor(message: string, type: TaskType, medium: MediumType) {
    this.timestamp = JSON.stringify(new Date());
    this.type = type;
    this.message = message;
    this.completed = false;
    this.medium = medium;
  }
}
