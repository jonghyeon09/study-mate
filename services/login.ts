import config from '@/config';
import type { LoginUser } from '@/types';
import axios from 'axios';

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLoginUser = async (accessToken: string) => {
  try {
    const response = await instance.post<LoginUser>('/auth/kakao', {
      accessToken,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
