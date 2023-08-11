import type { LoginUser } from '@/types';
import axios from 'axios';
import config from '@/config';

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLoginUser = async (accessToken: string) => {
  try {
    const response = await apiClient.post<LoginUser>('/auth/kakao', {
      accessToken,
    });

    return response.data;
  } catch (error) {
    throw new Error('로그인 유저 정보');
  }
};
