import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { PrimaryButton } from "../buttons";
import Link from "next/link";

function SingleSmallAcc({ datas }) {
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
      slidesPerView={1}
      speed={1000}
      loop={true}
      className="relative w-full z-10"
    >
      {datas?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-center">
            <div
              data-aos="fade-right"
              className="w-full grid grid-cols-2 gap-2 md:order-2 order-1"
            >
              <Image
                className="col-span-2 w-full h-60 object-cover rounded-xl"
                src="https://images.pexels.com/photos/28347472/pexels-photo-28347472.jpeg"
                width={500}
                height={500}
              />
              <Image
                className="h-40 w-full object-cover rounded-xl"
                src="https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg"
                width={500}
                height={500}
              />
              <Image
                className="h-40 w-full object-cover rounded-xl"
                src="https://images.pexels.com/photos/14929512/pexels-photo-14929512.jpeg"
                width={500}
                height={500}
              />
            </div>
            <div data-aos="fade-left" className="space-y-8 lg:pl-12">
              <h1 className="text-2xl font-bold text-accent">{item?.title}</h1>
              <div className="flex items-center gap-4">
                <Star className="w-4 h-4 text-secondary" />
                <span className="font-medium text-secondary">Luxury camp</span>
              </div>
              <p className="text-accent leading-6 line-clamp-6">
                {item?.overview} Wilderness Usawa Serengeti experience provides
                a perfect balance of action and comfort. Offering great wildlife
                encounters yet distanced from the crowded tourist hubs, this
                tented camp showcases thoughtful design and architecture,
                inviting guests to indulge in a secluded and exclusive East
                African adventure.
              </p>

              <div>
                <Link href={`/accommodations/${item?.id}`}>
                  <PrimaryButton className="bg-accent text-primary hover:bg-white transitions">
                    View this camp
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* pagination */}
      <div className="flex-all gap-6 mt-12">
        <button
          onClick={handlePrev}
          className="bg-secondary hover:bg-secondary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="bg-secondary hover:bg-secondary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </Swiper>
  );
}

export default SingleSmallAcc;
