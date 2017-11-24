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

export const convertStudy = (rawData: IStudyAPI): IStudy => {
  const { title, description, metadata, active, archived, id, createdAt, updatedAt } = rawData;
  return {
    title,
    description,
    metadata: JSON.parse(metadata),
    active,
    archived,
    id,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
};
