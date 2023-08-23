import axios from 'axios';
import apiClient from './apiClient';

type Data = {
  data: {
    code: string;
  };
};

export const joinStudy = async ({ data }: Data) => {
  try {
    const response = await apiClient.post<{ studyId: string }>(`/invite`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      error.status === 400
        ? alert('이미 참여중 이거나 만료된 초대코드 입니다')
        : null;
    } else {
      alert('스터디 참여 실패');
    }

    throw error;
  }
};
