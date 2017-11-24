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
