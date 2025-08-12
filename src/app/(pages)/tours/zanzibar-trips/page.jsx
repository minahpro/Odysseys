// pages/tours.js
"use client";

import { GlassButton, SecondaryButton } from "@/components/buttons";
import { DayTripCardPro, TourCardPro } from "@/components/cards";
import { findItArray, findItTitle } from "@/components/Functions";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import { Title } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { Pause, Play, TentTree, TreePalm, Waves } from "lucide-react";
import React, { Suspense } from "react";
import { zanzibarHighlights } from "@/data/randomData";

function Tours() {
  const [play, setPlay] = React.useState(false);
  const videoRef = React.useRef(null);
  // *********** FETCH DATA *****************
  const {
    allFetchedDayTrips,
    allFetchedTours,
    fetchedDestinations,
    isLoading,
  } = useAppContext();
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

      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <TreePalm />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Crafting Your Dream Safari
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Whether you dream of witnessing the Great Migration, conquering
              Kilimanjaro, or relaxing on Zanzibar's pristine beaches, our
              diverse range of packages caters to all interests and budgets. We
              combine expert guidance with seamless logistics to ensure a truly
              immersive experience.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 mt-20 gap-12 items-center">
            <div className="relative">
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
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 ">
              {zanzibarHighlights.map((highlight, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={index}
                  className="text-center p-6 bg-accent border border-secondary/20 rounded-xl"
                >
                  <highlight.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold text-primary mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-primary">{highlight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:pt-28 pt-10">
            <Title
              title={"Tours with Zanzibar Included."}
              badge={<Waves />}
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
          </div>
        </div>
      </section>

      <div className=" md:py-28 py-10">
        <section className="respons">
          <Title
            title={"Zanzibar Day Trips"}
            badge={<TentTree />}
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
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(3)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                {finalZanzibarTrips?.map((tour, index) => (
                  <DayTripCardPro
                    key={index}
                    tour={{
                      ...tour,
                      price: tour?.price?.foreigner || 0,
                      destinations: findItArray({
                        ids: tour?.destinations,
                        datas: fetchedDestinations,
                        dest: true, // destination has name not title
                      }),
                    }}
                  />
                ))}
              </div>
            )
          }
          <div className="text-center mt-12">
            <SecondaryButton>Explore More Day Trips</SecondaryButton>
          </div>
        </section>
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
