import Layout from '@/components/common/Layout';
import { getToken } from '@/services';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Login() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const handleLogin = async () => {
      if (typeof code === 'string') {
        const data = await getToken(code);
        router.push('/');
      }
    };
    handleLogin();
  }, [code, router]);

  return (
    <Layout>
      <h1>로그인 화면</h1>
    </Layout>
  );
}

export default Login;
