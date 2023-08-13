import type { TraceDetail } from '@/types';
import apiClient from './apiClient';

export const getTraceDetail = async (studyId?: string, traceId?: number) => {
  if (!studyId || !traceId) return;
  try {
    const response = await apiClient.get<TraceDetail>(
      `/study/${studyId}/trace/${traceId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
