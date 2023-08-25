import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import NoticeIcon from '../icons/NoticeIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { useQuery } from '@tanstack/react-query';
import { getNotice } from '@/services/getNotice';

type Props = {
  studyId: string | undefined;
};

function Notice({ studyId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: noticeList } = useQuery({
    queryKey: ['notice', studyId],
    queryFn: () => getNotice(studyId),
    enabled: !!studyId,
  });

  const handleNotice = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      className="w-full px-[24px] bg-black"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <button
        className="flex items-center gap-[4px] relative w-full h-[54px]"
        onClick={handleNotice}
      >
        <NoticeIcon className="w-[24px] h-[24px]" />
        <p className="text-white">공지사항이 있어요!</p>
        <motion.div
          className="absolute right-[15px]"
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowDownIcon white />
        </motion.div>
      </button>

      <ul className="text-white">
        {noticeList?.notice.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-[4px] h-[54px]"
            variants={{
              open: {
                opacity: 1,
                height: '54px',
                transition: {
                  duration: 0.3,
                },
              },
              closed: {
                opacity: 0,
                height: 0,
                transition: {
                  duration: 0.3,
                },
              },
            }}
          >
            <p className="w-[24px] h-[24px]">{item.tag}</p>
            <p>{item.description}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default memo(Notice);
