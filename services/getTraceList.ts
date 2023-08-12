import type { TraceList } from '@/types';
import apiClient from './apiClient';

type Options = {
  studyId: number;
  params?: {
    date: string;
    page: number;
  };
};

export const getTraceList = async (options: Options) => {
  try {
    const response = await apiClient.get<TraceList>(
      `/study/${options.studyId}/trace`,
      {
        params: options.params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
