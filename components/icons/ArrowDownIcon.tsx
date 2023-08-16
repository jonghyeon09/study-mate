import Image from 'next/image';
import arrow_down from '@/public/icons/arrow_down.png';
import arrow_down_W from '@/public/icons/arrow_down_W.png';
import IconLayout from '../common/IconLayout';

type Props = {
  className?: string;
  white?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function ArrowDownIcon({ className, white = false, onClick }: Props) {
  return (
    <IconLayout onClick={(e) => onClick && onClick(e)} className={className}>
      {!white ? (
        <Image src={arrow_down} alt="close icon" width={24} height={24} />
      ) : (
        <Image src={arrow_down_W} alt="close icon" width={24} height={24} />
      )}
    </IconLayout>
  );
}

export default ArrowDownIcon;
