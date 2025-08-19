"use client";

import PromoBanner from "@/components/banners/PromoBanner";
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
import { demoDataBase } from "@/data/Demo-database";
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
        sub="At
              Wild Odysseys, we guide you beyond the ordinary, curating journeys
              that connect you to Africa’s most iconic landscapes, wildlife, and
              cultures. "
        link={{
          text: "Explore Experiances",
          href: "/experiences",
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
            Destinations That Inspire
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              From the sweeping plains of the Serengeti to the misty peaks of
              Rwanda, and from the sun-drenched beaches of Zanzibar to the vast
              deserts of Namibia — every destination tells its own story.
              Whether you dream of thrilling safaris, tranquil escapes, or
              cultural encounters, our destinations promise experiences you’ll
              treasure forever.
            </p>
          </div>
          <div className="w-full mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {demoDataBase?.mainDestinations?.map((item, index) => (
                <DestinationCardProHome
                  key={index}
                  item={{
                    name: item?.title,
                    destinations: item?.subDestinations?.length + 2 * index,
                    image: `/images/bg/${index + 1}.png`,
                    slug: item?.id,
                    slogan: item?.slogan,
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            <PaginationSet
              totalPosts={6}
              postsPerPage={3}
              setCurrentPage={() => {}}
              currentPage={1}
            />
          </div>
        </div>
      </section>
      <div className="border-b border-primary/90">
        <PromoBanner
          title="The original Wilderness"
          subtitle="From Wilderness’ birthplace in diverse Botswana, home of the phenomenal Okavango Delta, to the dense forests and great apes of Rwanda, or the ancient, intriguing desert landscapes of Namibia, let’s explore Africa’s wild spaces, together."
          imageSrc="/images/bg/27.png"
          contentList={[
            {
              icon: "Heart",
              text: "Cardiovascular and strength training program",
            },
            {
              icon: "Bag",
              text: "Complete packing list and rental options",
            },
            {
              icon: "Time",
              text: "12-week preparation schedule",
            },
            { icon: "FirstAidKit", text: "Expert guidance and support" },
          ]}
          buttonText="Book With Us Now"
          buttonLink="/contact"
          bgColor="bg-primary"
          textColor={{
            title: "text-accent",
            sub: "text-accent",
            list: "text-accent",
            icon: "text-accent",
            button:
              "bg-accent text-primary hover:bg-secondary hover:text-white",
          }}
        />
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
