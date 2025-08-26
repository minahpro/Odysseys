"use client";
import React, { useRef, useCallback } from "react";
import { Title } from "../texties";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { GrLocation } from "react-icons/gr";

import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";
import { Blocks } from "lucide-react";
import Image from "next/image";
import { PrimaryButton } from "../buttons";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

function AccommodationsHome() {
  const sliderRef = useRef(null);
  const { fetchedAccommodations, isLoading, fetchedDestinations } =
    useAppContext();
  const { data: accommodationTypes, isLoading: isFetchingAccommodationTypes } =
    useFetchAll("accommodation-categories");
  const {
    data: accommodationStandards,
    isLoading: isFetchingAccommodationStandards,
  } = useFetchAll("accommodation-standards");

  // ******** Get categories and standard *************
  const findIt = ({ data, id }) => {
    const zbrTag = data?.find((itm) => itm?.id === id);
    return zbrTag?.title;
  };

  // ************* get destination *************
  const getDestination = (id) => {
    const destination = fetchedDestinations?.find((item) => item.id === id);
    return destination?.name;
  };

  // *********** Get fetured accommodations ************
  const featured = fetchedAccommodations?.filter((item) => item?.isFeatured);
  const nonFeatured = fetchedAccommodations?.filter(
    (item) => !item?.isFeatured
  );
  const feturedAcc = [...featured, ...nonFeatured].map((acc) => {
    return {
      ...acc,
      datas: [
        {
          title:
            findIt({ data: accommodationTypes, id: acc?.category }) || "---",
          icon: FiHome,
        },
        {
          title:
            findIt({ data: accommodationStandards, id: acc?.level }) || "---",
          icon: FaRegStar,
        },
        {
          title: acc?.isInPark ? "In Park" : "Out of Park",
          icon: GrLocation,
        },
      ],
      rating: Math.floor(Math.random() * (5 - 3 + 1) + 3) + ".0",
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
    <section className="sm:py-28 py-10 bg-white">
      <div className="respons">
        <Title
          badge={<Blocks />}
          title={"Where You'll Stay"}
          subHeading={
            "Indulge in luxury lodges, authentic tented camps, and eco-friendly stays handpicked for your comfort and immersion."
          }
        />

        <div className="mt-12 relative">
          {
            // loading
            isLoading ||
            isFetchingAccommodationTypes ||
            isFetchingAccommodationStandards ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : feturedAcc?.length > 0 ? (
              <>
                <Swiper
                  ref={sliderRef}
                  modules={[A11y, Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  speed={2000}
                  className="accommodations-swiper"
                >
                  {feturedAcc?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-0">
                          <div className="relative h-64 lg:h-full min-h-[300px]">
                            <Image
                              src={item?.photos[0]}
                              alt={item?.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-4 left-4 text-sm bg-accent text-primary px-3 py-1.5 rounded font-quicksand font-bold">
                              {getDestination(item?.destinationId)}
                            </div>
                          </div>
                          <div className="p-8 lg:p-12 border border-secondary/10 flex flex-col justify-center">
                            <div data-aos="fade-left">
                              <h3 className="font-black text-xl text-primary mb-4">
                                {item?.name}
                              </h3>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.overview,
                                }}
                                className=" text-secondary font-medium line-clamp-3 mb-6 leading-relaxed"
                              />
                              <div className="grid grid-cols-3 gap-6 mb-6">
                                {item?.datas?.map((data, index) => (
                                  <div
                                    className="flex-all flex-col p-6 bg-accent/40 rounded gap-3"
                                    key={index}
                                  >
                                    <data.icon className="w-5 h-5 text-primary" />
                                    <span className="font-bold capitalize text-sm text-secondary">
                                      {data.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <Link href={`/accommodations/${item?.slug}`}>
                                  <PrimaryButton>View Details</PrimaryButton>
                                </Link>
                                {/* stars */}
                                <div className="flex items-center gap-1">
                                  <FaStar className="w-4 h-4 text-yellow-500" />
                                  <span className="font-bold text-sm text-primary">
                                    {/* randomize number from 3-5 with points */}
                                    {item?.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

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
              </>
            ) : (
              <NoDataFound text="No Accommodation Found" />
            )
          }
        </div>
      </div>
    </section>
  );
}

export default AccommodationsHome;
