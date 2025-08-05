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
        first={"Day Trips "}
        last={"Packages."}
        image={"/images/tourImages/epso11.jpg"}
      />
      <section className="sm:py-28 py-10 bg-highlight/40">
        <div className="respons">
          <Title
            title={"Everything You Need"}
            badge={"What's Included"}
            subHeading={
              "List of everything you need to know about your day trip and everthing to bring with you."
            }
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-jua font-bold text-white mb-4">
                  Included in Every Trip
                </h3>
                <div className="space-y-4">
                  {[
                    "Professional English-speaking guide",
                    "Comfortable 4WD safari vehicle",
                    "All park entrance fees",
                    "Bottled water throughout the day",
                    "Delicious packed lunch",
                    "Hotel pickup and drop-off",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-textcolor">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-jua font-bold text-white mb-4">
                  What to Bring
                </h3>
                <div className="space-y-4">
                  {[
                    "Comfortable walking shoes",
                    "Sun hat and sunglasses",
                    "Camera with extra batteries",
                    "Light jacket for early morning",
                    "Personal medications",
                    "Small backpack for personal items",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-textcolor">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="respons lg:pt-20 lg:pb-20 pt-4 pb-10">
        <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
          {/* filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:block hidden">
              <DaysTripFilter availableTours={allFetchedDayTrips} />
            </div>
            <div className="lg:hidden block">
              <SimpleAccordionFieldComp
                allDivClass={"rounded-lg px-6 py-0 border space-y-2 text-sm"}
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
            <div className="p-3 flex justify-between items-center gap-4 flex-wrap border border-highlight bg-highlight rounded">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-white">
                  ({finalTours?.length}) Tour
                  {finalTours?.length === 1 ? "" : "s"} Found
                </p>
              </div>

              <div className="flex items-center space-x-2 text-lg">
                <button
                  onClick={clearFilter}
                  className={`text-white border border-primary transitions py-2 text-sm px-6 rounded flex-all hover:bg-secondary hover:text-black`}
                >
                  Clear filter
                </button>
              </div>
            </div>

            {/* show filters */}
            {filter ? (
              <p className="text-md text-white">
                Showing results for:{" "}
                <span className="text-sm font-semibold">
                  {destinationFilter && `Destination: ${destinationFilter}`}
                  {tagFilter && `Tag: ${tagFilter}`}{" "}
                </span>
              </p>
            ) : null}

            {
              // loading
              isLoading || isFetchingTourTags ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <TourLoading key={i} />
                  ))}
                </div>
              ) : currentPosts?.length > 0 ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPosts?.map((tour, index) => (
                    <DayTripCardPro
                      key={index}
                      tour={{
                        ...tour,
                        prices: tour?.price?.foreigner || 0,
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
      </main>
      <WhyChooseUs />
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
