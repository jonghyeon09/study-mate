import config from '@/config';
import axios from 'axios';

type TokenResponse = {
  token_type: string;
  access_token: string;
  id_token?: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  scope?: string;
};

export const authKakao = `${config.KAKAO_AUTH_URL}?response_type=code&client_id=${config.KAKAO_API_KEY}&redirect_uri=${config.REDIRECT_URI}`;

export const getToken = async (authCode: string) => {
  try {
    const response = await axios<TokenResponse>({
      method: 'post',
      url: config.KAKAO_TOKEN_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: config.KAKAO_API_KEY,
        code: authCode,
      },
    });

    return response.data;
  } catch (error) {
    window.location.href = '/';
    throw new Error('로그인 실패');
  }
};
