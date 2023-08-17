import type { Members } from '@/types';
import apiClient from './apiClient';

export const getMembers = async (studyId?: string) => {
  if (!studyId) return;
  try {
    const response = await apiClient.get<Members>(
      `/study/${studyId}/attendance`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
