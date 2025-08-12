"use client";

import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import { SingleHeader } from "@/components/texties";
import { Bed, Sun } from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import ImagesSingle from "@/components/ImagesSingle";
import { useState } from "react";
import { PrimaryButton } from "@/components/buttons";
import {
  SideBanner1,
  SideBanner2,
  SideBanner3,
  SideBanner4,
} from "@/components/banners/SidebarBanners";
import MapComp from "@/components/MapComp";
import { policiesTour } from "@/data/randomData";
import BookingPopup from "@/components/Popups/BookingPopup";
import { MdLocationOn } from "react-icons/md";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";

function Page() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  // ************ FETCH DATAS ******************
  const params = useParams();
  const slug = params.slug;
  const { allFetchedDayTrips, fetchedDestinations, isLoading } =
    useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");

  // ********** GET TOUR **********
  const tourDetails = allFetchedDayTrips?.find((acc) => acc?.slug === slug);

  // ********** GET DEST AND TAGS TITLES **********
  const findItArray = ({ ids, datas, dest }) => {
    return ids?.map((id) => {
      const data = datas?.find((item) => item.id === id);
      return dest ? data?.name : data?.title;
    });
  };

  // ********** EXTRACT TOUR DATA **********
  const tour = {
    ...tourDetails,
    tags: findItArray({
      ids: tourDetails?.tags,
      datas: tourTags,
      dest: false,
    }),
    destinations: findItArray({
      ids: tourDetails?.destinations,
      datas: fetchedDestinations,
      dest: true, // destination has name not title
    }),
    price: tourDetails?.price?.foreigner,
  };

  return (
    <>
      {open && (
        <BookingPopup
          handleOpen={open}
          handleClose={() => setOpen(false)}
          datas={{
            status: "day-trip",
            id: tour?.id,
            title: tour?.title,
            slug: tour?.slug,
          }}
        />
      )}

      {isLoading || isFetchingTourTags ? (
        <main className="respons">
          <SingleDetailsLoading />
        </main>
      ) : tour?.id ? (
        <>
          <SingleHeader
            image={tour?.photos?.[0]}
            title={tour?.title}
            desc={`Category: ${tour?.category || "---"} Tour`}
            OnClick={() => {
              setOpen(true);
            }}
            buttonText={"Book Now"}
          />
          <main className="respons lg:py-20 py-10">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tabs */}
                <div
                  data-aos="fade-right"
                  className="bg-highlight/30 p-4 rounded-xl shadow-sm"
                >
                  <div className="bg-highlight rounded">
                    <nav className="flex gap-2 justify-around overflow-x-auto">
                      {[
                        { id: "overview", label: "Overview" },
                        { id: "gallery", label: "Gallery" },
                        { id: "included", label: "What's Included" },
                        { id: "map", label: "Map & Route" },
                        { id: "policies", label: "Cancellation Policy" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                            activeTab === tab.id
                              ? "border-primary text-primary"
                              : "border-transparent text-textcolor/60 hover:text-textcolor"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4">
                            Tour Overview
                          </h3>
                          <div
                            className="text-textcolor leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: tour?.overview,
                            }}
                          ></div>
                        </div>

                        <div className="bg-highlight/30 rounded-xl p-4 border border-primary/5">
                          <h4 className="font-semibold text-white mb-2">
                            Destination you will visit
                          </h4>
                          <ul className="text-sm text-textcolor space-y-1 capitalize list-disc list-inside">
                            {tour?.destinations?.map((include, index) => (
                              <li key={index}>{include}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {tour?.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-highlight text-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* gallery tab */}
                    {activeTab === "gallery" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white sm:text-xl">
                          Tour Gallery
                        </h3>
                        <p className="text-xs italic text-gray-400">
                          Click on the images to enlarge photos gallery
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
                          {tour?.photos.map((photo, index) => (
                            <img
                              onClick={() => setIsGalleryModalOpen(true)}
                              key={index}
                              src={photo}
                              alt={`Tour Gallery ${index + 1}`}
                              className="w-full bg-highlight h-40 cursor-pointer object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Included Tab */}
                    {activeTab === "included" && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-green-600">
                              What's Included
                            </h3>
                            <ul className="space-y-2">
                              {tour?.included?.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-textcolor">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-4 text-red-600">
                              What's Not Included
                            </h3>
                            <ul className="space-y-2">
                              {tour?.excluded?.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-textcolor">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Map Tab */}
                    {activeTab === "map" && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">
                          Location & Map
                        </h3>
                        <div className="h-96 bg-highlight rounded-xl flex items-center justify-center mb-4">
                          <MapComp
                            idsData={tourDetails?.destinations}
                            single={false}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">
                            Tour Route
                          </h4>
                          <div className="flex items-center flex-wrap gap-3">
                            {tour?.destinations?.map((day, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm p-2 bg-highlight rounded-full"
                              >
                                <div className="w-6 h-6 bg-primary capitalize text-black rounded-full flex items-center justify-center text-sm">
                                  {String.fromCharCode(97 + index)}
                                </div>
                                <span className="text-textcolor">{day}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancellation Policy Tab */}
                    {activeTab === "policies" && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">
                          Cancellation & Refund Policy
                        </h3>
                        <div className="bg-primary/5 rounded-xl p-6">
                          <ul className="space-y-3">
                            {policiesTour?.map((policy, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-textcolor">{policy}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 p-4 bg-primary rounded-xl ">
                            <p className="text-sm font-bold text-black">
                              All cancellations must be made in writing. Refunds
                              will be processed within 14 business days.
                            </p>
                          </div>
                        </div>

                        <div className="bg-highlight rounded-xl p-4 border border-highlight">
                          <h4 className="font-semibold text-white mb-2">
                            Important Notes
                          </h4>
                          <ul className="text-sm text-textcolor space-y-1">
                            <li>
                              • Weather conditions may affect tour schedules
                            </li>
                            <li>
                              • Park closures or restrictions may require
                              itinerary changes
                            </li>
                            <li>• Travel insurance is strongly recommended</li>
                            <li>
                              • Medical conditions should be disclosed at
                              booking
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Hotel Info Card */}

                  <div
                    data-aos="fade-left"
                    className="bg-primary/20 rounded-xl p-6 border border-primary/30"
                  >
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-primary">
                          ${tour?.price}
                        </span>
                        <span className="text-lg text-textcolor">USD</span>
                      </div>
                      <p className="text-sm text-textcolor/80">per person</p>
                    </div>

                    <div className="space-y-4 mb-6 capitalize">
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-textcolor">Category:</p>
                        <p className="font-medium text-white capitalize">
                          {tour?.category || "---"} tour
                        </p>
                      </div>

                      <PrimaryButton
                        onClick={() => setOpen(true)}
                        className="w-full"
                      >
                        Book Now
                      </PrimaryButton>
                    </div>
                  </div>
                  <SideBanner1
                    title="Luxury Safari Experiences"
                    sub="Immerse yourself in unparalleled comfort while surrounded by the raw beauty of African wilderness."
                    link="/accommodations"
                    linkText="Where To Stay"
                    smallSub="1 Night"
                  />
                </div>
              </div>
            </div>
          </main>

          <DayTripsHome />
        </>
      ) : (
        <NoDataFound text={"tour not found"} />
      )}
    </>
  );
}

export default Page;
