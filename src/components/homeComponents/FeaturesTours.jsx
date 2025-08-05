"use client";
import React from "react";
import { Title } from "../texties";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { TourCardPro } from "../cards";
import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";
import { Dog, MapPin } from "lucide-react";

function FeaturesTours() {
  // ************* FETCH DATA ************* //
  const { data: tourGroupCategories, isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { allFetchedTours, isLoading } = useAppContext();

  // ****************** GET FEATURED TOURS ******************* //
  const tours = allFetchedTours?.filter((item) => item?.isFeatured);
  return (
    <section className="sm:py-28 py-10">
      <div className="respons">
        <Title
          badge={<Dog />}
          title={"Featured Tours"}
          subHeading={
            "Handpicked adventures that showcase the very best of Tanzania's natural wonders and cultural heritage"
          }
        />
        {
          // loading
          isLoading || isFetchingTourCategories ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <TourLoading key={i} />
              ))}
            </div>
          ) : tours?.length > 0 ? (
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours?.slice(0, 6)?.map((tour, index) => (
                <div
                  className="w-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  key={index}
                >
                  <TourCardPro
                    home={true}
                    tour={{
                      ...tour,
                      prices: tour?.price?.foreigner?.adult?.highSeason,
                      category: tourGroupCategories?.find(
                        (cat) => cat?.id === tour?.category
                      )?.title, // get category title
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoDataFound text="No Tours Found" />
          )
        }
      </div>
    </section>
  );
}

export default FeaturesTours;
