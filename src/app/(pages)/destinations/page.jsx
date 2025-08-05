"use client";

import { DestinationCardPro } from "@/components/cards";
import DestinationsFilter from "@/components/Filters/destinationFilter";
import { findItTitle } from "@/components/Functions";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import { SimpleAccordionFieldComp } from "@/components/inputField";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import {
  DestinationLoading,
  PageLoading,
} from "@/components/Loadings/LoadingComp";
import PaginationSet from "@/components/paginationSet";

import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

function Destinations() {
  const { fetchedDestinations, allFetchedTours, isLoading } = useAppContext();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const filterByName = searchParams.get("name");
  const [newDestinations, setNewDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Fetch destination types
  const { data: destinationTypes, isLoading: isFetchingOptions } =
    useFetchAll("destination-types");

  // Get the number of tours for each destination
  const getTourAmount = (id) => {
    return allFetchedTours?.filter((itm) =>
      itm?.itinerary?.some((it) => it?.destinationId === id)
    )?.length;
  };

  // Filter by destination type
  useEffect(() => {
    if (!fetchedDestinations) return;

    if (filter) {
      const filterType = findItTitle({ data: destinationTypes, title: filter });

      if (filterType) {
        setNewDestinations(
          fetchedDestinations?.filter((item) => item?.type === filterType)
        );
      }
    } else {
      // Display featured destinations first
      const featured = fetchedDestinations?.filter((item) => item?.isFeatured);
      const nonFeatured = fetchedDestinations?.filter(
        (item) => !item?.isFeatured
      );
      setNewDestinations([...featured, ...nonFeatured]);
    }
  }, [fetchedDestinations, filter]);

  // Filter by name
  useEffect(() => {
    if (filterByName) {
      setNewDestinations(
        fetchedDestinations?.filter((item) =>
          item?.name.toLowerCase().includes(filterByName?.trim().toLowerCase())
        )
      );
    }
  }, [filterByName]);

  // Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = newDestinations?.slice(firstPostIndex, lastPostIndex);

  // Clear filter function
  const clearFilter = () => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search);
      param.delete("filter");
      param.delete("name");

      const newUrl = param.toString()
        ? `?${param.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      if (fetchedDestinations) {
        setNewDestinations(fetchedDestinations);
      }

      setCurrentPage(1);
    }
  };

  return (
    <>
      <TitleHeader
        first={"Destina"}
        last={"tions."}
        image={"/images/tourImages/epso33.jpg"}
      />
      <main className="respons lg:pt-20 lg:pb-20 pt-4 pb-10">
        <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:block hidden">
              <DestinationsFilter
                clearFilter={clearFilter}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="lg:hidden block">
              <SimpleAccordionFieldComp
                allDivClass="rounded-lg px-6 py-0 border space-y-2 text-sm"
                Icon={IoFilterSharp}
                title="Destinations Filters"
              >
                <div className="py-2">
                  <DestinationsFilter
                    clearFilter={clearFilter}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </SimpleAccordionFieldComp>
            </div>
          </div>
          <div className="lg:col-span-2 lg:pl-12 space-y-10">
            {isLoading || isFetchingOptions ? (
              <div className="space-y-5">
                {[...Array(6)].map((_, i) => (
                  <DestinationLoading key={i} />
                ))}
              </div>
            ) : currentPosts?.length > 0 ? (
              <div className="space-y-5">
                {currentPosts.map((item, index) => (
                  <DestinationCardPro
                    item={{
                      ...item,
                      tourAmount: getTourAmount(item.id),
                    }}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <NoDataFound text="No Destination Found" />
            )}

            {/* Pagination */}
            {newDestinations?.length > postsPerPage && (
              <PaginationSet
                totalPosts={newDestinations?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </main>
      <DayTripsHome />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Destinations />
    </Suspense>
  );
}
