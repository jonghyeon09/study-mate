import logo from '@/public/icons/logo.png';
import Image from 'next/image';
import PopupLayout from '../common/PopupLayout';
import { AnimatePresence, motion } from 'framer-motion';

function Splash() {
  return (
    <PopupLayout key={'splash'}>
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center absolute w-full h-full bg-[--color-indigo]"
      >
        <Image alt="logo" src={logo} />
      </motion.div>
    </PopupLayout>
  );
}

export default Splash;
