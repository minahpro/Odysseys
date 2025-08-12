"use client";

import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ExternalLink,
  Bed,
  Users,
  Star,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  Mountain,
} from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import ImagesSingle from "@/components/ImagesSingle";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
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
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";

function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [open, setOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  // ************ FETCH DATAS ******************
  const params = useParams();
  const slug = params.slug;
  const {
    allFetchedTours,
    isLoading,
    setIsInAdvancedCustomization,
    setCustomizeTour,
    companyDetails,
    didSucceed,
  } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");
  const { data: tourStandards, isLoading: isFetchingTourStandards } =
    useFetchAll("tour-standards");
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");

  // ********** GET TOUR **********
  const tourDetails = allFetchedTours?.find((acc) => acc?.slug === slug);

  // ********** GET STANDARD AND CATEGORY TITLES **********
  const findItId = ({ data, id }) => {
    const findIts = data?.find((itm) => itm?.id === id);
    return findIts?.title;
  };
  // ********** GET FOCUS AND TAGS TITLES **********
  const findItArray = ({ ids, datas }) => {
    return ids?.map((id) => {
      const data = datas?.find((item) => item.id === id);
      return data?.title;
    });
  };
  // ********** EXTRACT TOUR DATA **********
  const tour = {
    ...tourDetails,
    category: findItId({
      data: tourCategories,
      id: tourDetails?.category,
    }),
    tags: findItArray({
      ids: tourDetails?.tags,
      datas: tourTags,
    }),
    focus: findItArray({
      ids: tourDetails?.focus,
      datas: tourTypes,
    }),
    standard: findItId({
      data: tourStandards,
      id: tourDetails?.standard,
    }),
    price: tourDetails?.price?.foreigner?.adult?.highSeason,
  };

  // ************* GET DEST FROM TOUR ITINERARY AND REMOVE DUPLICATES *************
  const destinations =
    Array.from(
      new Set(
        tour?.itinerary
          ?.filter((item) => item?.destination?.name) // Filter out any undefined names
          ?.map((item) => item?.destination?.name)
      )
    ) || [];
  // ***************** CUSTOMIZE TOUR ******************** //
  const handleCustomizeTour = () => {
    setCustomizeTour(tour);
    setIsInAdvancedCustomization(true);

    router.push("/plan-your-safari", {
      scroll: false,
    });
  };

  // Get company details
  const CompDetails = didSucceed && companyDetails[0];
  const socialMediaData = didSucceed && companyDetails[0]?.socialMedia;

  return (
    <>
      {open && (
        <BookingPopup
          handleOpen={open}
          handleClose={() => setOpen(false)}
          datas={{
            status: "single-tour",
            id: tour?.id,
            title: tour?.title,
            slug: tour?.slug,
          }}
        />
      )}

      {isGalleryModalOpen && (
        <ImagePreviewPopUp
          images={tour?.photos}
          title={"Tour"}
          handleClose={() => setIsGalleryModalOpen(false)}
          handleOpen={() => setIsGalleryModalOpen(true)}
        />
      )}

      {isLoading ||
      isFetchingTourTags ||
      isFetchingTourStandards ||
      isFetchingTourCategories ||
      isFetchingTourTypes ? (
        <main className="respons">
          <SingleDetailsLoading />
        </main>
      ) : tour?.id ? (
        <>
          {/* Hero Section */}
          <section className="md:py-20 py-10 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <img
                src={
                  tour.photos[0] ||
                  "/placeholder.svg?height=400&width=600&query=safari"
                }
                alt={tour?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="respons relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {tour?.tags?.slice(0, 2).map((tag, index) => (
                      <div
                        key={index}
                        variant="outline"
                        className="border-gray-600 rounded-full py-1 px-4 border text-gray-200 text-xs"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl sm:mb-6 lg:text-4xl xl:text-5xl">
                    {tour?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-white" />
                      <span>
                        {tour?.duration} Day / {tour?.duration - 1} Night
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-white" />
                      <span>{tour?.standard} tour</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCustomizeTour}
                    className="px-8 text-sm py-3 hover:bg-white/80 hover:text-black bg-white/10 border border-primary/30 backdrop-blur-sm transitions text-primary font-bold rounded-xl"
                  >
                    Customize This Tour
                  </button>
                </div>

                {/* Booking Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
                    {/* Price */}
                    <div className="mb-6 text-center">
                      <div className="mb-2 text-3xl font-black text-primary sm:text-4xl">
                        ${tour?.price}
                      </div>
                      <div className="text-gray-400">per person</div>
                    </div>

                    {/* Details */}
                    <div className="mb-6 space-y-3 sm:space-y-4">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">
                          {tour?.duration} days
                        </span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-400">Standard:</span>
                        <span className="text-white capitalize">
                          {tour?.standard || "---"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white capitalize">
                          {tour?.category || "---"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-400">Nights:</span>
                        <span className="text-white">{tour?.duration - 1}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <PrimaryButton
                      onClick={() => setOpen(true)}
                      className="mb-4 w-full"
                    >
                      Book Now
                    </PrimaryButton>

                    {/* Contact Info */}
                    <div className="space-y-2 text-center">
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                          <a
                            href={`tel:${
                              CompDetails?.phoneNumbers?.length > 0
                                ? CompDetails?.phoneNumbers[0]
                                : "+255 123 456 789"
                            }`}
                            className="transition-colors hover:text-primary"
                          >
                            {isLoading
                              ? "Loading..."
                              : CompDetails?.phoneNumbers?.length > 0
                                ? CompDetails?.phoneNumbers[0]
                                : "+255 123 456 789"}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                          <a
                            href={`mailto:${
                              CompDetails?.emails?.length > 0
                                ? CompDetails?.emails[0]
                                : "info@Wild Odysseystanzania.com"
                            }`}
                            className="transition-colors hover:text-primary"
                          >
                            {isLoading
                              ? "Loading..."
                              : CompDetails?.emails?.length > 0
                                ? CompDetails?.emails[0]
                                : "info@Wild Odysseystanzania.com"}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 sm:text-sm">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          <a
                            href={socialMediaData?.whatsapp || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary"
                          >
                            WhatsApp Support
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                        { id: "itinerary", label: "Itinerary" },
                        { id: "gallery", label: "Gallery" },
                        { id: "included", label: "What's Included" },
                        { id: "map", label: "Map & Route" },
                        { id: "policies", label: "Cancellation Policy" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={` py-4 font-medium text-sm border-b-2 transition-colors ${
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

                        <div>
                          <h3 className="text-xl font-bold text-white mb-4">
                            Destination you will visit
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {destinations?.map((dest, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-textcolor">{dest}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-highlight/30 rounded-xl p-4 border border-primary/5">
                          <h4 className="font-semibold text-white mb-2">
                            Tour Type
                          </h4>
                          <ul className="text-sm text-textcolor space-y-1 capitalize list-disc list-inside">
                            {tour?.focus?.map((include, index) => (
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

                    {/* Itinerary Tab */}
                    {activeTab === "itinerary" && (
                      <div className="space-y-6">
                        {tour?.itinerary.map((day, index) => (
                          <div
                            key={index}
                            className="bg-highlight/50 p-4 border-highlight border relative"
                          >
                            <h4 className="font-bold text-black px-4 py-2.5 rounded bg-secondary mb-2">
                              {day.title}
                            </h4>
                            <p className="text-textcolor text-[15px] leading-relaxed mb-6">
                              {day.description}
                            </p>
                            {/* activities */}
                            <div className="space-y-3 mb-6">
                              <h5 className="font-semibold text-white">
                                Destination Activities
                              </h5>
                              <div className="text-sm text-textcolor flex items-center flex-wrap gap-2 capitalize">
                                {day?.destination?.activities?.map(
                                  (activity, index) => (
                                    <span
                                      className="py-1 px-4 border border-primary/10 rounded-full bg-primary/5 text-sm"
                                      key={index}
                                    >
                                      {activity}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Destination and Accommodation Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                              {day?.destination && (
                                <div className="p-3">
                                  <h5 className="font-semibold text-white mb-2">
                                    Destination
                                  </h5>
                                  <div className="flex items-center justify-between text-sm">
                                    <div>
                                      <p className="font-medium text-textcolor">
                                        {day.destination.name}
                                      </p>
                                      <p className=" text-textcolor/70 ">
                                        {day.destination.country}
                                      </p>
                                    </div>

                                    <Link
                                      href={`/destinations/${day.destination.slug}`}
                                      className="text-primary hover:text-secondary"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </Link>
                                  </div>
                                </div>
                              )}

                              {day.accommodation && (
                                <div className="p-3">
                                  <h5 className="font-semibold text-white mb-2">
                                    Accommodation
                                  </h5>
                                  <div className="flex items-center justify-between text-sm">
                                    <div>
                                      <p className="font-medium text-textcolor">
                                        {day.accommodation.name}
                                      </p>
                                      <p className="text-textcolor/70">
                                        {day.accommodation.inPark
                                          ? "In Park"
                                          : "Out of Park"}
                                      </p>
                                    </div>

                                    <Link
                                      href={`/accommodations/${day.accommodation.slug}`}
                                      className="text-primary hover:text-secondary"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
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
                            idsData={[
                              ...tour?.itinerary?.map(
                                (iter) => iter?.destinationId
                              ),
                            ]}
                            single={false}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">
                            Tour Route
                          </h4>
                          <div className="flex items-center flex-wrap gap-3">
                            {tour?.itinerary.map((day, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm p-2 bg-highlight rounded-full"
                              >
                                <div className="w-6 h-6 bg-primary capitalize text-black rounded-full flex items-center justify-center text-sm">
                                  {/* arrange by a,b,c */}
                                  {String.fromCharCode(97 + index)}
                                </div>
                                <span className="text-textcolor">
                                  {day.destination.name}
                                </span>
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

                  <SideBanner1
                    title="Where You'll Stay"
                    sub="Experience luxury lodges and tented camps in the heart of African wilderness"
                    link={`/accommodations`}
                    linkText="View All"
                    smallSub="Camps"
                  />
                  <SideBanner2
                    title="Aromatic Adventures"
                    sub="Journey through fragrant plantations where cloves, cinnamon, and cardamom have grown for centuries."
                    link="/tours/zanzibar-trips"
                    linkText="Zanzibar Trips"
                  />
                  <SideBanner4
                    title="Trekking Challenge"
                    sub="Experience diverse ecosystems, from tropical rainforest to arctic summit conditions."
                    link="/tours/trekking-trips"
                    image={"/images/gallery/kili3.png"}
                    Icon={Mountain}
                    smallSub="View"
                  />
                </div>
              </div>
            </div>
          </main>

          <div className="bg-highlight/20">
            <FeaturesTours />
          </div>
        </>
      ) : (
        <NoDataFound text={"tour not found"} />
      )}
    </>
  );
}

export default Page;
