// pages/tours.js
"use client";
import AdventureBanner from "@/components/banners/AdventureBanner";
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
      />
      <main className="respons lg:pt-20 lg:pb-20 pt-4 pb-10">
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
                allDivClass={"rounded-lg px-6 py-0 border space-y-2 text-sm"}
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
              <p className="text-md text-textcolor">
                Showing results for:{" "}
                <span className="text-sm font-semibold">
                  {categoryFilter && `Category: ${categoryFilter}`}{" "}
                  {typeFilter && `Type: ${typeFilter}`}{" "}
                  {destinationFilter && `Destination: ${destinationFilter}`}{" "}
                  {standardFilter && `Standard: ${standardFilter}`}{" "}
                  {tagFilter && `Tag: ${tagFilter}`}
                  {durationFilter && `Duration: ${durationFilter} days`}
                  {sortFilter && `Sort: ${sortFilter} packages`}
                  {filterByFilter && `Filtered By: ${filterByFilter} packages`}
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
      </main>
      <TrekkingBanner />
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
