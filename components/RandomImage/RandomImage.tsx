import { memo } from 'react';
import Image1 from '@/public/icons/trace_btn.png';
import Image2 from '@/public/icons/trace_btn_2.png';
import Image3 from '@/public/icons/trace_btn_3.png';
import Image from 'next/image';

const images = [Image1, Image2, Image3];

function RandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);

  const selectedImage = images[randomIndex];

  return (
    <Image
      alt="인증등록버튼"
      src={selectedImage}
      width={165}
      height={204}
      quality={100}
    />
  );
}

export default memo(RandomImage);
