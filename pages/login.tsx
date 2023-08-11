import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { setToken, token } from '@/lib/cookies';

export default function Login() {
  const { login } = useAuthKakao();
  const router = useRouter();
  const [profile, setProfile] = useLocalStorage<profile>('profile', {
    username: '',
    profileImage: '',
    lastAccessedStudyId: 0,
  });
  const setIsLogin = useSetRecoilState(isLoginState);

  const handleLogin = async () => {
    const { code } = router.query;

    if (code) {
      const res = await login(code);
      const newUser = res.isNew;

      setToken(res.token);
      setProfile(res.user);
      setIsLogin(true);

      if (newUser) router.push('/welcome');
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
      <h1>Loading...</h1>
    </Layout>
  );
}
