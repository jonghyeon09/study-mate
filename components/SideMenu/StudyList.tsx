import { useState } from 'react';
import { motion } from 'framer-motion';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type Props = {
  list?: string[];
};

function StudyList({ list }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.button
        className="flex items-center"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-white text-start">스터디 명</p>
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
        className="flex flex-col gap-[12px] absolute top-[36px] w-[192px] p-[12px] border-2 border-white rounded-md bg-black"
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
            clipPath: 'inset(10% 50% 90% 50%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        {list?.map((item, i) => (
          <li key={i} className="text-white">
            {item}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default StudyList;
