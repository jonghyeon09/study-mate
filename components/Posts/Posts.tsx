import Modal from '../common/Modal';
import CloseIcon from '../icons/CloseIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRef } from 'react';

type Props = {};

function Posts({}: Props) {
  const sliderRef = useRef(null);

  return (
    <Modal className="h-[600px] overflow-y-auto overflow-x-hidden pb-[26px] flex flex-col">
      <CloseIcon className="absolute right-[12px] top-[12px]" />
      <div className="relative h-[48px] w-full flex items-center">
        <p className="text-xl">asdasadasd</p>
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
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        className="relative h-[294px] w-full mt-[24px] bg-gray-200 rounded-md"
        ref={sliderRef}
      >
        <SwiperSlide>
          <div className="w-full h-full bg-amber-200"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-red-200"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-indigo-50-200"></div>
        </SwiperSlide>
      </Swiper>
      <div className="custom-pagination"></div>

      <div className="flex flex-col flex-auto">
        <div className="min-h-[72px] flex-auto">
          <p className="">asdasdasddas</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm">22.22.22</p>
          <p className="font-bold">asdasd</p>
        </div>
      </div>
    </Modal>
  );
}

export default Posts;
