import type { NoticeList } from '@/types';
import apiClient from './apiClient';

export const getNotice = async (studyId?: string) => {
  if (!studyId) return;
  try {
    const response = await apiClient.get<NoticeList>(
      `/study/${studyId}/notice`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
