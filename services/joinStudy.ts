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
    alert('스터디 참여 실패');
    throw error;
  }
};
