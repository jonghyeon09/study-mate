import type { StudyList } from '@/types';
import apiClient from './apiClient';

type Data = {
  description: string;
  openDate?: string;
};

export const getStudyList = async () => {
  try {
    const response = await apiClient.get<StudyList>('/study');
    return response.data;
  } catch (error) {
    throw error;
  }
};
