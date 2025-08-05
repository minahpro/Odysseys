"use client";
import MainPopup from "../Popups/MainPopup";
import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

function ImagePreviewPopUp({ handleOpen, handleClose, title, images }) {
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
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`${title} Images Preview`}
      contentClass="max-w-5xl"
    >
      <Swiper
        ref={sliderRef}
        modules={[A11y]}
        spaceBetween={1}
        slidesPerView={1}
        speed={1000}
        loop={true}
        className="relative w-full overflow-y-scroll md:overflow-y-auto md:h-[450px] h-[300px]"
      >
        {images?.map((src, index) => (
          <SwiperSlide
            key={index}
            id={src}
            className="rounded-md overflow-hidden"
          >
            <Image
              src={src}
              alt={"Loading..."}
              width={1000}
              height={500}
              className={`w-full h-full object-cover`}
            />
          </SwiperSlide>
        ))}
        {/* nav */}
        {/* pagination */}
        <div className=" z-30 absolute px-4 top-0 left-0 w-full h-full flex justify-between items-center">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-primary flex-all transitions hover:bg-primary hover:text-black rounded-full bg-highlight text-2xl text-primary"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex-all transitions border border-primary hover:bg-primary hover:text-black rounded-full bg-highlight text-2xl text-primary"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </Swiper>
    </MainPopup>
  );
}

export default ImagePreviewPopUp;
