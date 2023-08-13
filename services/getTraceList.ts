import type { TraceList } from '@/types';
import apiClient from './apiClient';

type Options = {
  studyId?: string | undefined;
  params?: {
    date?: string;
    page?: number;
  };
};

export const getTraceList = async (options: Options) => {
  if (!options.studyId) return;
  let params = {
    date: options.params?.date,
    page: options.params?.page,
  };
  try {
    const response = await apiClient.get<TraceList>(
      `/study/${options.studyId}/trace`,
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
