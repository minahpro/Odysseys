"use client";
import React, { useCallback, useRef } from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DayTripCardPro, ZanzibarCardPro } from "../cards";
import { findItArray, findItTitle } from "../Functions";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import {
  ArrowRight,
  Clock,
  Heart,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../buttons";

function DayTripsHome() {
  const { allFetchedDayTrips, isLoading, fetchedDestinations } =
    useAppContext();

  // ************* fetch non-Zanzibar trips *************
  const dayTripsData = allFetchedDayTrips?.slice(0, 3)?.map((dayTrip) => ({
    ...dayTrip,
    destinations: findItArray({
      ids: dayTrip?.destinations,
      datas: fetchedDestinations,
      dest: true, // destination has name not title
    }),
    price: dayTrip?.price?.foreigner || 0,
  }));

  return (
    <div className="respons">
      {/* banner */}

      <div className="relative rounded-2xl py-16 bg-primary overflow-hidden">
        <div className="px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-accent p-5 rounded-full">
              <Search className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="font-jua text-3xl md:text-4xl text-accent mb-4">
            Unforgettable Experiences
          </h2>
          <p className="font-quicksand text-lg text-accent/80 mb-8 max-w-3xl mx-auto">
            From cultural heritage to marine adventures, discover the magic of
            the Spice Island. Experience Tanzania's wonders in single-day
            excursions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SecondaryButton>View All Day Trips</SecondaryButton>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-secondary/20 rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 bg-accent/20 rounded-full"></div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>

      <div className="mt-12 relative">
        {
          // loading
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <TourLoading key={i} />
              ))}
            </div>
          ) : dayTripsData?.length > 0 ? (
            <div className="grid-cols-2 grid gap-12">
              {dayTripsData?.map((dayTrip, index) => (
                <ZanzibarCardPro key={index} tour={dayTrip} />
              ))}
            </div>
          ) : (
            <NoDataFound text={"No Day Trips Found"} />
          )
        }
      </div>
    </div>
  );
}

export default DayTripsHome;
