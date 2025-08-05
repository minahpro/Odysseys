"use client";
import React from "react";
import { Title } from "../texties";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { AccommodationCardPro } from "../cards";
import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";

function AccommodationsHome() {
  const { fetchedAccommodations, isLoading, fetchedDestinations } =
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

  // *********** Get fetured accommodations ************
  const featured = fetchedAccommodations?.filter((item) => item?.isFeatured);
  const nonFeatured = fetchedAccommodations?.filter(
    (item) => !item?.isFeatured
  );
  const feturedAcc = [...featured, ...nonFeatured];
  return (
    <section className="sm:py-28 py-10 bg-highlight/50">
      <div className="respons">
        <Title
          badge={"🏨 Where You'll Stay"}
          title={"Exceptional Accommodations"}
          subHeading={
            "We partner with the finest lodges, camps, and resorts across Tanzania to ensure your comfort and an unforgettable stay."
          }
        />
        {
          // loading
          isLoading ||
          isFetchingAccommodationTypes ||
          isFetchingAccommodationStandards ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <TourLoading key={i} />
              ))}
            </div>
          ) : feturedAcc?.length > 0 ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {feturedAcc?.slice(0, 3)?.map((item, index) => (
                <div
                  className="w-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  key={index}
                >
                  <AccommodationCardPro
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
                </div>
              ))}
            </div>
          ) : (
            <NoDataFound text="No Accommodation Found" />
          )
        }
      </div>
    </section>
  );
}

export default AccommodationsHome;
