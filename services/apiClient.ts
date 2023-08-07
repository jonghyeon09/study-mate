import config from '@/config';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
