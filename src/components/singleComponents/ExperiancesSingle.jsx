import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayTripCardPro } from "../cards";

function ExperiancesSingle({ datas }) {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <Swiper
      ref={sliderRef}
      modules={[A11y]}
      spaceBetween={10}
      slidesPerView={3}
      speed={1000}
      loop={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
      className="relative w-full z-10"
    >
      {datas?.map((tour, index) => (
        <SwiperSlide key={index}>
          <DayTripCardPro tour={tour} />
        </SwiperSlide>
      ))}
      {/* pagination */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-primary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-primary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </Swiper>
  );
}

export default ExperiancesSingle;
