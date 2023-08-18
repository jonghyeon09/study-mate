import type { TraceList } from '@/types';
import apiClient from './apiClient';

type Options = {
  studyId?: string;
  params?: {
    date?: string;
    page?: number;
  };
};

export const getTraceList = async ({ studyId, params }: Options) => {
  let query = {
    date: params?.date,
    page: params?.page,
  };

  try {
    const response = await apiClient.get<TraceList>(`/study/${studyId}/trace`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
