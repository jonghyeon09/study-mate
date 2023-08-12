import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setToken, token } from '@/lib/cookies';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';
import Splash from '@/components/Splash/Splash';

export default function Login() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { login } = useAuthKakao();
  const router = useRouter();
  const [profile, setProfile] = useLocalStorage<profile>('profile', {
    username: '',
    profileImage: '',
    lastAccessedStudyId: 0,
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (isLogin) return;
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

    if (!token) {
      handleLogin();
    }
  }, [isLogin, login, router, setIsLogin, setProfile]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [router, setIsLogin]);

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);

  // useEffect(() => {
  //   if (!studyList) return;
  //   if (studyList.study.length !== 0) {
  //     router.push(`/study/${studyList.userId}`);
  //   } else {
  //     router.push(`/welcome`);
  //   }
  // }, [studyList, router]);

  return (
    <Layout>
      <Splash />
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
