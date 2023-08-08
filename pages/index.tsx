import Layout from '@/components/common/Layout';
import useAuthKakao from '@/hooks/useAuthKakao';
import Link from 'next/link';

export default function Home() {
  const { authURL } = useAuthKakao();

  return (
    <Layout>
      <h1 className="text-xl">Home</h1>
      <div className="flex justify-center items-center h-full">
        <Link href={authURL}>카카오 로그인</Link>
      </div>
    </Layout>
  );
}
