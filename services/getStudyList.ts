import type { StudyList } from '@/types';
import apiClient from './apiClient';

export const getStudyList = async () => {
  try {
    const response = await apiClient.get<StudyList>('/study');
    return response.data;
  } catch (error) {
    throw error;
  }
};
