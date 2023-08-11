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

export interface Notice {
  tag: string;
  description: string;
  writed: string;
}

export interface TodaysTrace {
  traceId: number;
  title: string;
  writer: string;
  mainImage: string;
}

export interface StudyDetail {
  status: 'Ok';
  study: Study;
  today: string;
  elapsed: number;
  attendanceCount: number;
  notice: Notice[];
  traceDate: string[];
  todaysTrace: TodaysTrace[];
  studyList: Pick<Study, 'studyId' | 'description'>;
}
