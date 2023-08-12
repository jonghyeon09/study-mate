import type { CreateStudy } from '@/types';
import apiClient from './apiClient';

/**
 * description: 생성할 스터디명
 * openDate: 스터디 개설일
 */
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
