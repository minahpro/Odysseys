// pages/tours.js
"use client";

import {
  GlassButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/buttons";
import {
  DayTripCardPro,
  TourCardPro,
  ZanzibarCardPro,
} from "@/components/cards";
import { findItTitle } from "@/components/Functions";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import { PlainTitle, Title } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { zanzibarHighlights } from "@/data/randomData";

function Tours() {
  const [play, setPlay] = React.useState(false);
  const videoRef = React.useRef(null);
  // *********** FETCH DATA *****************
  const { allFetchedDayTrips, allFetchedTours, isLoading } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTags } =
    useFetchAll("tour-tags");
  const { data: tourGroupCategories, isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");

  // ************* fetch Zanzibar trips *************
  const zanzibarTrips = allFetchedDayTrips?.filter((trip) =>
    trip.tags.includes(findItTitle({ data: tourTags, title: "zanzibar" }))
  );
  const allZanzibarTours = allFetchedTours?.filter((tour) =>
    tour?.focus?.includes(findItTitle({ data: tourTypes, title: "zanzibar" }))
  );

  // ************* render destinations Ids from zanzibar trip and get title from getDestination() *************
  const finalZanzibarTrips = zanzibarTrips?.slice(0, 6).map((trip) => {
    return {
      ...trip,
      prices: trip?.price?.foreigner,
    };
  });

  const finalZanzibarTrips2 = allZanzibarTours?.slice(0, 6).map((trip) => {
    return {
      ...trip,
      prices: trip?.price?.foreigner?.adult?.highSeason,
      category: tourGroupCategories?.find((cat) => cat?.id === trip?.category)
        ?.title,
    };
  });

  return (
    <>
      <TitleHeader
        first={"Zanzibar "}
        last={"Trips."}
        image={"/images/ufukwe2.jpeg"}
      />
      <div className="lg:pt-20 pt-10">
        <main className="respons md:pb-32 pb-10">
          {/* About Zanzibar Section */}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <PlainTitle
                first={"Escape to the Jewel of "}
                last={"the Indian Ocean."}
              />
              <p className="text-lg text-textcolor/80 leading-relaxed">
                Zanzibar is a tropical paradise nestled in the Indian Ocean,
                just off the coast of Tanzania. Known for its powdery white-sand
                beaches, turquoise waters, and rich Swahili culture, Zanzibar
                offers a perfect escape for travelers seeking both relaxation
                and adventure.
              </p>
              <p className="text-lg text-textcolor/80 leading-relaxed">
                This island archipelago is more than just stunning beaches —
                it’s a place where history and culture thrive. Wander through
                Stone Town, a UNESCO World Heritage Site filled with ancient
                alleys, coral-stone buildings, and the scent of spices in the
                air.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/plan-your-safari"}>
                  <PrimaryButton className="sm:w-auto w-full">
                    Plan Your Trip
                  </PrimaryButton>
                </Link>
                <Link href={"/gallery"}>
                  <SecondaryButton className="sm:w-auto w-full">
                    View Gallery
                  </SecondaryButton>
                </Link>
              </div>
            </div>
            {/* Key Highlights */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 ">
              {zanzibarHighlights.map((highlight, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={index}
                  className="text-center p-6 bg-highlight/50 border border-highlight/50 rounded-lg"
                >
                  <highlight.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-textcolor">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* video */}
          <div className="relative mt-12">
            <video
              muted
              loop
              ref={videoRef}
              className="w-full sm:h-[500px] h-[300px] rounded-xl object-cover"
            >
              <source src="/images/zanz.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex-all">
              <GlassButton
                className="w-16 h-16 p-0"
                onClick={() => {
                  if (play) {
                    videoRef.current.pause();
                    setPlay(false);
                  } else {
                    videoRef.current.play();
                    setPlay(true);
                  }
                }}
              >
                {!play ? <Play /> : <Pause />}
              </GlassButton>
            </div>
          </div>
        </main>
        <div className=" md:pb-32 pb-10">
          <section className="respons">
            <Title
              title={"Zanzibar Day Trips"}
              badge={"Top Rated"}
              subHeading={
                "Explore Zanzibar's highlights with our carefully curated day trips. Perfect for those staying on the island who want to discover its culture, history, and natural wonders."
              }
            />
            {
              // loading
              isLoading ||
              isFetchingTags ||
              isFetchingTourCategories ||
              isFetchingTourTypes ? (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <TourLoading key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {finalZanzibarTrips?.map((tour, index) => (
                    <DayTripCardPro key={index} tour={tour} />
                  ))}
                </div>
              )
            }
            <div className="text-center mt-12">
              <SecondaryButton>Explore More Day Trips</SecondaryButton>
            </div>
          </section>
        </div>

        {/* Tours with Zanzibar Included Section */}
        <div className="md:py-32 py-10 bg-highlight/40">
          <section className="respons">
            <Title
              title={"Tours with Zanzibar Included."}
              badge={"Adventure Awaits."}
              subHeading={
                "Combine the thrill of an African safari with the relaxation of Zanzibar's tropical beaches. These comprehensive packages offer the perfect balance of adventure and leisure."
              }
            />
            {
              // loading
              isLoading ||
              isFetchingTags ||
              isFetchingTourCategories ||
              isFetchingTourTypes ? (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <TourLoading key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {finalZanzibarTrips2?.map((tour, index) => (
                    <TourCardPro key={index} tour={tour} />
                  ))}
                </div>
              )
            }

            <div className="text-center mt-12">
              <SecondaryButton>View All Safari Packages</SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Tours />
    </Suspense>
  );
}
