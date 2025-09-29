"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import { PrimaryButton } from "../buttons";
import Link from "next/link";
import { demoDataBase } from "@/data/Demo-database";
import { useCallback, useRef } from "react";

export default function TrekkingTours() {
  const sliderRef = useRef(null);

  // prev slider
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  //next slider
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="bg-accent/40">
      <div className="respons ">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          speed={600}
          parallax={true}
          ref={sliderRef}
          modules={[Parallax]}
          className="w-full h-full relative rounded-tr-[100px] rounded-bl-[100px]"
        >
          <div
            slot="container-start"
            className="parallax-bg"
            style={{
              backgroundImage: "url(/images/bg/5.png)",
            }}
            data-swiper-parallax="-23%"
          ></div>
          {demoDataBase?.tourTypes?.map((type, index) => (
            <SwiperSlide className="bg-black/30" key={index}>
              <div className="sm:py-28 py-14 sm:px-10 px-4 flex justify-end items-center">
                <div className="bg-white space-y-4 rounded-xl sm:p-10 p-6">
                  <div data-swiper-parallax="-300">
                    <div className="w-14 h-14 bg-accent text-secondary rounded-full flex-all">
                      <Heart className="h-6 w-6" />
                    </div>
                  </div>
                  <h1
                    data-swiper-parallax="-200"
                    className={`text-2xl font-jua font-medium text-primary `}
                  >
                    {type?.title}
                  </h1>

                  <p
                    data-swiper-parallax="-100"
                    className="font-medium text-primary line-clamp-3 max-w-md leading-relaxed"
                  >
                    {type?.overview}
                  </p>

                  <PrimaryButton className="text-sm text-white bg-secondary">
                    <Link href={`/journeys/${type?.id}`}>Explore More</Link>
                  </PrimaryButton>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Navigation Arrows */}
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
      </div>
    </div>
  );
}
