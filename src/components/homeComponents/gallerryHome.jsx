"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useCallback, useRef } from "react";
import { Title } from "../texties";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Camera } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  { id: 6, src: "/images/bg/6.png", alt: "Serengeti wildlife" },
  { id: 2, src: "/images/gallery/zanzi3.png", alt: "Serengeti wildlife" },
  { id: 4, src: "/images/gallery/team5.png", alt: "Serengeti wildlife" },
  { id: 5, src: "/images/bg/11.png", alt: "Serengeti wildlife" },
  { id: 1, src: "/images/gallery/team6.png", alt: "Serengeti wildlife" },
  { id: 2, src: "/images/bg/3.png", alt: "Serengeti wildlife" },
  { id: 7, src: "/images/gallery/team3.png", alt: "Serengeti wildlife" },
  { id: 3, src: "/images/bg/6.png", alt: "Serengeti wildlife" },
];

export default function GallerySection() {
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
    <section className="sm:py-28 bg-accent/40 py-10">
      <div className="respons">
        <Title
          badge={<Camera />}
          title={"Photo Gallery"}
          subHeading={
            "Relive the magic of Africa through our stunning collection of photographs from unforgettable safaris and treks."
          }
        />

        <div className="relative mt-12">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            ref={sliderRef}
            centeredSlides={true} // Remove this line if you want left alignment
            slidesPerView={3}
            initialSlide={1}
            coverflowEffect={{
              rotate: 60,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
          >
            {galleryImages?.map((item) => (
              <SwiperSlide
                key={item.id}
                className="w-full md:h-80 sm:h-60 h-40 bg-cover bg-center"
              >
                <Image
                  className="w-full md:h-80 sm:h-60 h-40 object-cover"
                  width={500}
                  height={500}
                  src={item.src}
                  alt={item.alt}
                />
              </SwiperSlide>
            ))}
            <div className=" z-30 absolute px-2 top-1/2 -translate-y-1/2 left-0 w-full h-12 flex justify-between items-center">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex-all transitions text-accent hover:bg-primary/50 hover:text-white rounded-full bg-primary border border-primary/30 text-xl  shadow-md"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex-all transitions text-accent hover:bg-primary/50 hover:text-white rounded-full bg-primary border border-primary/30 text-xl  shadow-md"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
