import apiClient from './apiClient';

/**
 * description: 스터디 이름
 */
type Data = {
  params: {
    studyId: string;
  };
};

export const exitStudy = async ({ params }: Data) => {
  try {
    const response = await apiClient.delete<Data>(
      `/study/${params.studyId}/attendance`
    );
    return response.data;
  } catch (error) {
    alert('나가기 실패');
    throw error;
  }
};
