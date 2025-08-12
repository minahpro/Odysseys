// pages/tours.js
"use client";

import { DayTripCardPro, TourCardPro } from "@/components/cards";
import { findItArray, findItTitle } from "@/components/Functions";
import { PageLoading, TourLoading } from "@/components/Loadings/LoadingComp";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { Calendar, Clock, Mountain } from "lucide-react";
import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import PaginationSet from "@/components/paginationSet";
import { routesData } from "@/data/randomData";
import PromoBanner from "@/components/banners/PromoBanner";

function Tours() {
  // ************* STATES *************
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
        sub={
          "Whether you dream of witnessing the Great Migration, conquering Kilimanjaro, or relaxing on Zanzibar's pristine beaches, our diverse range of packages caters to all interests and budgets."
        }
        link={{
          text: "All Questions & Answers",
          href: "/faqs",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Mountain />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            The Roof of Africa – Mount Kilimanjaro
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Rising majestically above the plains of Tanzania, Mount
              Kilimanjaro is the highest peak in Africa and one of the world’s
              most iconic trekking destinations. Its snow-capped summit,
              standing at 5,895 meters, draws adventurers from across the globe
              to experience its breathtaking beauty. Climbing Kilimanjaro is not
              just about reaching the top — it’s a journey through five unique
              climate zones, from lush rainforest to arctic summit. There are
              several routes to the peak, each offering a different perspective:
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="grid lg:grid-cols-4 mt-10 gap-6 md:grid-cols-2 grid-cols-1"
          >
            {routesData?.map((item, index) => (
              <div
                key={index}
                className="bg-white text-center p-8 flex-all flex-col border border-secondary/20 rounded-xl"
              >
                <div className="flex-all w-12 h-12 rounded-full flex-all bg-accent text-primary mb-4 text-xl font-black">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {item?.name}
                </h3>
                <p className="text-primary text-sm leading-6">
                  {item?.description}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full mt-20">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
              }}
              className="w-full"
            >
              <div className="pb-24">
                <TabsList className="grid w-full pb-24 sm:pb-0 max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2 gap-2 bg-transparent">
                  <TabsTrigger
                    value="long"
                    className="flex bg-highlight flex-col items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-accent data-[state=active]:shadow-lg transition-all duration-300 rounded-xl py-3"
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
                    className="flex bg-highlight flex-col items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-accent data-[state=active]:shadow-lg transition-all duration-300 rounded-xl py-3"
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
                  <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentPosts?.map((trek, index) => (
                      <DayTripCardPro
                        key={index}
                        tour={{
                          ...trek,
                          price: trek?.price?.foreigner || 0,
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
              {((activeTab === "long" &&
                trekkingTours?.length > postsPerPage) ||
                (activeTab === "short" &&
                  dayTrekkings?.length > postsPerPage)) && (
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
          </div>
        </div>
      </section>

      <PromoBanner
        title="Ready for the Ultimate Challenge?"
        subtitle="Proper preparation is key to summit success. Our comprehensive training program and expert guidance ensure you're ready for every step of the journey."
        imageSrc="/images/bg/21.png"
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
        bgColor="bg-accent"
        textColor={{
          title: "text-primary",
          sub: "text-primary",
          list: "text-primary",
          icon: "text-secondary",
        }}
      />
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
