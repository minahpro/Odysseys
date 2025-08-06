"use client";

import { Star } from "lucide-react";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Title } from "../texties";
import { useCallback, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";
import { NoDataFound } from "../Loadings/ErrorComp";
import Link from "next/link";
import { PrimaryButton } from "../buttons";

// Loading card component
const LoadingCard = () => (
  <div className="bg-white rounded border border-gray-200 animate-pulse">
    <div className="p-6">
      <div className="flex items-center mb-4 gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection({ home }) {
  const { reviews, isLoadingReviews } = useAppContext();
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
    <div className={`sm:py-28 py-10 bg-secondary`}>
      <div className="respons">
        <div className="text-center flex-all flex-col mb-12">
          <span
            data-aos="fade-down"
            data-aos-delay="400"
            className={`bg-accent text-primary h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Star />
          </span>
          <h2
            data-aos="fade-down"
            data-aos-delay="300"
            className="md:text-4xl text-3xl text-accent font-jua mb-4"
          >
            What Our Travelers Say
          </h2>
          <p
            data-aos="fade-down"
            data-aos-delay="200"
            className="max-w-xl mx-auto font-medium text-sm text-white"
          >
            Don't just take our word for it. Hear from the thousands of
            travelers who have experienced the magic of Tanzania with Wild
            Odysseys
          </p>
          <hr
            data-aos="fade-down"
            data-aos-delay="100"
            className="w-12 mx-auto border-2 mt-5 border-accent"
          />
        </div>

        {isLoadingReviews ? (
          // Loading state
          <div className="max-w-3xl mx-auto md:px-24">
            <LoadingCard />
          </div>
        ) : !reviews?.reviews || reviews.reviews.length === 0 ? (
          // No reviews found state
          <div className="max-w-3xl mx-auto">
            <NoDataFound text="No reviews found at the moment" />
          </div>
        ) : (
          // Reviews content
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              ref={sliderRef}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="max-w-5xl"
            >
              {reviews.reviews.map((testimonial, index) => (
                <SwiperSlide key={index} className="md:px-24">
                  <div className={`bg-accent rounded `}>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial?.rating || 0)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-secondary fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-primary mb-4 italic line-clamp-3">
                        "{testimonial?.text || "No message"}"
                      </p>
                      <div className="flex justify-between flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial?.image || "/placeholder.svg"}
                            alt={testimonial?.name || "No name"}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-primary font-semibold">
                              {testimonial?.name || "No name"}
                            </h4>
                            <p className="text-secondary font-bold text-sm">
                              {testimonial?.location || "No location"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Buttons */}
              <div className="z-30 absolute px-2 top-1/2 -translate-y-1/2 left-0 w-full h-12 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 flex-all transitions hover:bg-primary hover:text-accent text-secondary rounded-full bg-white text-xl shadow-xl border border-accent"
                >
                  <MdKeyboardArrowLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 flex-all transitions hover:bg-primary hover:text-accent text-secondary rounded-full bg-white text-xl shadow-xl border border-accent"
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
            </Swiper>
            <div className="w-full mt-12 flex-all">
              <Link href={reviews?.placeUrl || "#"} target="_blank">
                <PrimaryButton>See all reviews</PrimaryButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
