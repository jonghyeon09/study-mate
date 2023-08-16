import Profile from './Profile';
import StudyList from './StudyList';

type Props = {};

function SideMenu({}: Props) {
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 pt-[--h-header] overflow-hidden z-50"></div>

      <nav className="w-[300px] h-[calc(100%-var(--h-header))] flex flex-col absolute right-0 py-[60px] pl-[45px] bg-black z-50">
        <Profile />

        <div className="flex flex-col gap-[12px] mt-[108px]">
          <button className="text-white text-start">새 스터디 만드리</button>
          <button className="text-white text-start">스터디 목록</button>
        </div>

        <h1 className="text-white text-2xl font-bold mt-[24px]">관리</h1>

        <StudyList />

        <div className="flex flex-col gap-[12px] mt-[20px]">
          <button className="text-white text-start">스터디 팀원</button>
          <button className="text-white text-start">공지사항 작성</button>
          <button className="text-white text-start">
            스터디 초대링크 복사
          </button>
        </div>

        <button className="absolute bottom-[60px] text-white text-start">
          로그아웃
        </button>
      </nav>
    </>
  );
}

export default SideMenu;
