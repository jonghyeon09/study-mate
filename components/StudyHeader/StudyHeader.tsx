import { useQuery } from '@tanstack/react-query';
import MenuIcon from '../icons/MenuIcon';
import Dropdown from './Dropdown';
import Layout from './Layout';
import { getStudyList } from '@/services';

type Props = {
  children?: React.ReactNode;
};

function StudyHeader({ children }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });

  return (
    <Layout>
      <Dropdown></Dropdown>
      <MenuIcon />
    </Layout>
  );
}

export default StudyHeader;
