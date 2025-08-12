// pages/tours.js
"use client";
import AdventureBanner from "@/components/banners/AdventureBanner";
import PromoBanner from "@/components/banners/PromoBanner";
import TrekkingBanner from "@/components/banners/TrekkingBanner";
import { TourCardPro } from "@/components/cards";
import FilterTour from "@/components/Filters/FilterTour";
import {
  filterByTours,
  findItName,
  findItTitle,
  sortTours,
  sortToursDuration,
} from "@/components/Functions";
import { SimpleAccordionFieldComp } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function Tours() {
  // ************* STATES *************
  const min = 400;
  const max = 10000;
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const searchParams = useSearchParams();
  const [finalTours, setFinalTours] = useState([]);
  const params = new URLSearchParams(searchParams);
  const [values, setValues] = useState([min, max]);

  // ************* EXTRACT QUERY PARAMS *************
  const filter = searchParams.get("filter");
  const categoryFilter = filter === "category" ? searchParams.get("value") : "";
  const typeFilter = filter === "type" ? searchParams.get("value") : "";
  const destinationFilter =
    filter === "destination" ? searchParams.get("value") : "";
  const tagFilter = filter === "tag" ? searchParams.get("value") : "";
  const standardFilter = filter === "standard" ? searchParams.get("value") : "";
  const sortFilter = filter === "sort" ? searchParams.get("value") : "";
  const durationFilter = filter === "duration" ? searchParams.get("value") : "";
  const filterByFilter = filter === "filterBy" ? searchParams.get("value") : "";
  const priceFilter = filter === "price";
  const minPrice = searchParams.get("min");
  const maxPrice = searchParams.get("max");

  // ************* FETCH DATA *************
  const {
    allFetchedTours: availableTours,
    isLoading,
    fetchedDestinations,
  } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");
  const { data: tourStandards, isLoading: isFetchingTourStandards } =
    useFetchAll("tour-standards");
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");

  // ************* USE EFFECTS *************
  useEffect(() => {
    // use switch case to filter tours
    switch (filter) {
      case "category":
        const newData = availableTours?.filter(
          (tour) =>
            tour.category ===
            findItTitle({ data: tourCategories, title: categoryFilter })
        );
        setFinalTours(newData);
        break;
      case "type":
        const newData1 = availableTours?.filter((tour) =>
          tour.focus?.includes(
            findItTitle({ data: tourTypes, title: typeFilter })
          )
        );
        setFinalTours(newData1);
        break;
      case "destination":
        const newData2 = availableTours?.filter((tour) =>
          tour.itinerary?.some(
            (item) =>
              item.destinationId ===
              findItName({
                data: fetchedDestinations,
                title: destinationFilter,
              })
          )
        );
        setFinalTours(newData2);
        break;
      case "tag":
        const newData3 = availableTours?.filter((tour) =>
          tour.tags?.includes(findItTitle({ data: tourTags, title: tagFilter }))
        );
        setFinalTours(newData3);
        break;
      case "standard":
        const newData4 = availableTours?.filter(
          (tour) =>
            tour.standard ===
            findItTitle({ data: tourStandards, title: standardFilter })
        );
        setFinalTours(newData4);
        break;
      case "sort":
        sortTours({ sortFilter, availableTours, setFinalTours });
        break;
      case "filterBy":
        filterByTours({
          filterByFilter,
          availableTours,
          setFinalTours,
        });
        break;
      case "duration":
        sortToursDuration({
          tourDuration: durationFilter,
          availableTours,
          setFinalTours,
        });
        break;

      default:
        const featured = availableTours?.filter((item) => item?.isFeatured);
        const nonFeatured = availableTours?.filter((item) => !item?.isFeatured);
        setFinalTours([...featured, ...nonFeatured]);
        break;
    }
  }, [
    availableTours,
    categoryFilter,
    typeFilter,
    destinationFilter,
    tourCategories,
    tourTypes,
    fetchedDestinations,
    tagFilter,
    tourTags,
    standardFilter,
    tourStandards,
    sortFilter,
    filter,
    durationFilter,
    filterByFilter,
  ]);

  // ************* FILTER BY PRICE ON FILTERED TOURS*************
  useEffect(() => {
    if (minPrice && maxPrice && priceFilter) {
      setFinalTours(
        availableTours?.filter((tour) => {
          const price = parseInt(tour.price.foreigner.adult.highSeason);
          return price >= minPrice && price <= maxPrice;
        })
      );
    } else null;
  }, [minPrice, maxPrice, priceFilter]);

  // ************* CLEAR FILTER *************
  const clearFilter = () => {
    setCurrentPage(1);
    // clear everthing on url and return all tours
    params.delete("filter");
    params.delete("value");
    params.delete("min");
    params.delete("max");
    setValues([min, max]);
    window.history.replaceState({}, "", "?" + params.toString());
    setFinalTours(availableTours);
    // scroll to top of the page
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // ************ PAGINATION VARIABLES *************
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = finalTours?.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <TitleHeader
        first={"Safari "}
        last={"Packages."}
        image={"/images/tourImages/epso55.jpg"}
        sub={
          "Ready to embark on your Tanzania adventure? Get in touch with our expert travel consultants who will help you create the perfect itinerary tailored to your interests and budget."
        }
        link={{
          href: "/contact",
          text: "Plan Your Adventure",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
            {/* filters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="lg:block hidden">
                <FilterTour
                  passingDatas={{
                    availableTours,
                    setCurrentPage,
                    clearFilter,
                    valuePrice: {
                      values,
                      min,
                      max,
                      setValues,
                    },
                  }}
                />
              </div>
              <div className="lg:hidden block">
                <SimpleAccordionFieldComp
                  allDivClass={"rounded-xl px-6 py-0 border space-y-2 text-sm"}
                  Icon={() => {}}
                  title={"Safaris Filters"}
                >
                  <div className="py-2">
                    <FilterTour
                      passingDatas={{
                        availableTours,
                        clearFilter,
                        setCurrentPage,
                        valuePrice: {
                          values,
                          min,
                          max,
                          setValues,
                        },
                      }}
                    />
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
                          {categoryFilter && `Category: ${categoryFilter}`}{" "}
                          {typeFilter && `Type: ${typeFilter}`}{" "}
                          {destinationFilter &&
                            `Destination: ${destinationFilter}`}{" "}
                          {standardFilter && `Standard: ${standardFilter}`}{" "}
                          {tagFilter && `Tag: ${tagFilter}`}
                          {durationFilter && `Duration: ${durationFilter} days`}
                          {sortFilter && `Sort: ${sortFilter} packages`}
                          {filterByFilter &&
                            `Filtered By: ${filterByFilter} packages`}
                        </span>
                        {
                          // price filter
                          priceFilter && (
                            <span className="text-sm font-semibold">
                              {" "}
                              Price: ${minPrice} - ${maxPrice}
                            </span>
                          )
                        }
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
                isLoading ||
                isFetchingTourCategories ||
                isFetchingTourTypes ||
                isFetchingTourTags ||
                isFetchingTourStandards ? (
                  <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <TourLoading key={i} />
                    ))}
                  </div>
                ) : currentPosts?.length > 0 ? (
                  <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPosts?.map((tour, index) => (
                      <TourCardPro
                        key={index}
                        tour={{
                          ...tour,
                          prices: tour?.price?.foreigner?.adult?.highSeason,
                          category: tourCategories?.find(
                            (cat) => cat?.id === tour?.category
                          )?.title, // get category title
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
      </section>
      <PromoBanner
        title="About Our Company"
        subtitle="Discover our passion for creating unforgettable journeys and our commitment to excellence."
        imageSrc="/images/bg/9.png"
        contentList={[
          {
            icon: "Settings",
            text: "Trusted local experts with years of experience",
          },
          {
            icon: "Compass",
            text: "Passionate about sharing Tanzania's wonders",
          },
          {
            icon: "Users",
            text: "Personalized service for every traveler",
          },
          {
            icon: "MapPin",
            text: "Committed to responsible and sustainable tourism",
          },
        ]}
        buttonText="Read About Us"
        buttonLink="/about"
        bgColor="bg-secondary"
        textColor={{
          title: "text-primary",
          sub: "text-accent",
          list: "text-accent",
          icon: "text-accent",
        }}
        reverse={true}
      />
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
