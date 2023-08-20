import type { CreateStudy } from '@/types';
import apiClient from './apiClient';

/**
 * description: 스터디 이름
 */
type Data = {
  params: {
    studyId: string;
  };
  data: {
    description: string;
  };
};

export const updateStudy = async ({ params, data }: Data) => {
  try {
    const response = await apiClient.patch<Data>(
      `/study/${params.studyId}`,
      data
    );
    return response.data;
  } catch (error) {
    alert('이름 변경 실패');
    throw error;
  }
};
