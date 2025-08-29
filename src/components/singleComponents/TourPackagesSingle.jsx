import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TourCardPro } from "../cards";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";

function TourPackagesSingle() {
  // ************* FETCH DATA ************* //
  const { data: tourGroupCategories, isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { allFetchedTours, isLoading } = useAppContext();

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  // ****************** GET FEATURED TOURS ******************* //
  const tours = allFetchedTours?.filter((item) => item?.isFeatured);
  return (
    <>
      {
        // loading
        isLoading || isFetchingTourCategories ? (
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <TourLoading key={i} />
            ))}
          </div>
        ) : tours?.length > 0 ? (
          <Swiper
            ref={sliderRef}
            modules={[A11y]}
            spaceBetween={10}
            slidesPerView={2}
            speed={1000}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="relative w-full z-10"
          >
            {tours?.map((tour, index) => (
              <SwiperSlide key={index}>
                <TourCardPro
                  home={true}
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
            {/* pagination */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/40 hover:bg-primary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/40 hover:bg-primary/70 text-white p-3 rounded-full transitions backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </Swiper>
        ) : (
          <NoDataFound text="No Tours Found" />
        )
      }
    </>
  );
}

export default TourPackagesSingle;
