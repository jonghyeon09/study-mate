import Image from 'next/image';
import close from '@/public/icons/close.png';

type Props = {
  onClick: () => void;
};

function CloseIcon({ onClick }: Props) {
  return (
    <button
      className="w-[24px] h-[24px] flex items-center justify-center"
      onClick={onClick}
    >
      <Image src={close} alt="close icon" width={20} height={20} />
    </button>
  );
}

export default CloseIcon;
