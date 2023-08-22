import { useState } from 'react';
import { motion } from 'framer-motion';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { useQuery } from '@tanstack/react-query';
import { getStudyList } from '@/services';
import { useRecoilState } from 'recoil';
import { currentStudyState } from '@/recoil/atoms';
import { useRouter } from 'next/router';
import { getStudyDetail } from '@/services/getStudyDetail';
import { Study } from '@/types';

function StudyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useRecoilState(currentStudyState);
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

  const handelSelectStudy = (study: Study) => {
    setIsOpen(false);
    push({
      pathname,
      query: {
        ...query,
        study: study.studyId,
      },
    });
    setCurrent(study);
    refetch();
  };

  return (
    <motion.div
      className="relative z-10"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.button
        className="flex items-center"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-white text-start">{current?.description}</p>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.5 }}
        >
          <ArrowDownIcon white />
        </motion.div>
      </motion.button>
      <motion.ul
        className="flex flex-col gap-[12px] absolute top-[36px] w-[192px] max-h-[30vh] overflow-y-auto p-[12px] border-2 border-white rounded-md bg-black"
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        {studyList?.study?.map(
          (item, i) =>
            item.enabled && (
              <li key={i} className="text-white">
                <button
                  className="w-full text-start"
                  onClick={() => handelSelectStudy(item)}
                >
                  {item.description}
                </button>
              </li>
            )
        )}
      </motion.ul>
    </motion.div>
  );
}

export default StudyDropdown;
