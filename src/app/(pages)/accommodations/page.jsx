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
import { Home } from "lucide-react";
import { FiHome } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import PromoBanner from "@/components/banners/PromoBanner";

function Tours() {
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
        first={"Cam"}
        last={"mps."}
        image={"/images/bg/16.png"}
        sub="Discover Africa from some of the world’s premier safari camps, where natural wonders abound and wildlife is plentiful. This is Wilderness."
        link={{
          text: "Journeys Types",
          href: "/journeys",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Home />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Explore pristine, untamed Africa
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              From the waterways of Botswana’s Okavango Delta, to the plains of
              the Serengeti in Tanzania, the wild rivers and savannah of Zambia
              and Zimbabwe, the vast desert beauty of Namibia, and the lush
              rainforests of Rwanda, Wilderness brings you here. Explore our
              collective of camps across Southern and East Africa, and discover
              the continent’s wildest, most thrilling safari experiences.
            </p>
          </div>
          <div className="w-full mt-12">
            <div className="grid gap-5 lg:grid-cols-3 grid-cols-1">
              {/* filters */}
              <div className="lg:col-span-1 space-y-6">
                <div className="lg:block hidden" data-aos="fade-right">
                  <AccommodationFilter />
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
                      <AccommodationFilter />
                    </div>
                  </SimpleAccordionFieldComp>
                </div>
              </div>
              {/* Right Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Results Header */}
                <div className="bg-secondary rounded p-6 mb-6 border border-secondary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white mb-2">
                        Showing {currentPosts?.length} Accomodations
                      </h3>
                      {filter ? (
                        <p className="text-accent text-sm">
                          Showing results for:{" "}
                          <span className="font-semibold">
                            {categoryFilter && `Type: ${categoryFilter}`}{" "}
                            {destinationFilter &&
                              `Destination: ${destinationFilter}`}{" "}
                            {levelFilter && `Standard: ${levelFilter}`}
                            {inOutParkFilter}
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
                  isLoading ||
                  isFetchingAccommodationTypes ||
                  isFetchingAccommodationStandards ? (
                    <div className="space-y-10">
                      {[...Array(6)].map((_, i) => (
                        <TourLoading key={i} />
                      ))}
                    </div>
                  ) : currentPosts?.length > 0 ? (
                    <div className="space-y-10">
                      {currentPosts?.map((item, index) => (
                        <AccommodationCardPro
                          key={index}
                          item={{
                            ...item,
                            datas: [
                              {
                                title:
                                  findIt({
                                    data: accommodationTypes,
                                    id: item?.category,
                                  }) || "---",
                                icon: FiHome,
                              },

                              {
                                title: item?.isInPark
                                  ? "In Park"
                                  : "Out of Park",
                                icon: GrLocation,
                              },
                            ],
                            rating:
                              Math.floor(Math.random() * (5 - 3 + 1) + 3) +
                              ".0",
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
          </div>
        </div>
      </section>
      <PromoBanner
        title="Beyond the Big Five"
        subtitle="Discover hidden gems and unique experiences that go beyond the typical safari."
        imageSrc="/images/bg/3.png"
        contentList={[
          {
            icon: "Leaf",
            text: "Walking safaris for an intimate bush experience",
          },
          {
            icon: "Sun",
            text: "Hot air balloon rides over the Serengeti at dawn",
          },
          {
            icon: "Users",
            text: "Authentic cultural visits to Maasai villages",
          },
          { icon: "Compass", text: "Birdwatching in diverse ecosystems" },
        ]}
        buttonText="Explore Unique Experiences"
        buttonLink="/tours"
        bgColor="bg-secondary"
      />
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
