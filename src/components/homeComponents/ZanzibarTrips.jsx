"use client";
import React, { useRef, useCallback } from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { ZanzibarCardPro } from "../cards";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { findItArray, findItTitle } from "../Functions";
import { Umbrella } from "lucide-react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function ZanzibarTripsHome() {
  const { allFetchedDayTrips, isLoading, fetchedDestinations } =
    useAppContext();
  const sliderRef = useRef(null);

  const { data: tourTags, isLoading: isFetchingTags } =
    useFetchAll("tour-tags");
  // ************* fetch Zanzibar trips *************
  const finalZanzibarTrips = allFetchedDayTrips
    ?.filter((trip) =>
      trip.tags.includes(findItTitle({ data: tourTags, title: "zanzibar" }))
    )
    .map((trip) => {
      return {
        ...trip,
        destinations: findItArray({
          ids: trip?.destinations,
          datas: fetchedDestinations,
          dest: true, // destination has name not title
        }),
        price: trip?.price?.foreigner || 0,
      };
    });

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
    <section className="sm:py-28 py-10">
      <div className="respons">
        <Title
          badge={<Umbrella />}
          title={"Zanzibar Spice Island Paradise"}
          subHeading={
            "Discover pristine beaches, rich Swahili culture, and aromatic spice plantations on the exotic island of Zanzibar."
          }
        />
        <div className="mt-12 relative">
          {
            // loading
            isLoading || isFetchingTags ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(4)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : finalZanzibarTrips?.length > 0 ? (
              <>
                <Swiper
                  ref={sliderRef}
                  modules={[A11y, Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  speed={2000}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="zanzibar-swiper"
                >
                  {finalZanzibarTrips?.map((tour, index) => (
                    <SwiperSlide key={index}>
                      <ZanzibarCardPro tour={tour} home={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="z-30 absolute px-2 top-1/2 -translate-y-1/2 left-0 w-full h-12 flex justify-between items-center">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 flex-all transitions hover:bg-primary hover:text-accent text-white rounded-full bg-secondary border border-accent text-xl shadow-md"
                  >
                    <MdKeyboardArrowLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex-all transitions hover:bg-primary hover:text-accent text-white rounded-full bg-secondary border border-accent text-xl shadow-md"
                  >
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </>
            ) : (
              <NoDataFound text={"No Zanzibar Trips Found"} />
            )
          }
        </div>
      </div>
    </section>
  );
}

export default ZanzibarTripsHome;
