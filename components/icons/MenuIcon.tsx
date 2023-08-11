import Image from 'next/image';
import menu from '@/public/icons/menu.png';
import IconLayout from '../common/IconLayout';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function MenuIcon({ className, onClick }: Props) {
  return (
    <IconLayout onClick={(e) => onClick && onClick(e)} className={className}>
      <Image src={menu} alt="close icon" width={24} height={24} />
    </IconLayout>
  );
}

export default MenuIcon;
