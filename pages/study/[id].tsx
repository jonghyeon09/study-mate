import Layout from '@/components/common/Layout';
import { useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList } from '@/services';
import { getStudyDetail } from '@/services/getStudyDetail';
import Spinner from '@/components/common/Spinner';
import { useRef, useState, useEffect } from 'react';
import UnderLine from '@/components/common/UnderLine';
import { SCDream } from '..';
import Image from 'next/image';
import traceBtn from '@/public/icons/trace_btn.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Splash from '@/components/Splash/Splash';
import { useRecoilState } from 'recoil';
import { currentDateState } from '@/recoil/atoms';
import formatDate from '@/utils/formatDate';

type ValuePiece = Date | null;
type TCalendar = ValuePiece | [ValuePiece, ValuePiece];

function Study() {
  const [underLineWidth, setUnderLineWidth] = useState(0);
  const [date, onDate] = useState<TCalendar>(new Date());
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
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
      setUnderLineWidth(lineRef.current.offsetWidth + 2);
    }
  }, [detailFeching]);

  useEffect(() => {
    setCurrentDate(formatDate(date));
  }, [date, setCurrentDate]);

  useEffect(() => {
    if (currentDate) {
      // console.log(currentDate);
    }
  }, [currentDate]);

  return (
    <Layout className={`${SCDream.className}`}>
      {isLoading ? <Splash /> : null}
      <StudyHeader />
      <main className="relative w-full min-h-screen overflow-y-auto pt-[--h-header]">
        {detailFeching && <Spinner />}

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

        <div className="w-full h-[390px] bg-[--color-main]">
          <Calendar
            className={`${SCDream.className}`}
            locale="ko"
            onChange={onDate}
            value={date}
            view="month"
          />
        </div>

        <section className="w-full h-full bg-[--color-gray] p-[24px]">
          <div className="w-full h-[60px] flex items-center">
            <p className="font-bold text-xl">스터디인증</p>
          </div>
          <div className="grid grid-cols-2 gap-[12px]">
            <button className="relative">
              <Image src={traceBtn} alt="create"></Image>
            </button>
            <div className="w-full h-[204px] bg-slate-50"></div>
          </div>
        </section>
      </main>
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
