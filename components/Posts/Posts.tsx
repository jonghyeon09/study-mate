import Modal from '../common/Modal';
import CloseIcon from '../icons/CloseIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTraceDetail } from '@/services/getTraceDetail';
import { currentDateState, currentStudyState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

type Props = {
  traceId?: number;
  onClose: () => void;
};

function Posts({ traceId, onClose }: Props) {
  const sliderRef = useRef(null);
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [currentStudy, setCurrentStudy] = useRecoilState(currentStudyState);
  const { data: traceDetail } = useQuery({
    queryKey: ['traceDetail', currentStudy?.studyId, traceId],
    queryFn: () => getTraceDetail(currentStudy?.studyId, traceId),
    enabled: !!traceId,
  });

  return (
    <Modal className="h-[600px] overflow-y-auto overflow-x-hidden pb-[26px] flex flex-col">
      <CloseIcon
        className="absolute right-[12px] top-[12px] z-50"
        onClick={onClose}
      />
      <div className="relative h-[48px] w-full flex items-center">
        <p className="text-xl">{traceDetail?.trace.title}</p>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        className="relative h-[290px] w-full mt-[24px] bg-gray-200 rounded-md"
        ref={sliderRef}
      >
        {traceDetail?.trace.allImages.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-center items-center relative w-full h-full">
              {image && (
                <Image
                  alt="스터디 사진"
                  src={image}
                  width={290}
                  height={290}
                  style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination"></div>

      <div className="flex flex-col flex-auto">
        <div className="min-h-[72px] flex-auto">
          <p className="">{traceDetail?.trace.description}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm">{currentDate}</p>
          <p className="font-bold">{traceDetail?.trace.writer}</p>
        </div>
      </div>
    </Modal>
  );
}

export default Posts;
