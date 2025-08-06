"use client";
import React from "react";
import { Title } from "../texties";
import { useAppContext } from "@/context/AppContext";
import { TourLoading } from "../Loadings/LoadingComp";
import { NoDataFound } from "../Loadings/ErrorComp";
import { UsersRound } from "lucide-react";

function PatinersSection() {
  const { companyDetails, isLoading, didSucceed } = useAppContext();
  const stuff = didSucceed && companyDetails[0]?.staffs;

  return (
    <section className="sm:pb-28 pb-10 pt-10">
      <div className="respons">
        <Title
          badge={<UsersRound />}
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
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={team?.photo || "/placeholder.svg"}
                      alt={team?.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                      {team?.name}
                    </h3>
                    <p className="text-secondary/80 font-medium mb-3">
                      {team?.position}
                    </p>
                    <div className="w-12 h-1 bg-secondary mx-auto rounded-full"></div>
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
