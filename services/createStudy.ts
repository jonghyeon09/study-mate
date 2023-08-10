import apiClient from './apiClient';

type Data = {
  description: string;
  openDate?: string;
};

export const createStudy = async ({ description }: Data) => {
  try {
    const response = await apiClient.post('/study', {
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
