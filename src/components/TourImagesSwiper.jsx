"use client";

import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

function TourImagesSwiper({ images, h }) {
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
      {images?.map((src, index) => (
        <SwiperSlide key={index} id={src} className="w-full overflow-hidden">
          <Image
            src={src}
            alt={"Loading..."}
            width={1000}
            height={500}
            className={`group-hover:scale-105 transitions w-full max-w-full ${h} object-cover bg-gray-800`}
          />
        </SwiperSlide>
      ))}
      {/* nav */}
      {/* pagination */}
      <div className="pegs z-30 absolute px-2 top-0 left-0 w-full h-full flex justify-between items-center">
        <button
          onClick={handlePrev}
          className="w-6 h-6 flex-all transitions hover:bg-secondary hover:text-white rounded-full bg-white text-md text-primary"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="w-6 h-6 flex-all transitions  hover:bg-secondary hover:text-white rounded-full bg-white text-md text-primary"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </Swiper>
  );
}

export default TourImagesSwiper;
