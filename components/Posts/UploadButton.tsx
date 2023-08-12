import PlusWhiteIcon from '../icons/PlusWhiteIcon';
import { memo } from 'react';

type Props = {
  isActive?: boolean;
  onClick?: () => void;
};

function UploadButton({ isActive = false, onClick }: Props) {
  return (
    <>
      {isActive ? (
        <button
          className="w-[106px] h-[106px] rounded-[6px] border-2 border-black border-opacity-20 bg-black flex items-center justify-center"
          onClick={onClick}
        >
          <PlusWhiteIcon />
        </button>
      ) : (
        <div className="w-[106px] h-[106px] rounded-[6px] border-2 border-black border-opacity-20 bg-white"></div>
      )}
    </>
  );
}

export default memo(UploadButton);
