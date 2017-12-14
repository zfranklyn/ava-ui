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
  tel: string;
  userType: UserType;
  userRole: UserRoleType;
  notes: string;
  metadata: object;
  id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserAPI {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  userType: string;
  userRole: string;
  notes: string;
  metadata: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const convertUser = (rawData: IUserAPI): IUser => {
  const { firstName, tel, lastName, email, userType, userRole, notes, metadata, id, createdAt, updatedAt } = rawData;
  return {
    firstName,
    lastName,
    email,
    tel,
    userType: userType as UserType,
    userRole: userRole as UserRoleType,
    notes,
    metadata: JSON.parse(metadata),
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
