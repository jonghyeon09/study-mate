import useLocalStorage from '@/hooks/useLocalStorage';
import type { LoginUser, TokenResponse, profile } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getLoginUser, getStudyList } from '@/services';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import axios from 'axios';
import config from '@/config';
import Splash from '@/components/Splash';

export const getServerSideProps: GetServerSideProps<{
  loginUser: LoginUser;
}> = async ({ query }: GetServerSidePropsContext) => {
  const { code } = query;
  const { data } = await axios<TokenResponse>({
    method: 'post',
    url: config.KAKAO_TOKEN_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: config.KAKAO_API_KEY,
      code,
    },
  });
  const loginUser = await getLoginUser(data.access_token);

  return { props: { loginUser } };
};

export default function Login({
  loginUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [token, setToken] = useLocalStorage('token', '');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const router = useRouter();
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
    setToken(loginUser.token);
    setProfile(loginUser.user);
    setIsLogin(true);

    if (loginUser.isNew) router.push('/welcome');
  }, [loginUser, router, setIsLogin, setProfile, setToken]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  useEffect(() => {
    if (!studyList) return;
    if (studyList.study.length !== 0) {
      router.push({
        pathname: '/study/[id]',
        query: {
          id: studyList.userId,
          study: studyList.study[0].studyId,
        },
      });
    } else {
      router.push(`/welcome`);
    }
  }, [studyList, router]);

  return <Splash />;
}
