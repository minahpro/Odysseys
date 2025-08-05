"use client";
import { findItTitle } from "../Functions";
import { useCallback, useEffect, useRef, useState } from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import { Title } from "../texties";
import { Award, Clock, Mountain, TrendingUp } from "lucide-react";
import { BookNowButton, SecondaryButton } from "../buttons";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import BookingPopup from "../Popups/BookingPopup";

export default function TrekkingTours() {
  const sliderRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState({});
  const { allFetchedTours, isLoading } = useAppContext();
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  const { data: tourTags } = useFetchAll("tour-tags");
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

  //  separate the tours into three sections all,kilimanjaro, and meru
  const NewData = () => {
    const returnTour = (data) => {
      return {
        ...data,
        mountain: data?.mountain || "---",
        focus: data?.focus?.map(
          (id) => tourTypes?.find((cat) => cat?.id === id)?.title
        ),
        prices: data?.price?.foreigner?.adult?.highSeason,
        category: tourGroupCategories?.find((cat) => cat?.id === data?.category)
          ?.title, // get category title
      };
    };
    // kilimanjaro
    const kilimanjaro = tours
      ?.filter((tour) =>
        tour?.tags?.includes(
          findItTitle({ data: tourTags, title: "kilimanjaro" })
        )
      )
      .map((tour) => returnTour({ ...tour, mountain: "Kilimanjaro" }));
    //   meru
    const meru = tours
      ?.filter((tour) =>
        tour?.tags?.includes(findItTitle({ data: tourTags, title: "meru" }))
      )
      .map((tour) => returnTour({ ...tour, mountain: "Mt. Meru" }));

    //   all
    const all = [...kilimanjaro, ...meru];
    return all;
  };

  const kilimanjaro = NewData();

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
    <>
      {open && (
        <BookingPopup
          handleOpen={open}
          handleClose={() => setOpen(false)}
          datas={{
            status: "single-tour",
            id: tour?.id,
            title: tour?.title,
            slug: tour?.slug,
          }}
        />
      )}
      <section className="sm:py-28 py-10 bg-highlight/50">
        <div className="respons">
          <Title
            badge={"🏔️ Mountain Adventures"}
            title={"Trekking Tours"}
            subHeading={
              "Conquer Tanzania's majestic peaks with our expertly guided trekking adventures. From Kilimanjaro to Mount Meru, reach new heights safely."
            }
          />
          <div className="mt-12 md:mx-16">
            {isLoading || isFetchingTourTypes || isFetchingTourCategories ? (
              <TourLoading />
            ) : kilimanjaro?.length > 0 ? (
              <Swiper
                ref={sliderRef}
                modules={[Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                speed={2000}
                loop={true}
                className="w-full"
              >
                {kilimanjaro?.map((trek, index) => (
                  <SwiperSlide key={index}>
                    <div className="overflow-hidden relative border border-gray-800 rounded-3xl hover:border-primary/20 transitions">
                      <div className="bg-black transitions transform hover:scale-105">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          {/* Image Section */}
                          <div className="relative md:h-80 h-60 lg:h-auto">
                            <img
                              src={trek.photos[0] || "/placeholder.svg"}
                              alt={trek.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                            <div className="absolute top-6 left-6">
                              <div className="px-4 font-semibold text-lg py-2 rounded-full bg-primary ">
                                ${trek.prices}
                              </div>
                            </div>
                            <div className="absolute bottom-6 left-6">
                              <div className="px-4 font-semibold py-2 rounded-full bg-white/30 backdrop-blur-md text-white ">
                                {trek.mountain}
                              </div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-8 lg:p-12">
                            <h3 className="md:text-2xl text-lg line-clamp-2 font-jua font-bold text-white mb-4">
                              {trek.title}
                            </h3>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: trek?.overview,
                              }}
                              className="text-gray-300 md:text-lg text-base mb-6 leading-relaxed line-clamp-2"
                            />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-gray-800 rounded-lg p-4 text-center">
                                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-white font-semibold">
                                  {trek.duration}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Duration
                                </div>
                              </div>
                              <div className="bg-gray-800 rounded-lg p-4 text-center">
                                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-white font-semibold">
                                  Challenging
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {
                                    ["Moderate", "Challenging", "Easy"][
                                      Math.floor(Math.random() * 3)
                                    ]
                                  }
                                </div>
                              </div>
                              <div className="bg-gray-800 rounded-lg p-4 text-center">
                                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-white font-semibold">
                                  {/* generate random percent from 60% to 100% */}
                                  {Math.floor(Math.random() * 40) + 60}%
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Success Rate
                                </div>
                              </div>
                              <div className="bg-gray-800 rounded-lg p-4 text-center">
                                <Mountain className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="text-white font-semibold">
                                  Full-year
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Best Time
                                </div>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-6">
                              <h4 className="text-white font-semibold mb-3">
                                Trek Highlights:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {trek?.focus?.map((highlight, index) => (
                                  <div
                                    key={index}
                                    className="text-xs border px-2 py-1 rounded-full border-gray-600 text-textcolor"
                                  >
                                    {highlight}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                              <BookNowButton
                                onClick={() => {
                                  setOpen(true);
                                  setTour(trek);
                                }}
                                className="flex-1"
                              />
                              <Link href={`/tours/${trek.slug}`}>
                                <SecondaryButton>View Details</SecondaryButton>
                              </Link>
                            </div>
                          </div>
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
            ) : (
              <NoDataFound text="No Trekking Trip Found" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
