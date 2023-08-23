import type { CreateTrace } from '@/types';
import apiClient from './apiClient';
import axios from 'axios';

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
    if (axios.isAxiosError(error)) {
      error.status === 500 ? alert('이미지 용량이 초과하였습니다.') : null;
    } else {
      alert('저장 실패');
    }
    throw error;
  }
};
