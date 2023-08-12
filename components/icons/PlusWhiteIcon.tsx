import Image from 'next/image';
import IconLayout from '../common/IconLayout';
import icon from '@/public/icons/x_w.png';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function PlusWhiteIcon({ className, onClick }: Props) {
  return (
    <IconLayout onClick={(e) => onClick && onClick(e)} className={className}>
      <Image
        src={icon}
        alt="plus icon"
        width={24}
        height={24}
        className="rotate-45"
      />
    </IconLayout>
  );
}

export default PlusWhiteIcon;
