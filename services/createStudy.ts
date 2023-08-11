import type { CreateStudy } from '@/types';
import apiClient from './apiClient';

type Data = {
  description: string;
  openDate?: string;
};

export const createStudy = async (data: Data) => {
  try {
    const response = await apiClient.post<CreateStudy>('/study', data);
    return response.data;
  } catch (error) {
    alert('스터디 생성 실패');
    throw error;
  }
};
