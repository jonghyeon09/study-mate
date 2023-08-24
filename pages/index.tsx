import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import Link from 'next/link';
import { useEffect } from 'react';
import localFont from 'next/font/local';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';
import { useRouter } from 'next/router';
import Image from 'next/image';
import kakaoLogin from '@/public/icons/kakao_login.png';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@/recoil/atoms';
import useLocalStorage from '@/hooks/useLocalStorage';
import logo from '@/public/icons/login_logo.png';
import { NextSeo } from 'next-seo';

export default function Home() {
  const [token, setToken] = useLocalStorage('token', '');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { authURL } = useAuthKakao();
  const router = useRouter();
  const { isLoading, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
    enabled: isLogin,
  });

  // 로그아웃 하지 않고 실행
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

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  return (
    <>
      <NextSeo
        title="STUDY MATE"
        description="매일매일 꾸준하게 성실하게 공부기록 스터디 인증 공유 서비스"
      />
      {!isLogin && (
        <Layout className={SCDream.className}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
            <Image src={logo} alt="logo" />
          </div>
          <div className="absolute bottom-[154px] left-1/2 -translate-x-1/2">
            <Link href={authURL}>
              <Image src={kakaoLogin} alt="login-Button" />
            </Link>
          </div>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export const SCDream = localFont({
  src: [
    {
      path: '../public/fonts/SCDream1.otf',
      weight: '100',
    },
    {
      path: '../public/fonts/SCDream2.otf',
      weight: '200',
    },
    {
      path: '../public/fonts/SCDream3.otf',
      weight: '300',
    },
    {
      path: '../public/fonts/SCDream4.otf',
      weight: '400',
    },
    {
      path: '../public/fonts/SCDream5.otf',
      weight: '500',
    },
    {
      path: '../public/fonts/SCDream6.otf',
      weight: '600',
    },
    {
      path: '../public/fonts/SCDream7.otf',
      weight: '700',
    },
    {
      path: '../public/fonts/SCDream8.otf',
      weight: '800',
    },
    {
      path: '../public/fonts/SCDream9.otf',
      weight: '900',
    },
  ],
});
