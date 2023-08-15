import Layout from '@/components/common/Layout';
import { useQuery } from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getStudyList, getTraceList } from '@/services';
import { getStudyDetail } from '@/services/getStudyDetail';
import Spinner from '@/components/common/Spinner';
import { useRef, useState, useEffect } from 'react';
import UnderLine from '@/components/common/UnderLine';
import { SCDream } from '..';
import Calendar from 'react-calendar';
import Splash from '@/components/Splash/Splash';
import { useRecoilState } from 'recoil';
import { currentDateState } from '@/recoil/atoms';
import { useRouter } from 'next/router';
import RandomImage from '@/components/RandomImage';
import Main from '@/components/common/Main';
import Posting from '@/components/Posting/Posting';
import Image from 'next/image';
import dayjs from 'dayjs';
import Posts from '@/components/Posts';
import { NextSeo } from 'next-seo';

// type ValuePiece = Date | null;
// type TCalendar = ValuePiece | [ValuePiece, ValuePiece];

function Study() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [underLineWidth, setUnderLineWidth] = useState(0);
  const [isOpenPosting, setIsOpenPosting] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [traceId, setTraceId] = useState<number>();
  const [date, setDate] = useState(new Date());
  const lineRef = useRef<HTMLSpanElement>(null);
  const { query, asPath } = useRouter();
  const studyId = typeof query.study == 'string' ? query.study : undefined;
  const {
    isLoading,
    isFetching: detailFeching,
    data: studyDetail,
  } = useQuery({
    queryKey: ['studyDetail', studyId],
    queryFn: () => getStudyDetail(studyId),
    enabled: !!studyId,
  });
  const {
    isFetching: traceListFeching,
    refetch: refechTraceList,
    data: traceList,
  } = useQuery({
    queryKey: ['traceList', currentDate],
    queryFn: () =>
      getTraceList({
        studyId: studyId,
        params: {
          date: currentDate,
          page: 1,
        },
      }),
    enabled: !!currentDate,
  });

  const tileClassName = ({ date, view }: any) => {
    if (view !== 'month') return null;

    const traceDate = studyDetail?.traceDate;
    const datesWithDots: dayjs.Dayjs[] = [];
    if (traceDate) {
      traceDate.forEach((date: any) => {
        datesWithDots.push(dayjs(date));
      });
    }

    if (datesWithDots.some((d) => d.isSame(date, 'day'))) {
      return <div className="dot"></div>;
    }
    return null;
  };

  const shortWeekdayLabel = (locale: string | undefined, date: Date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' })
      .format(date)
      .toUpperCase();
  };

  const handleDateChange = (selectedDate: any) => {
    setDate(selectedDate);
    const foramtDate = dayjs(selectedDate).format('YYYY-MM-DD');

    setCurrentDate(foramtDate);
  };

  const handleFormatDay = (locale: string | undefined, date: Date) => {
    return date.getDate().toString();
  };

  const handleClickTrace = (id: number) => {
    setTraceId(id);
    setIsOpenDetail(true);
  };

  useEffect(() => {
    if (lineRef.current) {
      setUnderLineWidth(lineRef.current.offsetWidth + 2);
    }
  }, [detailFeching]);

  useEffect(() => {
    const foramtDate = dayjs(date as Date).format('YYYY-MM-DD');

    setCurrentDate(foramtDate);
  }, [date, setCurrentDate]);

  useEffect(() => {
    if (asPath) {
      setDate(new Date());
      refechTraceList();
    }
  }, [asPath, refechTraceList]);

  return (
    <>
      <NextSeo
        title="STUDY MATE"
        description="스터디를 인증하세요"
        themeColor="#4834C5"
      />
      {isLoading && <Splash />}
      {isOpenPosting && (
        <Posting
          onClick={() => setIsOpenPosting(false)}
          onSave={() => setIsOpenPosting(false)}
        />
      )}
      <Layout className={`${SCDream.className}`}>
        <StudyHeader />
        <Main>
          {detailFeching || traceListFeching ? <Spinner /> : null}

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
            {!isLoading && (
              <Calendar
                className={`${SCDream.className}`}
                locale="ko"
                onChange={handleDateChange}
                value={date}
                view="month"
                calendarType="gregory"
                prev2Label={null}
                next2Label={null}
                formatDay={handleFormatDay}
                tileContent={tileClassName}
                formatShortWeekday={shortWeekdayLabel}
                prevLabel={isLoading && <button>{'<'}</button>}
                nextLabel={isLoading && <button>{'>'}</button>}
              />
            )}
          </div>

          <section className="w-full h-full bg-[--color-gray] p-[24px]">
            <div className="w-full h-[60px] flex items-center">
              <p className="font-bold text-xl">스터디인증</p>
            </div>
            <div className="flex flex-wrap gap-[12px]">
              {/* <div className="grid grid-cols-2 gap-[12px]"> */}
              <button
                className="relative w-[165px] h-[204px]"
                onClick={() => setIsOpenPosting(true)}
              >
                <RandomImage />
              </button>
              {traceList?.trace?.map((trace) => (
                <div
                  key={trace.traceId}
                  className="relative w-[165px] max-w-full h-[204px] bg-white border-2 border-black rounded-md p-[12px] cursor-pointer"
                  onClick={() => handleClickTrace(trace.traceId)}
                >
                  {trace?.mainImage && (
                    <div className="relative w-full h-full ">
                      <Image alt="등록사진" src={trace.mainImage} fill></Image>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-[80px] p-[12px] bg-black">
                    <p className="font-medium text-white">{trace.title}</p>
                    <p className="font-medium text-white text-sm opacity-80">
                      {trace.writer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Main>

        {isOpenDetail && (
          <Posts traceId={traceId} onClose={() => setIsOpenDetail(false)} />
        )}
      </Layout>
    </>
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
