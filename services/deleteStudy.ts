import apiClient from './apiClient';

type Data = {
  params: {
    studyId: string;
  };
};

export const deleteStudy = async ({ params }: Data) => {
  try {
    const response = await apiClient.delete(`/study/${params.studyId}`);
    return response.data;
  } catch (error) {
    alert('종료 실패');
    throw error;
  }
};
