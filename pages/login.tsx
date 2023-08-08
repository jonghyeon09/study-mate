import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import { getLoginUser } from '@/services';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Login() {
  const { getKakaoToken } = useAuthKakao();
  const router = useRouter();
  const { code } = router.query;

  const handleLogin = async () => {
    if (!code) return;
    const res = await getKakaoToken(code);
    if (!res) return;

    const user = await getLoginUser(res.access_token);
  };

  // useEffect(() => {
  //   handleLogin();
  // }, [handleLogin]);

  return (
    <Layout>
      <h1>로그인 화면</h1>
    </Layout>
  );
}

export default Login;
