export const REQUEST_STUDY_DATA = 'REQUEST_STUDY_DATA';
export const RECEIVED_STUDY_DATA = 'RECEIVED_STUDY_DATA';

export type IGetStudyData = { studyID: string };
export type IReceivedStudyData = { id: string, participants: string, };

export type Actions = {
  REQUEST_STUDY_DATA: { type: typeof REQUEST_STUDY_DATA, payload: IGetStudyData },
  RECEIVED_STUDY_DATA: { type: typeof RECEIVED_STUDY_DATA, payload: IReceivedStudyData },
};

export const actionCreators = {
  getStudyByID: (payload: IGetStudyData): Actions[typeof REQUEST_STUDY_DATA] => ({
    type: REQUEST_STUDY_DATA, payload,
  }),
};
