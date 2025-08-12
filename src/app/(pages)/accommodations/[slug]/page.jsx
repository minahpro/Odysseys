"use client";

import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import { SingleHeader, Title } from "@/components/texties";
import Link from "next/link";
import { MapPin, Phone, Globe, CheckCircle, Clock } from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import ImagesSingle from "@/components/ImagesSingle";
import { TourCardPro } from "@/components/cards";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { ActionButton } from "@/components/buttons";
import {
  SideBanner2,
  SideBanner3,
  SideBanner4,
} from "@/components/banners/SidebarBanners";
import { MdLocationOn } from "react-icons/md";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import Image from "next/image";

function Page() {
  // Capitalized for consistency
  const params = useParams();
  const slug = params.slug;
  const [activeTab, setActiveTab] = useState("overview");
  const { fetchedDestinations, fetchedAccommodations, isLoading } =
    useAppContext();
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // ********** FETCH DATA **********
  const { allFetchedTours } = useAppContext();
  const { data: accommodationTypes, isLoading: isFetchingAccommodationTypes } =
    useFetchAll("accommodation-categories");
  const {
    data: accommodationStandards,
    isLoading: isFetchingAccommodationStandards,
  } = useFetchAll("accommodation-standards");
  const { data: tourGroupCategories } = useFetchAll("tour-categories");

  // ********** FETCH ACCOMMODATION **********
  const accommodation = fetchedAccommodations?.find(
    (acc) => acc?.slug === slug
  );

  // ********** GET DEST,CATEGORY AND LEVEL TITLES **********
  const findIt = ({ data, id }) => {
    const zbrTag = data?.find((itm) => itm?.id === id);
    return zbrTag?.title;
  };
  // dest
  const getDestination = (id) => {
    const destination = fetchedDestinations?.find((item) => item.id === id);
    return destination?.name;
  };

  // ********** RENDER **********
  // Add null check for accommodation before spreading
  const accommodationData = accommodation
    ? {
        ...accommodation,
        category: findIt({
          data: accommodationTypes || [], // Add null check
          id: accommodation?.category,
        }),
        level: findIt({
          data: accommodationStandards || [], // Add null check
          id: accommodation?.level,
        }),
        destination: getDestination(accommodation?.destinationId),
      }
    : null;

  // ******** FIND ALL TOURS HAVING THIS ACCOMMODATION ********

  const allFetchedAccTours = allFetchedTours
    ?.filter((itm) =>
      itm?.itinerary?.find(
        (it) => it?.accommodationId === accommodationData?.id
      )
    )
    .map((tour) => {
      return {
        ...tour,
        category: findIt({
          data: tourGroupCategories || [],
          id: tour?.category,
        }),
        prices: tour?.price?.foreigner?.adult?.highSeason,
      };
    });

  return (
    <>
      {" "}
      {isGalleryModalOpen && (
        <ImagePreviewPopUp
          images={accommodationData?.photos}
          title={accommodationData?.name}
          handleClose={() => setIsGalleryModalOpen(false)}
          handleOpen={() => setIsGalleryModalOpen(true)}
        />
      )}
      {isLoading ||
      isFetchingAccommodationTypes ||
      isFetchingAccommodationStandards ? (
        <main className="respons">
          <SingleDetailsLoading />
        </main>
      ) : accommodationData?.id ? (
        <>
          <SingleHeader
            image={accommodationData?.photos?.[0]}
            title={accommodationData?.name}
            desc={`Location: ${accommodationData?.destination}`}
            OnClick={() => {
              window.open(accommodationData?.website, "_blank");
            }}
            buttonText={"Visit Website"}
          />
          <main className="respons lg:py-20 py-10">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-jua text-white font-bold">
                    Overview
                  </h2>
                  <div
                    data-aos="fade-right"
                    className="text-textcolor sm:p-6 p-3 rounded-xl bg-highlight/30 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: accommodationData?.overview,
                    }}
                  ></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-jua text-white font-bold">
                    Gallery
                  </h3>

                  <div
                    data-aos="fade-right"
                    className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
                  >
                    {accommodationData?.photos?.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setIsGalleryModalOpen(true);
                        }}
                        className="relative h-40 cursor-pointer rounded-xl overflow-hidden"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={"image.alt"}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-jua text-white font-bold">
                    Amenities & Facilities
                  </h2>
                  <div
                    data-aos="fade-right"
                    className="flex items-center flex-wrap gap-4 p-6 rounded-xl bg-highlight/30 leading-relaxed"
                  >
                    {accommodationData?.facilities?.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 hover:bg-highlight/50 transitions group p-3 bg-highlight rounded-xl"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-white/60 text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <div
                  data-aos="fade-left"
                  className="bg-highlight/50 rounded-xl border p-6 border-gray-900"
                >
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Quick Info
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Category:</span>
                      <span className="text-white text-sm font-semibold">
                        {accommodationData?.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Where</span>
                      <span className="text-white text-sm font-semibold">
                        {accommodationData?.inPark ? "In Park" : "Out of Park"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Location:</span>
                      <span className="text-white text-sm font-semibold">
                        {accommodationData?.destination}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Standard:</span>
                      <span className="text-white text-sm font-semibold">
                        {accommodationData?.standard}
                      </span>
                    </div>

                    <SecondaryButton
                      onClick={() => {
                        window.location.href = `tel:${accommodationData?.contacts}`;
                      }}
                      className="w-full"
                    >
                      Call {accommodationData?.contacts}
                    </SecondaryButton>
                  </div>
                </div>
                <SideBanner2
                  title={"Looking for a  safari Tour?"}
                  sub={"Explore our safari tours and Best offer now"}
                  linkText={"View Tours"}
                  link={"/tours"}
                />

                <div
                  data-aos="fade-left"
                  className="bg-highlight/50 rounded-xl border p-6 border-gray-900"
                >
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Activities
                  </h3>

                  <ul className="space-y-1">
                    {accommodationData?.activities?.map((effort, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <CheckCircle className="h-3 w-3 text-secondary flex-shrink-0" />
                        {effort}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* map */}
                <div
                  data-aos="fade-left"
                  className="bg-highlight/50 rounded-xl border p-6 border-gray-900"
                >
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Direction
                  </h3>
                  <div className="h-40 bg-highlight rounded-xl flex-all">
                    {accommodationData?.mapLink ? (
                      <iframe
                        src={accommodationData?.mapLink}
                        className="w-full h-full rounded-xl"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <p className="text-textcolor/70">Map not available</p>
                    )}
                  </div>
                </div>
                <SideBanner4
                  title="Visitor Tips"
                  sub="Bring binoculars for bird watching, Early morning and late afternoon game drives are best, Pack layers as temperatures vary throughout the day"
                  link="/plan-your-safari"
                  image={"/images/header.jpeg"}
                  Icon={Clock}
                  smallSub="View"
                />
              </div>
            </div>
            <div className="sm:pt-28 pt-10">
              {/* Available Tours */}
              {allFetchedAccTours?.length > 0 && (
                <div>
                  <Title
                    title={`${accommodationData?.name} Tours`}
                    badge={"🚗 Tours"}
                    subHeading={
                      "We partner with the finest lodges, camps, and resorts across Tanzania to ensure your comfort and an unforgettable stay."
                    }
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allFetchedAccTours?.map((tour, index) => (
                      <TourCardPro key={index} tour={tour} />
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <Link href={"/tours"}>
                      {" "}
                      <SecondaryButton>
                        View All Available Tours
                      </SecondaryButton>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        <NoDataFound text={"Accommodation not found"} />
      )}
    </>
  );
}

export default Page;
