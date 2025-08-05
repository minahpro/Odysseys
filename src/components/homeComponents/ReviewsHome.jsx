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

// Loading card component
const LoadingCard = () => (
  <div className="bg-highlight rounded border border-gray-800 animate-pulse">
    <div className="p-6">
      <div className="flex items-center mb-4 gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-700 rounded"></div>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-24"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
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
    <section className={`sm:py-28 py-10 ${!home && "bg-highlight/50"}`}>
      <div className="respons">
        <Title
          badge={"🌟 What Our Clients Say"}
          title={"Stories from the Wild"}
          subHeading={
            "Don't just take our word for it! Read what our amazing clients have to say about their unforgettable Tanzanian adventures with Wild Odysseys."
          }
        />

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
              className="max-w-3xl"
            >
              {reviews.reviews.map((testimonial, index) => (
                <SwiperSlide key={index} className="md:px-24">
                  <div
                    className={`bg-highlight rounded border border-gray-800 `}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial?.rating || 0)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-primary fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4 italic line-clamp-4">
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
                            <h4 className="text-white font-semibold">
                              {testimonial?.name || "No name"}
                            </h4>
                            <p className="text-textcolor text-sm">
                              {testimonial?.location || "No location"}
                            </p>
                          </div>
                        </div>
                        <Link
                          className="px-4 py-2 rounded bg-white/20 text-white text-xs"
                          href={reviews?.placeUrl || "#"}
                          target="_blank"
                        >
                          See all reviews
                        </Link>
                      </div>
                    </div>
                  </div>
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
          </>
        )}
      </div>
    </section>
  );
}
