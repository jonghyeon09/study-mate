import { LoginUser } from '@/types';
import apiClient from './apiClient';

export const getLoginUser = async (accessToken: string) => {
  try {
    const response = await apiClient.post<LoginUser>('/auth/kakao', {
      accessToken,
    });

    return response.data;
  } catch (error) {
    alert('로그인 실패');
  }
};
