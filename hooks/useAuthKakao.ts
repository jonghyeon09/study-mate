import config from '@/config';
import { TokenResponse } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';

function useAuthKakao() {
  const router = useRouter();

  const authURL = `${config.KAKAO_AUTH_URL}?response_type=code&client_id=${config.KAKAO_API_KEY}&redirect_uri=${config.REDIRECT_URI}`;

  const getKakaoToken = async (authCode: string | string[]) => {
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
      alert('카카오 인증 실패');
      router.push('/');
    }
  };

  return { authURL, getKakaoToken };
}

export default useAuthKakao;
