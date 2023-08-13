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
import Splash from '@/components/Splash/Splash';
import useLocalStorage from '@/hooks/useLocalStorage';
import useUpdateQuery from '@/hooks/useUpdateQuery';
import logo from '@/public/icons/login_logo.png';

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
  const [token, setToken] = useLocalStorage('token', '');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { authURL } = useAuthKakao();
  const router = useRouter();
  const { updateQuery } = useUpdateQuery();
  const { isFetching, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
    enabled: isLogin,
  });

  // 로그아웃 하지 않고 실행
  useEffect(() => {
    if (!studyList) return;
    if (studyList.study.length !== 0) {
      // router.push(`/study/${studyList.userId}`);
      updateQuery('/study/[id]', {
        id: studyList.userId,
        study: studyList.study[0].studyId,
      });
    } else {
      router.push(`/welcome`);
    }
  }, [studyList, router, updateQuery]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin, token]);

  return (
    <>
      {isFetching && <Splash />}
      <Layout className={SCDream.className}>
        <div className="absolute top-[205px] left-1/2 -translate-x-1/2">
          <Image src={logo} alt="logo" />
        </div>
        <div className="absolute bottom-[154px] left-1/2 -translate-x-1/2">
          <Link href={authURL}>
            <Image src={kakaoLogin} alt="login-Button" />
          </Link>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
