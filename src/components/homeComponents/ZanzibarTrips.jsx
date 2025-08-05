"use client";
import React from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { ZanzibarCardPro } from "../cards";
import { NoDataFound } from "../Loadings/ErrorComp";
import { TourLoading } from "../Loadings/LoadingComp";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { findItTitle } from "../Functions";

function ZanzibarTripsHome() {
  const { allFetchedDayTrips, isLoading } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTags } =
    useFetchAll("tour-tags");
  // ************* fetch Zanzibar trips *************
  const finalZanzibarTrips = allFetchedDayTrips
    ?.filter((trip) =>
      trip.tags.includes(findItTitle({ data: tourTags, title: "zanzibar" }))
    )
    .map((trip) => {
      return {
        ...trip,
        prices: trip?.price?.foreigner || 0,
      };
    });

  return (
    <section className="sm:py-28 py-10">
      <div className="respons">
        <Title
          badge={"🏝️ Spice Island Paradise"}
          title={"Zanzibar Escapes"}
          subHeading={
            "Escape to the exotic spice island of Zanzibar. From pristine beaches to rich cultural heritage, discover the perfect tropical getaway."
          }
        />
        <div className="mt-12 relative">
          {
            // loading
            isLoading || isFetchingTags ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : finalZanzibarTrips?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {finalZanzibarTrips?.slice(0, 4).map((tour, index) => (
                  <ZanzibarCardPro key={index} tour={tour} home={true} />
                ))}
              </div>
            ) : (
              <NoDataFound text={"No Zanzibar Trips Found"} />
            )
          }
        </div>
      </div>
    </section>
  );
}

export default ZanzibarTripsHome;
