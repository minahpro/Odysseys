"use client";
import React from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { DestinationLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";
import { DestinationCardProHome } from "../cards";
import { MapPin } from "lucide-react";
import { demoDataBase } from "@/data/Demo-database";

function FeaturesDestinations() {
  // const { allFetchedTours, fetchedDestinations, isLoading } = useAppContext();

  // // ****************** GET FEATURED DESTINATIONS ******************* //
  // const destinations = fetchedDestinations?.filter((item) => item?.isFeatured);

  // // ********** GET TOUR AMOUNT FOR EACH DEST ************
  // const getTourAmount = (id) => {
  //   const tourAmount = allFetchedTours?.filter((itm) =>
  //     itm?.itinerary?.find((it) => it?.destinationId === id)
  //   );
  //   return tourAmount?.length;
  // };
  return (
    <section className="sm:py-28 bg-accent/40 py-10">
      <div className="respons">
        <Title
          badge={<MapPin />}
          title={"Our Iconic Destinations"}
          subHeading={
            "We operate in 8 African countries, with 60+ camps promising exclusive, private wild game viewing, unrivalled style, and local culture."
          }
        />
        {/* {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <DestinationLoading key={i} />
            ))}
          </div>
        ) : destinations?.length > 0 ? ( */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoDataBase?.mainDestinations?.slice(0, 6)?.map((item, index) => (
            <div
              className="w-full"
              data-aos="fade-up"
              data-aos-delay={index * 200}
              key={index}
            >
              <DestinationCardProHome
                item={{
                  name: item?.title,
                  destinations: item?.subDestinations?.length + 2 * index,
                  image: `/images/bg/${index + 1}.png`,
                  slug: item?.id,
                }}
              />
            </div>
          ))}
        </div>
        {/* ) : (
          <NoDataFound text="No Destination Found" />
        )} */}
      </div>
    </section>
  );
}

export default FeaturesDestinations;
