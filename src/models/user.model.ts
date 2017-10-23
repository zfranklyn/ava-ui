export type UserType =
  'RESEARCHER'
  | 'PARTICIPANT';

export type UserRoleType =
  'TEACHER'
  | 'STUDENT'
  | 'ADMIN'
  | 'PARENT'
  | 'OTHER';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  userType: UserType;
  userRole: UserRoleType;
  username?: string;
  password?: string;
  notes?: string;
}
