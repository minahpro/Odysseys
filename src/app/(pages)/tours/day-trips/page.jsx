// pages/tours.js
"use client";
import { findItArray, findItName, findItTitle } from "@/components/Functions";
import { SimpleAccordionFieldComp } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import DaysTripFilter from "@/components/Filters/DayTripsFilter";
import { DayTripCardPro } from "@/components/cards";
import WhyChooseUs from "@/components/homeComponents/WhyUsHome";
import { Title } from "@/components/texties";
import { Sun } from "lucide-react";
import PromoBanner from "@/components/banners/PromoBanner";
import ListBanner from "@/components/banners/ListBanner";
import FeaturesDestinations from "@/components/homeComponents/DestinationsHome";

function Tours() {
  // ************** STATE ***********
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [finalTours, setFinalTours] = useState([]);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // ************* EXTRACT QUERY PARAMS *************
  const filter = searchParams.get("filter");
  const destinationFilter =
    filter === "destination" ? searchParams.get("value") : "";
  const tagFilter = filter === "tag" ? searchParams.get("value") : "";

  // *********** FETCH DATA *****************
  const { allFetchedDayTrips, fetchedDestinations, isLoading } =
    useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");

  // ************* USE EFFECTS *************
  useEffect(() => {
    // use switch case to filter tours
    switch (filter) {
      case "destination":
        const newData = allFetchedDayTrips?.filter((tour) =>
          tour?.destinations?.includes(
            findItName({ data: fetchedDestinations, title: destinationFilter })
          )
        );
        setFinalTours(newData);
        break;
      case "tag":
        const newData2 = allFetchedDayTrips?.filter((tour) =>
          tour?.tags?.includes(
            findItTitle({ data: tourTags, title: tagFilter })
          )
        );
        setFinalTours(newData2);
        break;
      default:
        setFinalTours(allFetchedDayTrips);
        break;
    }
  }, [
    filter,
    destinationFilter,
    tagFilter,
    allFetchedDayTrips,
    fetchedDestinations,
    tourTags,
  ]);

  // ************* CLEAR FILTER *************
  const clearFilter = () => {
    setCurrentPage(1);
    // clear everthing on url and return all tours
    params.delete("filter");
    params.delete("value");
    window.history.replaceState({}, "", "?" + params.toString());
    setFinalTours(allFetchedDayTrips);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // ************ PAGINATION VARIABLES *************

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = finalTours?.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <TitleHeader
        first={"Day Trip "}
        last={"Adventures"}
        image={"/images/bg/13.png"}
        sub={
          "Perfect for travelers with limited time or those wanting to add extra experiences to their safari. Our day trips offer all adventure within a single day's. "
        }
        link={{
          href: "/gallery",
          text: "View Gallery",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Sun />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Explore Tanzania's Geography
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Tanzania is home to some of Africa's most iconic destinations.
              From the northern safari circuit featuring the Serengeti and
              Ngorongoro Crater, to the southern wilderness areas and the
              pristine beaches of Zanzibar, every region offers unique
              experiences. These are things you should bring with you:
            </p>
          </div>

          <div className="mt-10 w-full flex gap-4 flex-wrap">
            {[
              "Comfortable walking shoes",
              "Sun hat and sunglasses",
              "Camera with extra batteries",
              "Light jacket for early morning",
              "Personal medications",
              "Small backpack for personal items",
              "First aid kit",
              "Water bottle",
              "Snacks",
              "Toiletries",
              "Personal items",
              "Other essentials",
            ].map((item, index) => (
              <div
                key={index}
                className="flex py-2 px-4 rounded-xl bg-accent/30 border border-secondary/5 items-start gap-3"
              >
                <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                </div>
                <span className="text-primary font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="w-full mt-20">
            <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
              {/* filters */}
              <div className="lg:col-span-1 space-y-6">
                <div className="lg:block hidden" data-aos="fade-right">
                  <DaysTripFilter availableTours={allFetchedDayTrips} />
                </div>
                <div className="lg:hidden block">
                  <SimpleAccordionFieldComp
                    allDivClass={
                      "rounded-xl px-6 py-0 border space-y-2 text-sm"
                    }
                    Icon={() => {}}
                    title={"Safaris Filters"}
                  >
                    <div className="py-2">
                      <DaysTripFilter availableTours={allFetchedDayTrips} />
                    </div>
                  </SimpleAccordionFieldComp>
                </div>
              </div>
              {/* packages */}
              {/* Right Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Results Header */}
                <div className="bg-secondary rounded p-6 mb-6 border border-secondary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white mb-2">
                        ({finalTours?.length}) Tour
                        {finalTours?.length === 1 ? "" : "s"} Found
                      </h3>
                      {/* show filters */}
                      {filter ? (
                        <p className="text-accent text-sm">
                          Showing results for:{" "}
                          <span className="font-semibold">
                            {destinationFilter &&
                              `Destination: ${destinationFilter}`}
                            {tagFilter && `Tag: ${tagFilter}`}{" "}
                          </span>
                        </p>
                      ) : null}
                    </div>

                    <button
                      onClick={clearFilter}
                      className="text-sm bg-accent py-2 px-4 font-bold text-primary hover:text-secondary transition-colors"
                    >
                      Clear search
                    </button>
                  </div>
                </div>

                {
                  // loading
                  isLoading || isFetchingTourTags ? (
                    <div className="grid w-full grid-cols-1  gap-6">
                      {[...Array(6)].map((_, i) => (
                        <TourLoading key={i} />
                      ))}
                    </div>
                  ) : currentPosts?.length > 0 ? (
                    <div className="grid w-full grid-cols-1 gap-6">
                      {currentPosts?.map((tour, index) => (
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
                  ) : (
                    <NoDataFound text="No Tours Found" />
                  )
                }

                {/* Paginations */}
                {finalTours?.length > postsPerPage && (
                  <PaginationSet
                    totalPosts={finalTours?.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <PromoBanner
        title="Tailored to Your Desires"
        subtitle="We believe every journey should be as unique as you are. Customize your safari with us."
        imageSrc="/images/bg/15.png"
        contentList={[
          {
            icon: "Settings", // Flexible itineraries to match your schedule
            text: "Flexible itineraries to match your schedule",
          },
          {
            icon: "Compass", // Combine destinations for a multi-faceted adventure
            text: "Combine destinations for a multi-faceted adventure",
          },
          {
            icon: "Users", // Private or group tours available
            text: "Private or group tours available",
          },
          {
            icon: "MapPin", // Expert advice for every step of planning
            text: "Expert advice for every step of planning",
          },
        ]}
        buttonText="Book With Us Now"
        buttonLink="/contact"
        bgColor="bg-primary"
        textColor={{
          title: "text-accent",
          sub: "text-accent",
          list: "text-accent",
          icon: "text-secondary",
          button: "bg-accent text-primary hover:bg-secondary hover:text-white",
        }}
      />
      <FeaturesDestinations />
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
