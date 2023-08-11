import config from '@/config';
import axios from 'axios';
import { token } from '@/lib/cookies';

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
