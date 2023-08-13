import type { CreateTrace } from '@/types';
import apiClient from './apiClient';

type Data = {
  studyId: string;
  title: string;
  description: string;
  images: File[];
};

export const createTrace = async (data: Data) => {
  try {
    const response = await apiClient.post<CreateTrace>(
      `/study/${data.studyId}/trace`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    alert('저장 실패');
    throw error;
  }
};
