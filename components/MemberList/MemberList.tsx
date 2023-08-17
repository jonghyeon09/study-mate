import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import Layout from '../common/Layout';
import Main from '../common/Main';
import PopupLayout from '../common/PopupLayout';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { isOpenMembersState } from '@/recoil/atoms';

function MemberList() {
  const [isOpenMembers, setIsOpenMembers] = useRecoilState(isOpenMembersState);
  return (
    <PopupLayout>
      <Layout>
        <Header>
          <ArrowLeftIcon onClick={() => setIsOpenMembers(false)} />
          <div className="w-full relative flex justify-center">
            <p className="font-medium text-xl">스터디 팀원 목록</p>
          </div>
        </Header>

        <Main className="bg-white"></Main>
      </Layout>
    </PopupLayout>
  );
}

export default MemberList;
