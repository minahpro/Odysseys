// pages/tours.js
"use client";
import { findItName, findItTitle } from "@/components/Functions";
import { SimpleAccordionFieldComp } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { AccommodationCardPro } from "@/components/cards";
import AccommodationFilter from "@/components/Filters/AccommodationFilter";
import ListBanner from "@/components/banners/ListBanner";

function Tours() {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const searchParams = useSearchParams();
  const [finalAcc, setFinalAcc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const params = new URLSearchParams(searchParams);

  // ************* EXTRACT QUERY PARAMS *************
  const filter = searchParams.get("filter");
  const categoryFilter = filter === "category" ? searchParams.get("value") : "";
  const levelFilter = filter === "level" ? searchParams.get("value") : "";
  const destinationFilter =
    filter === "destination" ? searchParams.get("value") : "";
  const inOutParkFilter =
    filter === "inOutPark" ? searchParams.get("value") : "";

  // *************** FETCH DATA *************** //
  const { fetchedAccommodations, fetchedDestinations, isLoading } =
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

  // ************* USE EFFECTS *************
  React.useEffect(() => {
    // use switch case
    switch (filter) {
      case "category": // ****** CATEGORY FILTER ******
        setFinalAcc(
          fetchedAccommodations?.filter(
            (itm) =>
              itm?.category ===
              findItTitle({ data: accommodationTypes, title: categoryFilter })
          )
        );
        break;
      case "level": // ****** LEVEL FILTER ******
        setFinalAcc(
          fetchedAccommodations?.filter(
            (itm) =>
              itm?.level ===
              findItTitle({ data: accommodationStandards, title: levelFilter })
          )
        );
        break;
      case "destination": // ****** DESTINATION FILTER ******
        setFinalAcc(
          fetchedAccommodations?.filter(
            (itm) =>
              itm?.destinationId ===
              findItName({
                data: fetchedDestinations,
                title: destinationFilter,
              })
          )
        );
        break;
      case "inOutPark": // ****** IN-OUT PARK FILTER *****
        setFinalAcc(
          fetchedAccommodations?.filter((itm) =>
            inOutParkFilter === "outpark"
              ? itm?.isInPark === false
              : itm?.isInPark === true
          )
        );
        break;
      default:
        // Display featured destinations first
        const featured = fetchedAccommodations?.filter(
          (item) => item?.isFeatured
        );
        const nonFeatured = fetchedAccommodations?.filter(
          (item) => !item?.isFeatured
        );
        setFinalAcc([...featured, ...nonFeatured]);
        break;
    }
  }, [
    filter,
    categoryFilter,
    levelFilter,
    destinationFilter,
    inOutParkFilter,
    fetchedAccommodations,
    fetchedDestinations,
  ]);

  // ************* CLEAR FILTER *************
  const clearFilter = () => {
    setCurrentPage(1);
    params.delete("filter");
    params.delete("value");
    window.history.replaceState({}, "", "?" + params.toString());
    setFinalAcc(fetchedAccommodations);
  };

  // ************ PAGINATION VARIABLES *************

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = finalAcc?.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <TitleHeader
        first={"Accommo"}
        last={"dations."}
        image={"/images/tourImages/epso22.jpg"}
      />
      <main className="respons lg:pt-20 lg:pb-20 pt-4 pb-10">
        <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
          {/* filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:block hidden">
              <AccommodationFilter />
            </div>
            <div className="lg:hidden block">
              <SimpleAccordionFieldComp
                allDivClass={"rounded-lg px-6 py-0 border space-y-2 text-sm"}
                Icon={() => {}}
                title={"Safaris Filters"}
              >
                <div className="py-2">
                  <AccommodationFilter />
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
                  Showing {currentPosts?.length} Accomodations
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
                  {categoryFilter && `Type: ${categoryFilter}`}{" "}
                  {destinationFilter && `Destination: ${destinationFilter}`}{" "}
                  {levelFilter && `Standard: ${levelFilter}`}
                  {inOutParkFilter}
                </span>
              </p>
            ) : null}

            {
              // loading
              isLoading ||
              isFetchingAccommodationTypes ||
              isFetchingAccommodationStandards ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <TourLoading key={i} />
                  ))}
                </div>
              ) : currentPosts?.length > 0 ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPosts?.map((item, index) => (
                    <AccommodationCardPro
                      key={index}
                      item={{
                        ...item,
                        category: findIt({
                          data: accommodationTypes,
                          id: item?.category,
                        }),
                        standard: findIt({
                          data: accommodationStandards,
                          id: item?.level,
                        }),
                        destination: getDestination(item?.destinationId),
                      }}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound text="No Accommodation Found" />
              )
            }

            {/* Paginations */}
            {finalAcc?.length > postsPerPage && (
              <div className="mt-12">
                <PaginationSet
                  totalPosts={finalAcc?.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <ListBanner />
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
