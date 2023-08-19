import { currentStudyState, isOpenStudyListState } from '@/recoil/atoms';
import { getStudyList } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import PopupLayout from '../common/PopupLayout';
import Layout from '../common/Layout';
import Header from '../common/Header';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import Main from '../common/Main';

function StudyList() {
  const [isOpenStudyList, setIsOpenStudyList] =
    useRecoilState(isOpenStudyListState);
  const [currentStudy, setCurrentStudy] = useRecoilState(currentStudyState);
  const { data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });

  return (
    <PopupLayout>
      <Layout>
        <Header>
          <ArrowLeftIcon onClick={() => setIsOpenStudyList(false)} />
          <div className="w-full relative flex justify-center">
            <p className="font-medium text-xl">스터디 목록</p>
          </div>
        </Header>

        <Main className="flex bg-white p-[24px] overflow-hidden overflow-y-auto">
          <ul className="flex flex-col flex-1 gap-[12px] py-[24px]">
            {studyList?.study.map((item) => (
              <li
                key={item.studyId}
                className="popup-list justify-between flex-wrap"
              >
                <div className="flex items-center w-[192px] sm:w-3/5">
                  <p className="truncate">{item.description}</p>
                </div>
                <div className="flex items-center w-[107px] text-sm font-bold">
                  <button>나가기</button> <p>&nbsp;|&nbsp;</p>{' '}
                  {currentStudy?.role === 'master' && <button>수정하기</button>}
                </div>
              </li>
            ))}
          </ul>
        </Main>
      </Layout>
    </PopupLayout>
  );
}

export default StudyList;
