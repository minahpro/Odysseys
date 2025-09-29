"use client";

import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SmallScreenSwipers({ datas, Children }) {
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
      spaceBetween={1}
      slidesPerView={1}
      speed={1000}
      loop={true}
      className="relative w-full z-10 group hoverPegShow"
    >
      {datas?.map((src, index) => (
        <SwiperSlide key={index} className="w-full overflow-hidden">
          <Children item={src} index={index} />
        </SwiperSlide>
      ))}
      {/* nav */}
      {/* pagination */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-primary/70 text-white p-2 rounded-full transitions backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-primary/70 text-white p-2 rounded-full transitions backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </Swiper>
  );
}

export default SmallScreenSwipers;
