// pages/tours.js
"use client";

import { DayTripCardPro, TourCardPro } from "@/components/cards";
import { findItArray, findItTitle } from "@/components/Functions";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import { PlainTitle, Title } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Mountain,
  TrendingUp,
} from "lucide-react";
import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import PaginationSet from "@/components/paginationSet";
import TrekkingBanner from "@/components/banners/TrekkingBanner";
import { routesData } from "@/data/randomData";

function Tours() {
  // ************* STATES *************
  const [selectedRoute, setSelectedRoute] = useState("Machame Route");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [activeTab, setActiveTab] = useState("long");

  // **************FETCH DATA ****************
  const {
    allFetchedTours,
    allFetchedDayTrips,
    fetchedDestinations,
    isLoading,
  } = useAppContext();
  const { data: tourCategory, isLoading: isFetchingTourCategory } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");
  const hkIdTours = findItTitle({ data: tourTypes, title: "hiking" });
  const hkIdDays = findItTitle({ data: tourTags, title: "oldonyo" });

  // *********** GET ALL TOURS AND CHOOSE FROM LONG DAYS OR SINGLE DAY *************
  const dayTrekkings = allFetchedDayTrips?.filter((tour) =>
    tour?.tags?.includes(hkIdDays)
  );
  const trekkingTours = allFetchedTours?.filter((tour) =>
    tour?.focus?.includes(hkIdTours)
  );

  // ************ PAGINATION VARIABLES *************

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts1 = trekkingTours?.slice(firstPostIndex, lastPostIndex);
  const currentPosts = dayTrekkings?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <TitleHeader
        first={"Mountain  "}
        last={"Trekking."}
        image={"/images/gallery/kili4.png"}
      />

      {/* Route Comparison */}
      <section className="sm:py-28 py-10 bg-highlight/40">
        <div className="respons">
          <Title
            title={"Choose Your Kilimanjaro Route"}
            badge={"Best Mountain Treks."}
            subHeading={
              " Each route offers a unique experience with different challenges, scenery, and success rates. Compare our routes to find the perfect match for your adventure level and preferences."
            }
          />

          {/* Route Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {routesData.map((route) => (
              <button
                key={route.name}
                onClick={() => setSelectedRoute(route.name)}
                className={`py-2 text-sm transitions px-6 rounded border ${selectedRoute === route.name ? "bg-primary border-secondary text-black hover:bg-secondary" : "border-gray-800 text-textcolor bg-highlight hover:text-primary"}`}
              >
                {route.name}
              </button>
            ))}
          </div>

          {/* Selected Route Details */}
          {routesData.map(
            (route) =>
              selectedRoute === route.name && (
                <div key={route.name} className="max-w-4xl mx-auto">
                  <div className="bg-black md:p-12 p-4 border border-gray-900 rounded-xl">
                    <h3 className="text-2xl font-jua font-bold text-white mb-2">
                      {route.name}
                    </h3>
                    <p className="text-textcolor">{route.description}</p>

                    <div className="grid md:grid-cols-2 my-8 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {route.pros.map((pro, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-textcolor"
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Considerations
                        </h4>
                        <ul className="space-y-2">
                          {route.cons.map((con, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-textcolor"
                            >
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-highlight/40 p-6 rounded-xl">
                      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 text-center">
                        <div>
                          <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                          <p className="mb-1 text-white font-semibold">
                            {route.duration}
                          </p>
                          <p className="text-sm text-textcolor">Duration</p>
                        </div>
                        <div>
                          <Mountain className="w-6 h-6 text-primary mx-auto mb-3" />
                          <p className="mb-1 text-white font-semibold">
                            {route.difficulty}
                          </p>
                          <p className="text-sm text-textcolor">Difficulty</p>
                        </div>
                        <div>
                          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-3" />
                          <p className="mb-1 text-white font-semibold">
                            {route.successRate}
                          </p>
                          <p className="text-sm text-textcolor">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      <section className="respons sm:py-28 py-10">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1);
          }}
          className="w-full"
        >
          <div className="pb-24">
            <div className="text-center mb-10 space-y-4">
              <PlainTitle
                first={"Conquer Tanzania's "}
                last={"Majestic Peaks."}
              />
              <p className="text-textcolor max-w-3xl mx-auto">
                From challenging multi-day expeditions to refreshing day hikes,
                discover the perfect mountain adventure that matches your spirit
                and skill level.
              </p>
            </div>

            <TabsList className="grid w-full pb-24 sm:pb-0 max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2 gap-2 bg-transparent">
              <TabsTrigger
                value="long"
                className="flex bg-highlight flex-col items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Multi-Day Treks</span>
                </div>
                <span className="text-xs opacity-75">
                  {isLoading
                    ? "Loading..."
                    : trekkingTours?.length + " Adventures"}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="short"
                className="flex bg-highlight flex-col items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-black data-[state=active]:shadow-lg transition-all duration-300 rounded-lg py-3"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Day Trips</span>
                </div>
                <span className="text-xs opacity-75">
                  {isLoading
                    ? "Loading..."
                    : dayTrekkings?.length + " Adventures"}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Long Trips Tab Content */}
          <TabsContent value="long">
            {isLoading ||
            isFetchingTourTags ||
            isFetchingTourCategory ||
            isFetchingTourTypes ? (
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : currentPosts1?.length > 0 ? (
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts1?.map((trek, index) => (
                  <TourCardPro
                    key={index}
                    tour={{
                      ...trek,
                      prices: trek?.price?.foreigner?.adult?.highSeason,
                      category: tourCategory?.find(
                        (cat) => cat?.id === trek?.category
                      )?.title,
                    }}
                  />
                ))}
              </div>
            ) : (
              <NoDataFound text="No Tours Found" />
            )}
          </TabsContent>

          {/* Short Trips Tab Content */}
          <TabsContent value="short" className="mt-0">
            {isLoading ||
            isFetchingTourTags ||
            isFetchingTourCategory ||
            isFetchingTourTypes ? (
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : currentPosts?.length > 0 ? (
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts?.map((trek, index) => (
                  <DayTripCardPro
                    key={index}
                    tour={{
                      ...trek,
                      prices: trek?.price?.foreigner || 0,
                      destinations: findItArray({
                        ids: trek?.destinations,
                        datas: fetchedDestinations,
                        dest: true, // destination has name not title
                      }),
                    }}
                  />
                ))}
              </div>
            ) : (
              <NoDataFound text="No Day Trip Found" />
            )}
          </TabsContent>

          {/* Pagination */}
          {((activeTab === "long" && trekkingTours?.length > postsPerPage) ||
            (activeTab === "short" && dayTrekkings?.length > postsPerPage)) && (
            <div className="mt-12">
              <PaginationSet
                totalPosts={
                  activeTab === "long"
                    ? trekkingTours?.length
                    : dayTrekkings?.length
                }
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </Tabs>
      </section>

      <TrekkingBanner />
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
