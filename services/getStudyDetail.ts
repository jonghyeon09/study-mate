import type { StudyList } from '@/types';
import apiClient from './apiClient';

export const getStudyDetail = async (studyId: string | undefined) => {
  if (!studyId) return;
  try {
    const response = await apiClient.get<StudyList>(`/study/${studyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
