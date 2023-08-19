import { isOpenStudyListState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';

function StudyList() {
  const [isOpenStudyList, setIsOpenStudyList] =
    useRecoilState(isOpenStudyListState);
  return <div>StudyList</div>;
}

export default StudyList;
