import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { setToken } from '@/lib/cookies';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';

export default function Login() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { login } = useAuthKakao();
  const router = useRouter();
  const [profile, setProfile] = useLocalStorage<profile>('profile', {
    username: '',
    profileImage: '',
    lastAccessedStudyId: 0,
  });

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
    if (isLogin) {
      router.push('/');
    } else {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isLogin]);

  return <Layout></Layout>;
}
