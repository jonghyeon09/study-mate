import Image from 'next/image';
import arrow_down from '@/public/icons/arrow_down.png';
import IconLayout from '../common/IconLayout';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function ArrowDownIcon({ className, onClick }: Props) {
  return (
    <IconLayout onClick={(e) => onClick && onClick(e)} className={className}>
      <Image src={arrow_down} alt="close icon" width={24} height={24} />
    </IconLayout>
  );
}

export default ArrowDownIcon;
