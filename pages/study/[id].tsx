import Layout from '@/components/common/Layout';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList } from '@/services';

function Study() {
  const { isLoading, data } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  return (
    <Layout>
      {isLoading ? <div>로딩...</div> : <StudyHeader></StudyHeader>}
    </Layout>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Study;
