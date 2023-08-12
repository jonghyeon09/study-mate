import Image from 'next/image';
import PlusWhiteIcon from '../icons/PlusWhiteIcon';
import { memo } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useState, useEffect } from 'react';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  isActive?: boolean;
  isSelected?: boolean;
  src?: string | StaticImport | null;
  onClick?: () => void;
  onRemove?: () => void;
};

function UploadButton({ isActive = false, src, onClick, onRemove }: Props) {
  // const [isPhoto, setIsPhoto] = useState(false);

  // useEffect(() => {
  //   if (isActive) {
  //     setIsPhoto(false);
  //   } else {
  //     setIsPhoto(true);
  //   }
  // }, [isActive]);

  return (
    <>
      {/* {isActive && (
        <button
          className="w-full h-full bg-black flex items-center justify-center"
          onClick={onClick}
        >
          <PlusWhiteIcon />
        </button>
      )} */}
      {isActive && !src ? (
        <button
          className="w-full h-full bg-black flex items-center justify-center"
          onClick={onClick}
        >
          <PlusWhiteIcon />
        </button>
      ) : null}
      {src && (
        <>
          <CloseIcon
            className="absolute top-0 right-0 z-50"
            onClick={onRemove}
          />
          <Image alt="업로드 사진" src={src} fill />
        </>
      )}
    </>
  );
}

export default memo(UploadButton);
