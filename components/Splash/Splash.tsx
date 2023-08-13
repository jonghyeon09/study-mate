import logo from '@/public/icons/logo.png';
import Image from 'next/image';
import PopupLayout from '../common/PopupLayout';

function Splash() {
  return (
    <PopupLayout>
      <div className="flex items-center justify-center absolute w-full h-full bg-[--color-indigo]">
        <div>
          <Image alt="logo" src={logo} />
        </div>
      </div>
    </PopupLayout>
  );
}

export default Splash;
