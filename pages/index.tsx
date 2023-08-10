import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function Home() {
  const { authURL } = useAuthKakao();
  const [token] = useLocalStorage('token');
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
    <Layout>
      <h1 className="text-xl">Home</h1>
      <div className="flex justify-center items-center h-full">
        <Link href={authURL}>카카오 로그인</Link>
        <Link href={'/welcome'}>welcome</Link>
      </div>
    </Layout>
  );
}
