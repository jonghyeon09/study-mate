import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

function Login() {
  const { login } = useAuthKakao();
  const router = useRouter();
  const [token, setToken] = useLocalStorage<string>('token');
  const [profile, setProfile] = useLocalStorage<profile>('profile');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const handleLogin = async () => {
    const { code } = router.query;

    if (code) {
      const res = await login(code);
      setToken(res.token);
      setProfile(res.user);
      setIsLogin(true);
      router.push('/');
    }
  };

  useEffect(() => {
    if (token) {
      router.push('/');
    } else {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, token]);

  return (
    <Layout>
      <h1>로그인 화면</h1>
    </Layout>
  );
}

export default Login;
