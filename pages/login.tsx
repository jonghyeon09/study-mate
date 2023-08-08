import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

function Login() {
  const { getToken } = useAuthKakao();
  const { storage, setStorage } = useLocalStorage<string>('token');
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const { code } = router.query;
    if (!code) return;

    const token = await getToken(code);

    setStorage(token);
    router.push('/');
  }, [getToken, router, setStorage]);

  useEffect(() => {
    if (storage) {
      router.push('/');
      return;
    }

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); // 개발모드에서 두번실행 막기

  return (
    <Layout>
      <h1>로그인 화면</h1>
    </Layout>
  );
}

export default Login;
