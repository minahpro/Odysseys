"use client";
import React from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";

function PatinersSection() {
  const { companyDetails, isLoading, didSucceed } = useAppContext();
  const stuff = didSucceed && companyDetails[0]?.staffs;

  return (
    <section className="sm:pb-28 pb-10 pt-10">
      <div className="respons">
        <Title
          badge={"👥 Meet Our Team"}
          title={"People Behind Your Adventure"}
          subHeading={
            "Our passionate team of local experts, guides, and travel specialists are dedicated to making your Tanzanian adventure extraordinary."
          }
        />
        {
          // loading
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <TourLoading key={i} />
              ))}
            </div>
          ) : stuff?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stuff?.slice(0, 4)?.map((team, index) => (
                <div
                  key={index}
                  className="text-center border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={team?.photo || "/placeholder.svg"}
                      alt={team?.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{team?.name}</h3>
                      <p className="text-sm text-white/90">{team?.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoDataFound text="No Team Member Found" />
          )
        }
      </div>
    </section>
  );
}

export default PatinersSection;
