import logo from '@/public/icons/logo.png';
import Image from 'next/image';
import PopupLayout from '../common/PopupLayout';
import { motion } from 'framer-motion';

function Splash() {
  return (
    <PopupLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center absolute w-full h-full bg-[--color-indigo]"
      >
        <Image alt="logo" src={logo} />
      </motion.div>
    </PopupLayout>
  );
}

export default Splash;
