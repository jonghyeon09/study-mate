import CreateStudy from '@/components/CreateStudy';
import Layout from '@/components/common/Layout';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import type { profile } from '@/types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function Welcome() {
  const [profile] = useLocalStorage<profile>('profile');
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const isLogin = useRecoilValue(isLoginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) router.push('/');
  }, [isLogin, router]);

  useEffect(() => {
    setUserName(profile.username);
  }, [profile.username]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div>
          <p>{userName}님 반가워요!</p>
          <p>함께 도전할 친구들을 기다려요.</p>
        </div>
        <button className="flex" type="button" onClick={() => setOpen(true)}>
          스터디 시작하기
        </button>
      </div>
      {open && <CreateStudy onClose={() => setOpen(false)} />}
    </Layout>
  );
}
