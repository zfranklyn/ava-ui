export type UserType =
  'RESEARCHER'
  |'PARTICIPANT';

export type UserRoleType =
  'TEACHER'
  |'STUDENT'
  |'ADMIN'
  |'PARENT'
  |'OTHER';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  userRole: UserRoleType;
  notes: string;
  metadata: object;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserAPI {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  userRole: string;
  notes: string;
  metadata: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
