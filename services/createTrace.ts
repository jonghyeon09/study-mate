import type { CreateTrace } from '@/types';
import apiClient from './apiClient';

type Data = {
  title: string;
  description: string;
  images: FormData;
};

export const createTrace = async (studyId: string, data: Data) => {
  try {
    const response = await apiClient.post<CreateTrace>(
      `/study/${studyId}/trace`,
      {
        title: data.title,
        description: data.description,
        images: data.images,
      },
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
