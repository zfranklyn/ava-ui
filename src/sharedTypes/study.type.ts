export interface IStudy {
  title: string;
  description: string;
  metadata: object;
  active: boolean;
  archived: boolean;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStudyAPI {
  title: string;
  description: string;
  metadata: string;
  active: boolean;
  archived: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}
