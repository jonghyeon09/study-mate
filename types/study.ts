export interface CreateStudy {
  createdId: string;
  status: 'Created';
}

export interface Study {
  studyId: string;
  enabled: boolean;
  studyLeadUserId: number;
  description: string;
  role: string;
  openDate: string;
}

export interface StudyList {
  status: 'Ok';
  userId: number;
  study: Study[];
}
