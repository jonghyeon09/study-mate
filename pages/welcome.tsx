import CreateStudy from '@/components/CreateStudy';
import Layout from '@/components/common/Layout';
import UnderLine from '@/components/common/UnderLine';
import useLocalStorage from '@/hooks/useLocalStorage';
import { isLoginState } from '@/recoil/atoms';
import type { profile } from '@/types';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import caleander from '@/public/icons/caleander.png';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { SCDream } from './index';

export default function Welcome() {
  const [profile] = useLocalStorage<profile>('profile', {
    username: '',
    profileImage: '',
  });
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [underLineWidth, setUnderLineWidth] = useState(0);
  const isLogin = useRecoilValue(isLoginState);
  const router = useRouter();
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isLogin) router.push('/');
  }, [isLogin, router]);

  useEffect(() => {
    setUserName(profile.username);
  }, [profile.username]);

  useEffect(() => {
    if (pRef.current) {
      setUnderLineWidth(pRef.current.clientWidth - 6);
    }
  }, [userName]);

  return (
    <Layout
      className={`${SCDream.className} bg-[--color-main] px-[24px] flex flex-col justify-center`}
    >
      <div className="flex flex-col justify-center">
        <div className="relative flex items-end">
          <p className="text-4xl z-10" ref={pRef}>
            {userName}
          </p>
          <p className="text-xl font-light">님 반가워요!</p>
          <UnderLine width={underLineWidth} height={12} />
        </div>
        <p className="text-xl font-light">함께 도전할 친구들을 기다려요.</p>
      </div>

      <div className="w-full h-[371px] bg-[--color-gray] pt-[21px] px-[21px] flex justify-center border-shadow mt-[22px]">
        <Image src={caleander} alt="caleander" className="mb-[-6px]" />
      </div>

      <Button className="mt-[36px]" onClick={() => setOpen(true)}>
        <p className="text-white font-bold">스터디 시작하기</p>
      </Button>

      {open && <CreateStudy onClose={() => setOpen(false)} />}
    </Layout>
  );
}
