import IconLayout from '../common/IconLayout';
import { useRecoilValue } from 'recoil';
import { isOpenSideState } from '@/recoil/atoms';
import { motion, Variants } from 'framer-motion';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function MenuIcon({ className, onClick }: Props) {
  const isOpenSide = useRecoilValue(isOpenSideState);

  const lineVariants: Variants = {
    closed: {
      opacity: 1,
      rotate: 0,
      translateY: 0,
    },
    openTop: {
      opacity: 1,
      rotate: 45,
      translateY: 10,
    },
    openMiddle: {
      opacity: 0,
      rotate: 0,
      translateY: 0,
    },
    openBottom: {
      opacity: 1,
      rotate: -45,
      translateY: -10,
    },
  };

  return (
    <IconLayout className={className} onClick={(e) => onClick && onClick(e)}>
      <div className="w-[24px] h-[24px] flex flex-col justify-between">
        <motion.div
          className="w-full h-[4px] bg-black rounded-sm"
          initial="closed"
          animate={isOpenSide ? 'openTop' : 'closed'}
          variants={lineVariants}
        ></motion.div>
        <motion.div
          className="w-full h-[4px] bg-black rounded-sm"
          initial="closed"
          animate={isOpenSide ? 'openMiddle' : 'closed'}
          variants={lineVariants}
        ></motion.div>
        <motion.div
          className="w-full h-[4px] bg-black rounded-sm"
          initial="closed"
          animate={isOpenSide ? 'openBottom' : 'closed'}
          variants={lineVariants}
        ></motion.div>
      </div>
    </IconLayout>
  );
}

export default MenuIcon;
