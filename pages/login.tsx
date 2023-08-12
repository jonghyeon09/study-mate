import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setToken } from '@/lib/cookies';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';
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
  const { isLoading, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
    enabled: isLogin,
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
    if (!isLogin) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isLogin]);

  useEffect(() => {
    if (!studyList) return;
    if (studyList.study.length !== 0) {
      router.push(`/study/${studyList.userId}`);
    } else {
      router.push(`/welcome`);
    }
  }, [studyList, router]);

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
