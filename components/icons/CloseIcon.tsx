import Image from 'next/image';
import close from '@/public/icons/close.png';
import IconLayout from '../common/IconLayout';

type Props = {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function CloseIcon({ className, onClick }: Props) {
  return (
    <IconLayout onClick={onClick} className={className}>
      <Image src={close} alt="close icon" width={24} height={24} />
    </IconLayout>
  );
}

export default CloseIcon;
