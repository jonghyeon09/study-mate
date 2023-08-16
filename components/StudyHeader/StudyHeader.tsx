import { useQuery } from '@tanstack/react-query';
import MenuIcon from '../icons/MenuIcon';
import Dropdown from './Dropdown';
import Header from '../common/Header';
import { getStudyList } from '@/services';
import { useRecoilState } from 'recoil';
import { currentStudyState, isOpenSideState } from '@/recoil/atoms';
import { useEffect, useState, useRef } from 'react';
import type { Study } from '@/types';
import { getStudyDetail } from '@/services/getStudyDetail';
import { useRouter } from 'next/router';
import useOutsideClick from '@/hooks/useOutsideClick';
import { motion } from 'framer-motion';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { memo } from 'react';
import SideMenu from '../SideMenu/SideMenu';

type Props = {
  children?: React.ReactNode;
};

function StudyHeader({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSide, setIsOpenSide] = useRecoilState(isOpenSideState);
  const [current, setCurrent] = useRecoilState(currentStudyState);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const { query, pathname, push } = useRouter();
  const { data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  const { refetch } = useQuery({
    queryKey: ['studyDetail', current?.studyId],
    queryFn: () => getStudyDetail(current?.studyId),
    enabled: !!current?.studyId,
  });

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const handelSelectStudy = (current: Study) => {
    setIsOpen(false);
    push({
      pathname,
      query: {
        ...query,
        study: current.studyId,
      },
    });
    setCurrent(current);
    refetch();
  };

  const handleClickMenu = () => {
    setIsOpenSide((prev) => !prev);
  };

  useEffect(() => {
    if (studyList?.study) {
      setCurrent(studyList?.study[0]);
    }
  }, [setCurrent, studyList?.study]);

  return (
    <>
      <Header>
        <motion.nav
          ref={dropdownRef}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
        >
          <motion.button
            type="button"
            className="flex items-center"
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p className="font-medium text-base">{current?.description}</p>
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.5 }}
            >
              <ArrowDownIcon />
            </motion.div>
          </motion.button>
          <Dropdown
            isOpen={isOpen}
            studyList={studyList?.study}
            onClick={handelSelectStudy}
          />
        </motion.nav>
        <MenuIcon onClick={handleClickMenu} />
      </Header>
    </>
  );
}

export default memo(StudyHeader);
