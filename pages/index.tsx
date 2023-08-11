import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import localFont from 'next/font/local';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';
import { useRouter } from 'next/router';

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

export default function Home() {
  const { authURL } = useAuthKakao();
  const [token] = useLocalStorage('token', '');
  const setIsLogin = useSetRecoilState(isLoginState);
  const router = useRouter();
  const { isLoading, data } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  console.log(data);

  // 로그아웃 하지 않고 실행
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  useEffect(() => {
    if (!data) return;
    if (data.study.length !== 0) {
      router.push(`/study/${data.userId}`);
    } else {
      router.push(`/welcome`);
    }
  }, [data, router]);

  return (
    <Layout className={SCDream.className}>
      {isLoading && <div>로딩중...</div>}
      {!isLoading && (
        <>
          <h1 className="text-xl">Home</h1>
          <div className="flex flex-col justify-center items-center h-full">
            <Link href={authURL}>카카오 로그인</Link>
            <Link href={'/welcome'}>welcome페이지 강제이동</Link>
          </div>
        </>
      )}
    </Layout>
  );
}
