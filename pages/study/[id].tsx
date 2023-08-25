import Layout from '@/components/common/Layout';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import StudyHeader from '@/components/StudyHeader';
import { getTraceList } from '@/services';
import { getStudyDetail } from '@/services/getStudyDetail';
import Spinner from '@/components/common/Spinner';
import { useRef, useState, useEffect } from 'react';
import UnderLine from '@/components/common/UnderLine';
import { SCDream } from '..';
import Calendar from 'react-calendar';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentDateState,
  isCopyState,
  isLoginState,
  isOpenSideState,
} from '@/recoil/atoms';
import { useRouter } from 'next/router';
import RandomImage from '@/components/RandomImage';
import Main from '@/components/common/Main';
import Image from 'next/image';
import dayjs from 'dayjs';
import Posts from '@/components/Posts';
import { NextSeo } from 'next-seo';
import { AnimatePresence, motion } from 'framer-motion';
import SideMenu from '@/components/SideMenu/SideMenu';
import Toast from '@/components/common/Toast';
import dynamic from 'next/dynamic';
import { getNotice } from '@/services/getNotice';
import Notice from '@/components/Notice';

const Posting = dynamic(() => import('@/components/Posting'), {
  ssr: false,
});

function Study() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [isOpenSide, setIsOpenSide] = useRecoilState(isOpenSideState);
  const [isCopy, setIsCopy] = useRecoilState(isCopyState);
  const isLogin = useRecoilValue(isLoginState);
  const [underLineWidth, setUnderLineWidth] = useState(0);
  const [isOpenPosting, setIsOpenPosting] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [traceId, setTraceId] = useState<number>();
  const [date, setDate] = useState(new Date());
  const [isScroll, setIsScroll] = useState(false);
  const lineRef = useRef<HTMLSpanElement>(null);
  const { query, asPath } = useRouter();
  const observerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { replace } = useRouter();
  const studyId = typeof query.study == 'string' ? query.study : undefined;
  const queryClient = useQueryClient();
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
    data: infiniteTraceList,
    refetch: refechTraceList,
    isFetching: isFetchingTraceList,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['traceList', currentDate],
    queryFn: ({ pageParam = 1 }) =>
      getTraceList({
        studyId: studyId,
        params: {
          date: currentDate,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.trace.length == 0 ? undefined : lastPage?.page + 1;
    },
    enabled: !!currentDate,
  });
  const { data: noticeList } = useQuery({
    queryKey: ['notice', studyId],
    queryFn: () => getNotice(studyId),
    enabled: !!studyId,
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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scroll = scrollRef.current.scrollTop;

    if (scroll != 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
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

  useEffect(() => {
    setCurrentDate(dayjs().format('YYYY-MM-DD'));
  }, [setCurrentDate]);

  useEffect(() => {
    if (!observerRef.current) return;
    if (!infiniteTraceList) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 1,
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, infiniteTraceList]);

  useEffect(() => {
    if (!isLogin) {
      queryClient.removeQueries({ queryKey: ['studyList'], exact: true });
      replace('/');
    }
  }, [isLogin, queryClient, replace]);

  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCopy, setIsCopy]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (isOpenSide) {
      const el = scrollRef.current;
      el.scrollTo(0, 0);
    }
  }, [isOpenSide]);

  return (
    <>
      <NextSeo title="STUDY MATE" description="스터디를 인증하세요" />

      {isOpenPosting && (
        <Posting
          currentDate={currentDate}
          onClick={() => setIsOpenPosting(false)}
          onSave={() => setIsOpenPosting(false)}
        />
      )}
      {isCopy && <Toast>팀원 초대하기 링크가 복사되었습니다</Toast>}

      <Layout
        className={`${SCDream.className} ${
          isOpenSide ? 'overflow-y-hidden' : ''
        }`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <StudyHeader className={isScroll ? 'border-b-2 border-black' : ''} />

        <Main className="flex flex-col">
          <AnimatePresence>{isOpenSide && <SideMenu />}</AnimatePresence>
          {detailFeching || isFetchingTraceList ? <Spinner /> : null}

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
                prevLabel={'<'}
                nextLabel={'>'}
              />
            )}
          </div>

          {noticeList?.notice.length !== 0 && <Notice studyId={studyId} />}

          <section className="w-full h-full bg-[--color-gray] p-[24px] flex flex-col flex-1">
            <div className="w-full h-[60px] flex items-center">
              <p className="font-bold text-xl">스터디 인증</p>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-[12px]">
              {/* <ul className="flex flex-wrap gap-[12px]"> */}
              {currentDate == dayjs().format('YYYY-MM-DD') && (
                <button
                  className="relative w-[165px] h-[204px]"
                  onClick={() => setIsOpenPosting(true)}
                >
                  <RandomImage />
                </button>
              )}

              {infiniteTraceList?.pages.map((traceList, i) =>
                traceList.trace.map((trace) => (
                  <motion.li
                    key={trace.traceId}
                    ref={observerRef}
                    className="relative w-[165px] max-w-full h-[204px] bg-white border-2 border-black rounded-md p-[12px] cursor-pointer"
                    onClick={() => handleClickTrace(trace.traceId)}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: (custom) => ({
                        opacity: 1,
                        transition: { delay: custom * 0.1 },
                      }),
                    }}
                  >
                    {trace?.mainImage && (
                      <div className="flex items-start justify-center relative w-full h-full">
                        <Image
                          alt="등록사진"
                          src={trace.mainImage}
                          width={137}
                          height={176}
                          style={{
                            objectFit: 'contain',
                            width: 'auto',
                            height: 'auto',
                          }}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-[80px] p-[12px] bg-black">
                      <p className="font-medium text-white">{trace.title}</p>
                      <p className="font-medium text-white text-sm opacity-80">
                        {trace.writer}
                      </p>
                    </div>
                  </motion.li>
                ))
              )}
            </ul>
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
