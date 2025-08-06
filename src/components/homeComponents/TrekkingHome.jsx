"use client";
import { findItTitle } from "../Functions";
import { useCallback, useEffect, useRef, useState } from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import { Title } from "../texties";
import { Mountain } from "lucide-react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TourCardPro } from "../cards";

export default function TrekkingTours() {
  const sliderRef = useRef(null);
  const { allFetchedTours, isLoading } = useAppContext();
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  const [tours, setTours] = useState([]);
  const { data: tourGroupCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");

  // get all tours with hiking id on focus
  useEffect(() => {
    const hkId = findItTitle({ data: tourTypes, title: "hiking" });
    if (allFetchedTours?.length > 0 && tourTypes?.length > 0) {
      if (hkId) {
        const trekkingTours = allFetchedTours?.filter((tour) =>
          tour.focus.includes(hkId)
        );

        if (trekkingTours?.length) {
          setTours(trekkingTours);
        }
      } else {
        console.log("hiking id was not found");
      }
    }
  }, [allFetchedTours, tourTypes]);

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
    <section className="sm:py-28 py-10 bg-accent/40">
      <div className="respons">
        <Title
          badge={<Mountain />}
          title={"Conquer Africa's Highest Peaks"}
          subHeading={
            "Challenge yourself with epic mountain adventures from Kilimanjaro's snow-capped summit to volcanic craters"
          }
        />
        <div className="mt-12 relative">
          {
            // loading
            isLoading || isFetchingTourTypes || isFetchingTourCategories ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : tours?.length > 0 ? (
              <>
                <Swiper
                  ref={sliderRef}
                  modules={[A11y, Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  speed={2000}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
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
                  className="kilimanjaro-swiper"
                >
                  {tours?.map((tour, index) => (
                    <SwiperSlide key={index}>
                      <TourCardPro
                        tour={{
                          ...tour,
                          prices: tour?.price?.foreigner?.adult?.highSeason,
                          category: tourGroupCategories?.find(
                            (cat) => cat?.id === tour?.category
                          )?.title, // get category title
                        }}
                      />
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
