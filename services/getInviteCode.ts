import type { Invite } from '@/types';
import apiClient from './apiClient';

type Data = {
  params: {
    studyId: string;
  };
};

export const getInviteCode = async ({ params }: Data) => {
  try {
    const response = await apiClient.get<Invite>(
      `/study/${params.studyId}/invite`
    );
    return response.data;
  } catch (error) {
    alert('초대 코드생성 실패');
    throw error;
  }
};
