import { useState } from 'react';
import { motion } from 'framer-motion';
import NoticeIcon from '../icons/NoticeIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { useQuery } from '@tanstack/react-query';
import { getNotice } from '@/services/getNotice';

type Props = {
  studyId: string | undefined;
};

function Notice({ studyId }: Props) {
  const [isNotice, setIsNotice] = useState(false);
  const { data: notice } = useQuery({
    queryKey: ['notice', studyId],
    queryFn: () => getNotice(studyId),
    enabled: !!studyId,
  });

  const handleNotice = () => setIsNotice((prev) => !prev);

  return (
    <motion.button
      className="flex items-center relative w-full h-[54px] px-[24px] bg-black"
      initial={false}
      animate={isNotice ? 'open' : 'closed'}
      onClick={handleNotice}
    >
      <NoticeIcon />
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
    </motion.button>
  );
}

export default Notice;
