import apiClient from './apiClient';

type Data = {
  params: {
    studyId: string;
  };
  data: {
    tag: string;
    description: string;
  };
};

export const createNotice = async ({ params, data }: Data) => {
  try {
    const response = await apiClient.post(
      `/study/${params.studyId}/notice`,
      data
    );
    return response.data;
  } catch (error) {
    alert('등록 실패');
    throw error;
  }
};
