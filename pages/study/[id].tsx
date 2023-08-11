import Layout from '@/components/common/Layout';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList } from '@/services';
import { GetServerSidePropsContext } from 'next';
import { getStudyDetail } from '@/services/getStudyDetail';

function Study() {
  const { isLoading, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  const studyId = studyList?.study[0].studyId;
  const { status, data: studyDetail } = useQuery({
    queryKey: ['studyDetail', studyId],
    queryFn: () => getStudyDetail(studyId),
    enabled: !!studyId,
  });
  // const { status, data: studyDetail } = useQuery(
  //   ['studyDetail', studyId],
  //   () => getStudyDetail(studyId),
  //   {
  //     enabled: !!studyId,
  //   }
  // );

  return (
    <Layout>
      {isLoading ? <div>로딩...</div> : <StudyHeader></StudyHeader>}
    </Layout>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
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
