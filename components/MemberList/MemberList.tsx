import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import Layout from '../common/Layout';
import Main from '../common/Main';
import PopupLayout from '../common/PopupLayout';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { currentStudyState, isOpenMembersState } from '@/recoil/atoms';
import { getMembers } from '@/services/getMembers';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import solo from '@/public/icons/solo.png';

function MemberList() {
  const [isOpenMembers, setIsOpenMembers] = useRecoilState(isOpenMembersState);
  const [current, setCurrent] = useRecoilState(currentStudyState);
  const { data: members } = useQuery({
    queryKey: ['members', current?.studyId],
    queryFn: () => getMembers(current?.studyId),
    enabled: !!current?.studyId,
  });

  return (
    <PopupLayout>
      <Layout>
        <Header>
          <ArrowLeftIcon onClick={() => setIsOpenMembers(false)} />
          <div className="w-full relative flex justify-center">
            <p className="font-medium text-xl">스터디 팀원 목록</p>
          </div>
        </Header>

        <Main className="flex bg-white p-[24px] overflow-y-auto">
          <ul className="flex flex-col flex-1 ">
            {members && members.attendance.length <= 1 && (
              <div className="w-full flex flex-col items-center absolute top-1/3 left-0">
                <div className="w-full h-[180px] relative">
                  <Image
                    src={solo}
                    alt="로고"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p>혼자서 스터디하고 계시네요!</p>
              </div>
            )}
            {members &&
              members.attendance.length >= 2 &&
              members.attendance.map((member) =>
                member.master ? (
                  <li
                    key={member.userId}
                    className="flex items-center h-[54px] px-[12px] input-shadow text-xl"
                  >
                    운영자: {member.username}
                  </li>
                ) : (
                  <li
                    key={member.userId}
                    className="flex items-center h-[54px] px-[12px] input-shadow text-xl"
                  >
                    {member.username}
                  </li>
                )
              )}
          </ul>
        </Main>
      </Layout>
    </PopupLayout>
  );
}

export default MemberList;
