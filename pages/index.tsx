import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import localFont from 'next/font/local';

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

  // 로그아웃 하지 않고 실행
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  // useEffect(() => {
  //   if (token) {
  //     // 스터디로 이동하는 로직 추가
  //   }
  // }, [token]);

  return (
    <Layout className={SCDream.className}>
      <h1 className="text-xl">Home</h1>
      <div className="flex justify-center items-center h-full">
        <Link href={authURL}>카카오 로그인</Link>
        <Link href={'/welcome'}>welcome</Link>
      </div>
    </Layout>
  );
}
