import logo from '@/public/icons/logo.png';
import Image from 'next/image';

function Splash() {
  return (
    <div className="flex items-center justify-center absolute w-full h-screen bg-[--color-indigo] z-[100]">
      <div>
        <Image alt="logo" src={logo} />
      </div>
    </div>
  );
}

export default Splash;
