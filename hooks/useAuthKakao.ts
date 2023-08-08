import config from '@/config';
import { getLoginUser } from '@/services';
import { TokenResponse, User } from '@/types';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

function useAuthKakao() {
  const { setStorage } = useLocalStorage<User>('user');

  const authURL = `${config.KAKAO_AUTH_URL}?response_type=code&client_id=${config.KAKAO_API_KEY}&redirect_uri=${config.REDIRECT_URI}`;

  const getToken = async (authCode: string | string[]) => {
    try {
      const { data } = await axios<TokenResponse>({
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
      const login = await getLoginUser(data.access_token);

      setStorage(login.user);
      return login.token;
    } catch (error) {
      alert('로그인 실패');
      throw new Error('로그인 실패');
    }
  };

  return { authURL, getToken };
}

export default useAuthKakao;
