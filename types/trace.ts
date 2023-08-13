export interface Trace {
  traceId: number;
  title: string;
  writer: string;
  mainImage: string;
}

export interface TraceList {
  status: string;
  studyId: string;
  date: string;
  page: number;
  trace: Trace[];
}

export interface CreateTrace {
  traceId: number;
  status: string;
}

export interface TraceDetail {
  status: string;
  trace: {
    traceId: number;
    title: string;
    writer: string;
    description: string;
    mainImage: string;
    allImages: string[];
  };
}
