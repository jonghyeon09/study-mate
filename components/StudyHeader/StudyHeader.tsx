import MenuIcon from '../icons/MenuIcon';
import Dropdown from './Dropdown';
import Layout from './Layout';

type Props = {
  children?: React.ReactNode;
};

function StudyHeader({ children }: Props) {
  return (
    <Layout>
      <Dropdown studyName=""></Dropdown>
      <MenuIcon />
    </Layout>
  );
}

export default StudyHeader;
