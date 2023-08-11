import Layout from '@/components/common/Layout';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList } from '@/services';
import { GetServerSidePropsContext } from 'next';
import { getStudyDetail } from '@/services/getStudyDetail';
import Spinner from '@/components/common/Spinner';
import { useEffect } from 'react';

function Study() {
  const { isLoading, data: studyList } = useQuery({
    queryKey: ['studyList'],
    queryFn: getStudyList,
  });
  const studyId = studyList?.study[0].studyId;
  const { isFetching: detailFeching, data: studyDetail } = useQuery({
    queryKey: ['studyDetail', studyId],
    queryFn: () => getStudyDetail(studyId),
    enabled: !!studyId,
  });

  return (
    <Layout className="bg-red-100">
      {isLoading ? (
        <div>로딩...</div>
      ) : (
        <>
          <StudyHeader />
          <div>
            <p>스터디 {studyDetail?.elapsed}일차</p>
          </div>
          <main className="relative w-full">
            {detailFeching && <Spinner />}
          </main>
        </>
      )}
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
