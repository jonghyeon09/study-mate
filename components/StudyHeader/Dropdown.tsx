import type { Study } from '@/types';
import { motion } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  isOpen: boolean;
  studyList: Study[] | undefined;
  onClick: (study: Study) => void;
};

function Dropdown({ isOpen, studyList, onClick }: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  return (
    <>
      <motion.ul
        ref={dropdownRef}
        className="flex flex-col absolute top-[54px] font-medium leading-6 bg-white input-shadow py-[12px] z-50 max-h-[50vh] overflow-auto"
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(0% 50% 90% 50%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {studyList?.map((study) => (
          <motion.li
            className="cursor-pointer p-[12px] hover:bg-gray-100"
            key={study.studyId}
            onClick={() => onClick(study)}
          >
            {study.description}
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}

export default Dropdown;
