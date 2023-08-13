export interface Trace {
  traceId: number;
  title: string;
  writer: string;
  mainImage: string;
}

export interface TraceList {
  status: 'Ok';
  studyId: string;
  date: string;
  page: number;
  trace: Trace[];
}

export interface CreateTrace {
  traceId: number;
  status: 'Created';
}
