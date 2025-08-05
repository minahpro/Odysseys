"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { useCallback, useRef, useState } from "react";
import { Title } from "../texties";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const galleryImages = [
  { id: 2, src: "/images/bg/elephants.avif", alt: "Serengeti wildlife" },
  { id: 2, src: "/images/gallery/zanzi3.png", alt: "Serengeti wildlife" },
  { id: 3, src: "/images/gallery/kili3.png", alt: "Serengeti wildlife" },
  { id: 4, src: "/images/gallery/team5.png", alt: "Serengeti wildlife" },
  { id: 5, src: "/images/gallery/zanzi1.png", alt: "Serengeti wildlife" },
  { id: 1, src: "/images/gallery/team6.png", alt: "Serengeti wildlife" },
  { id: 6, src: "/images/gallery/kili5.png", alt: "Serengeti wildlife" },
  { id: 7, src: "/images/gallery/team3.png", alt: "Serengeti wildlife" },
];

export default function GallerySection() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
    <section className="sm:py-28 py-10">
      <div className="respons">
        <Title
          badge={"📸 Our Adventures"}
          title={"Photo Gallery"}
          subHeading={
            "Relive the magic of Tanzania through our stunning collection of photographs from unforgettable safaris and treks."
          }
        />

        <div className="relative mt-12">
          <Swiper
            ref={sliderRef}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Pagination]}
            className="mySwiper2 rounded-xl shadow-xl mb-4"
            pagination={{ clickable: true }}
            // Removed data-aos and data-aos-delay
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full sm:h-[400px] h-[250px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div className=" z-30 absolute px-2 top-1/2 -translate-y-1/2 left-0 w-full h-12 flex justify-between items-center">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex-all transitions hover:bg-primary/50 hover:text-white rounded-full bg-primary border border-primary/30 text-xl  shadow-md"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex-all transitions hover:bg-primary/50 hover:text-white rounded-full bg-primary border border-primary/30 text-xl  shadow-md"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4"
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
