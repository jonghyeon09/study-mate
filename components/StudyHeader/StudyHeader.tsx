import { useQuery } from '@tanstack/react-query';
import MenuIcon from '../icons/MenuIcon';
import Dropdown from './Dropdown';
import Header from './Header';
import { getStudyList } from '@/services';
import { useRecoilState } from 'recoil';
import { currentState } from '@/recoil/atoms';
import { useEffect, useState } from 'react';
import type { Study } from '@/types';
import { getStudyDetail } from '@/services/getStudyDetail';

type Props = {
  children?: React.ReactNode;
};

function StudyHeader({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useRecoilState(currentState);
  const { data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  const { refetch } = useQuery({
    queryKey: ['studyDetail', current.studyId],
    queryFn: () => getStudyDetail(current.studyId),
    enabled: !!current.studyId,
  });

  const handelSelectStudy = (name: Study) => {
    setCurrent(name);
    refetch();
  };

  useEffect(() => {
    if (studyList?.study) {
      setCurrent(studyList?.study[0]);
    }
  }, [setCurrent, studyList?.study]);

  return (
    <Header>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <Dropdown
          isOpen={isOpen}
          studyList={studyList?.study}
          onClick={handelSelectStudy}
        >
          <p className="font-medium text-base">{current.description}</p>
        </Dropdown>
      </button>
      <MenuIcon />
    </Header>
  );
}

export default StudyHeader;