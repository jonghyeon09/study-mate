import Image from 'next/image';
import alert from '@/public/icons/alert_w.png';
import IconLayout from '../common/IconLayout';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

function NoticeIcon({ className, onClick }: Props) {
  return (
    <IconLayout onClick={(e) => onClick && onClick(e)} className={className}>
      <Image src={alert} alt="notice icon" width={24} height={24} />
    </IconLayout>
  );
}

export default NoticeIcon;
