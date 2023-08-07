import Layout from '@/components/common/Layout';
import { authKakao } from '@/services';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-xl">Home</h1>
      <div className="flex justify-center items-center h-full">
        <Link href={authKakao}>카카오 로그인</Link>
      </div>
    </Layout>
  );
}
