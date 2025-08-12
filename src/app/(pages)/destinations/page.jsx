"use client";

import { DestinationCardProHome } from "@/components/cards";
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
import { Map } from "lucide-react";
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
        image={"/images/bg/8.png"}
        sub="From the vast plains of the Serengeti to the pristine beaches of Zanzibar, discover Tanzania's wonders.Each region offers a unique tapestry of wildlife, landscapes, and cultural experiences."
        link={{
          text: "View Kilimanjaro Tours",
          href: "/tours/climbing-trips",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Map />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Unveiling Tanzania's Treasures
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Tanzania is a land of incredible diversity, boasting some of
              Africa's most iconic natural wonders. Our destinations are
              carefully selected to provide you with the best of what this
              magnificent country has to offer, from thrilling wildlife
              encounters to serene beach escapes and challenging mountain treks.
            </p>
          </div>
          <div className="w-full mt-12">
            <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
              {/* filters */}
              <div className="lg:col-span-1 space-y-6">
                <div className="lg:block hidden">
                  <DestinationsFilter
                    clearFilter={clearFilter}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <div className="lg:hidden block">
                  <SimpleAccordionFieldComp
                    allDivClass="rounded-xl px-6 py-0 border space-y-2 text-sm"
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
                {/* Results Header */}
                <div className="bg-secondary rounded p-6 mb-6 border border-secondary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white mb-2">
                      Showing {currentPosts?.length} Destinations
                    </h3>

                    <button
                      onClick={clearFilter}
                      className="text-sm bg-accent py-2 px-4 font-bold text-primary hover:text-secondary transition-colors"
                    >
                      Clear search
                    </button>
                  </div>
                </div>

                {isLoading || isFetchingOptions ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <DestinationLoading key={i} />
                    ))}
                  </div>
                ) : currentPosts?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPosts.map((item, index) => (
                      <DestinationCardProHome
                        key={index}
                        item={{
                          ...item,
                          tourAmount: getTourAmount(item.id),
                        }}
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
          </div>
        </div>
      </section>
      <div className="w-full bg-white lg:pt-20 pt-10">
        <DayTripsHome />
      </div>
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
