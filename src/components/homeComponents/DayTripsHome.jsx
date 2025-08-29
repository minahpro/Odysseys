"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { DayTripCardPro } from "../cards";
import { findItArray } from "../Functions";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import { Search } from "lucide-react";
import { SecondaryButton } from "../buttons";
import Link from "next/link";
import { demoDataBase } from "@/data/Demo-database";
import SmallScreenSwipers from "../SmallScreenSwiper";

function DayTripsHome() {
  const destinations = demoDataBase?.mainDestinations;
  const dayTripsData = demoDataBase?.experiances
    ?.slice(0, 6)
    .map((exp, index) => ({
      ...exp,
      destinations: exp?.location?.map((loc) => {
        const dest = destinations?.find((d) => d?.id === loc?.destination);
        return dest?.title;
      }),
      slug: exp?.id,
    }));

  return (
    <div className="respons lg:py-20 py-10">
      {/* banner */}

      <div className="relative rounded-2xl py-16 bg-primary overflow-hidden">
        <div data-aos="fade-up" className="px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-accent p-5 rounded-full">
              <Search className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="font-jua text-3xl md:text-4xl text-accent mb-4">
            Experiance Real, Raw Nature
          </h2>
          <p className="font-quicksand text-lg text-accent/80 mb-8 max-w-3xl mx-auto">
            Travelling is about more than the places you visit and the things
            you’ll see. It’s about people, culture, wildlife, history, and
            experiencing something you’ve never done before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences">
              <SecondaryButton>Explore All Experiences</SecondaryButton>
            </Link>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-secondary/20 rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 bg-accent/20 rounded-full"></div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/10 rounded-full"></div>
      </div>

      <div className="mt-12 relative">
        <div className="sm:block hidden w-full">
          <div className="sm:grid-cols-2 grid gap-8 lg:gap-12">
            {dayTripsData?.map((dayTrip, index) => (
              <div
                className="w-full"
                data-aos={
                  // 2 should fade right and 2 should fade left
                  index % 2 === 0 ? "fade-right" : "fade-left"
                }
                data-aos-delay={index * 200}
                key={dayTrip?.id}
              >
                <DayTripCardPro tour={dayTrip} />
              </div>
            ))}
          </div>
        </div>

        {/* small screen */}
        <div className="sm:hidden block w-full">
          <SmallScreenSwipers
            datas={dayTripsData}
            Children={({ item, index }) => <DayTripCardPro tour={item} />}
          />
        </div>
      </div>
    </div>
  );
}

export default DayTripsHome;
