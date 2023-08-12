import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';
import Splash from '@/components/Splash/Splash';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';
import useUpdateQuery from '@/hooks/useUpdateQuery';

export default function Login() {
  const [token, setToken] = useLocalStorage('token', '');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { login } = useAuthKakao();
  const router = useRouter();
  const { updateQuery } = useUpdateQuery();
  const [profile, setProfile] = useLocalStorage<profile>('profile', {
    username: '',
    profileImage: '',
    lastAccessedStudyId: 0,
  });
  const { isFetching, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
    enabled: isLogin,
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
  }, [isLogin, login, router, setIsLogin, setProfile, setToken, token]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  useEffect(() => {
    if (!studyList) return;
    if (studyList.study.length !== 0) {
      updateQuery('/study/[id]', {
        id: studyList.userId,
        study: studyList.study[0].studyId,
      });
    } else {
      router.push(`/welcome`);
    }
  }, [studyList, router, updateQuery]);

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
