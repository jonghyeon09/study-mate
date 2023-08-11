import Layout from '@/components/common/Layout';
import { useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList } from '@/services';
import { getStudyDetail } from '@/services/getStudyDetail';
import Spinner from '@/components/common/Spinner';
import { useRef, useState, useEffect } from 'react';
import UnderLine from '@/components/common/UnderLine';
import { SCDream } from '..';

function Study() {
  const [underLineWidth, setUnderLineWidth] = useState(0);
  const lineRef = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
    if (lineRef.current) {
      setUnderLineWidth(lineRef.current.offsetWidth + 5);
    }
  }, [detailFeching]);

  return (
    <Layout className={`${SCDream.className} bg-red-100`}>
      <StudyHeader />
      <main className="relative w-full">
        <div className="w-full px-[24px] mb-[16px] z-10">
          <span className="font-bold text-2xl">
            스터디{' '}
            <span className="relative" ref={lineRef}>
              <span className="relative z-10">{studyDetail?.elapsed}</span>
              <UnderLine width={underLineWidth} className="-left-1" />
            </span>
            일차
          </span>
        </div>
        {detailFeching && <Spinner />}
      </main>
      {isLoading ? <div>로딩...</div> : <></>}
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['studyList'],
//     queryFn: getStudyList,
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Study;
