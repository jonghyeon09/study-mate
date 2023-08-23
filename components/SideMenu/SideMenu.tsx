import Profile from './Profile';
import StudyDropdown from './StudyDropdown';
import {
  currentStudyState,
  isCopyState,
  isLoginState,
  isOpenMembersState,
  isOpenSideState,
  isOpenStudyListState,
} from '@/recoil/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import CreateStudy from '../CreateStudy';
import { createPortal } from 'react-dom';
import { useState, useEffect, memo } from 'react';
import MemberList from '../MemberList';
import StudyList from '../StudyList';
import { getInviteCode } from '@/services/getInviteCode';
import config from '@/config';

type Props = {};

function SideMenu({}: Props) {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenStudyList, setIsOpenStudyList] =
    useRecoilState(isOpenStudyListState);
  const setIsOpenSide = useSetRecoilState(isOpenSideState);
  const setIsCopy = useSetRecoilState(isCopyState);
  const [potalEl, setPotalEl] = useState<HTMLBodyElement | null>(null);
  const [isOpenMembers, setIsOpenMembers] = useRecoilState(isOpenMembersState);
  const currentStudy = useRecoilValue(currentStudyState);
  const setIsLoginState = useSetRecoilState(isLoginState);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoginState(false);
  };

  const handleCopy = async () => {
    if (!currentStudy || !config.DOMAIN) return;

    const { code } = await getInviteCode({
      params: {
        studyId: currentStudy?.studyId,
      },
    });

    await navigator.clipboard.writeText(`${config.DOMAIN}/invite/${code}`);
    setIsCopy(true);
    setIsOpenSide(false);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      setPotalEl(body);
    }
  }, []);

  return (
    <>
      {isOpenMembers && <MemberList />}
      {isOpenStudyList && <StudyList />}
      {potalEl &&
        createPortal(
          isOpenCreate && (
            <CreateStudy onClose={() => setIsOpenCreate(false)} />
          ),
          document.body
        )}
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 pt-[--h-header] overflow-hidden z-50"></div>

      <motion.nav
        className="w-[300px] h-[calc(100vh-var(--h-header))] flex flex-col fixed md:absolute right-0 py-[60px] pl-[45px] bg-black z-50"
        initial={{ translateX: '100%' }}
        animate={{ translateX: 0 }}
        exit={{ translateX: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <Profile />

        <div className="flex flex-col gap-[12px] mt-[108px]">
          <button
            className="text-white text-start"
            onClick={() => setIsOpenCreate(true)}
          >
            새 스터디 만들기
          </button>
          <button
            className="text-white text-start"
            onClick={() => setIsOpenStudyList(true)}
          >
            스터디 목록
          </button>
        </div>

        <h1 className="text-white text-2xl font-bold mt-[24px] mb-[8px]">
          관리
        </h1>

        <StudyDropdown />

        <div className="flex flex-col gap-[12px] mt-[20px]">
          <button
            className="text-white text-start"
            onClick={() => setIsOpenMembers(true)}
          >
            스터디 팀원
          </button>
          {currentStudy?.role === 'master' && (
            <button className="text-white text-start">공지사항 작성</button>
          )}

          <button className="text-white text-start" onClick={handleCopy}>
            스터디 초대링크 복사
          </button>
        </div>

        <button
          className="absolute bottom-[60px] text-white text-start"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </motion.nav>
    </>
  );
}

export default memo(SideMenu);
