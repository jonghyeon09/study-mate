import logo from '@/public/icons/logo.png';
import Image from 'next/image';
import Layout from '../common/Layout';
import PopupLayout from '../common/PopupLayout';

function Splash() {
  return (
    <PopupLayout>
      <Layout>
        <div className="flex items-center justify-center absolute w-full h-screen bg-[--color-indigo]">
          <div>
            <Image alt="logo" src={logo} />
          </div>
        </div>
      </Layout>
    </PopupLayout>
  );
}

export default Splash;
