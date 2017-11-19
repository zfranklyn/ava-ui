import { IAPITask, /*ITask*/ } from './task.model';
import { IUser } from './user.model';

export interface IAPIStudy {
  id: string;
  title: string;
  description: string;
  metadata: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  tasks: IAPITask[];
  users: IUser[];
}

export interface IStudy {
  id: string;
  title: string;
  description: string;
  metadata: Object;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  tasks: IAPITask[];
  users: IUser[];
}

// export class Study implements IStudy {
//   public title: string;
//   public description: string;
//   public metadata: Object;
//   public active: boolean;
//   public createdAt: Date;
//   public updatedAt: Date;
//   public tasks: ITask[];

//   public constructor(obj: IAPIStudy) {
//     this.title = obj.title;
//     this.description = obj.description;
//     this.metadata = JSON.parse(obj.metadata);
//     this.active = false;
//   }

// }