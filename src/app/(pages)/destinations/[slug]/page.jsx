"use client";

import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { SingleDetailsLoading } from "@/components/Loadings/LoadingComp";
import { SingleHeader, Title } from "@/components/texties";
import Link from "next/link";
import {
  MapPin,
  User,
  Camera,
  Send,
  Sun,
  Droplets,
  CheckCircle,
  AlertTriangle,
  Mail,
  BookCheck,
} from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import ImagesSingle from "@/components/ImagesSingle";
import { TourCardPro } from "@/components/cards";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { ActionButton } from "@/components/buttons";
import {
  SideBanner1,
  SideBanner2,
  SideBanner3,
  SideBanner4,
} from "@/components/banners/SidebarBanners";
import BookingPopup from "@/components/Popups/BookingPopup";
import { MdLocationOn } from "react-icons/md";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import Image from "next/image";
import MapComp from "@/components/MapComp";

function Page() {
  // Capitalized for consistency
  const params = useParams();
  const slug = params.slug;
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // ********** FETCH DATA *********
  const { data: destinationTypes, isLoading: isFetchingOptions } =
    useFetchAll("destination-types");
  const { data: tourGroupCategories, isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { fetchedDestinations, isLoading, allFetchedTours } = useAppContext();

  // ********** GET DEST,CATEGORY AND LEVEL TITLES **********
  const findIt = ({ data, id }) => {
    const zbrTag = data?.find((itm) => itm?.id === id);
    return zbrTag?.title;
  };

  // ********** GET DESTINATION DETAILS **********
  const destination = fetchedDestinations?.find((dest) => dest?.slug === slug);
  const relatedTours = allFetchedTours
    ?.filter((tour) => {
      return tour?.itinerary.find(
        (itn) => itn?.destinationId === destination?.id
      );
    })
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
      {open && (
        <BookingPopup
          handleOpen={open}
          handleClose={() => setOpen(false)}
          datas={{
            status: "destination",
            id: destination?.id,
            title: destination?.name,
            slug: destination?.slug,
          }}
        />
      )}
      {isGalleryModalOpen && (
        <ImagePreviewPopUp
          images={destination?.photos}
          title={destination?.name}
          handleClose={() => setIsGalleryModalOpen(false)}
          handleOpen={() => setIsGalleryModalOpen(true)}
        />
      )}
      {isLoading || isFetchingOptions || isFetchingTourCategories ? (
        <main className="respons">
          <SingleDetailsLoading />
        </main>
      ) : destination?.id ? (
        <>
          <SingleHeader
            image={destination?.photos?.[0]}
            title={destination?.name}
            desc={`Location: ${destination?.country}`}
            OnClick={() => {
              setOpen(true);
            }}
            buttonText={"Book Now"}
          />
          <main className="respons lg:py-20 py-10">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-start">
              <div className="lg:col-span-2  space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-jua text-white font-bold">
                    Overview
                  </h2>
                  <div
                    data-aos="fade-right"
                    className="text-textcolor sm:p-6 p-3 rounded-xl bg-highlight/30 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: destination?.overview,
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
                    {destination?.photos?.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setIsGalleryModalOpen(true);
                        }}
                        className="relative h-40 cursor-pointer rounded-lg overflow-hidden"
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
                {destination?.wildlife && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-jua text-white font-bold">
                      Wildlife
                    </h3>

                    <p
                      data-aos="fade-right"
                      className="text-textcolor p-6 rounded-xl bg-highlight/30 leading-relaxed"
                    >
                      {destination?.wildlife}
                    </p>
                  </div>
                )}
                {destination?.safariIdeas && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-jua text-white font-bold">
                      Safari Ideas
                    </h3>

                    <p
                      data-aos="fade-right"
                      className="text-textcolor p-6 rounded-xl bg-highlight/30 leading-relaxed"
                    >
                      {destination?.safariIdeas}
                    </p>
                  </div>
                )}
                {destination?.whenToVisit && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-jua text-white font-bold">
                      When to visit
                    </h3>

                    <p
                      data-aos="fade-right"
                      className="text-textcolor p-6 rounded-xl bg-highlight/30 leading-relaxed"
                    >
                      {destination?.whenToVisit}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-highlight/50 rounded-lg border p-6 border-gray-900">
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Quick Info
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Destination Type:</span>
                      <span className="text-white text-sm font-semibold">
                        {findIt({
                          data: destinationTypes || [],
                          id: destination?.type,
                        }) || "---"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textcolor">Location</span>
                      <span className="text-white text-sm font-semibold">
                        {destination?.country}
                      </span>
                    </div>

                    <SecondaryButton className="w-full">
                      Download Brochure
                    </SecondaryButton>
                  </div>
                </div>
                <SideBanner2
                  title={"Why Visit?"}
                  sub={
                    "Best Price Guarantee, Free Cancellation, 24/7 Customer Support, Instant Confirmation"
                  }
                  link={"/contact"}
                  linkText={"Contact Us"}
                />
                {/* map */}
                <div className="bg-highlight/50 relative rounded-lg border p-6 border-gray-900">
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Direction
                  </h3>
                  <div className="w-full h-64 bg-highlight rounded-lg flex items-center justify-center">
                    <MapComp idsData={[destination?.id]} single={true} />
                  </div>
                </div>

                <div className="bg-highlight/50 rounded-lg border p-6 border-gray-900">
                  <h3 className="text-lg mb-5 font-jua font-bold text-white">
                    Activities
                  </h3>

                  <ul className="space-y-1">
                    {destination?.activities?.map((effort, index) => (
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
                <SideBanner3
                  title={"Ready to Experience"}
                  sub={
                    "Let our expert guides create a personalized safari experience that showcases the best of this incredible destination."
                  }
                  link={"/contact"}
                  linkText={"Book Now"}
                  Icon={BookCheck}
                />
              </div>
            </div>
            <div className="sm:pt-28 pt-10">
              {/* Available Tours */}
              {relatedTours?.length > 0 && (
                <div>
                  <Title
                    title={`${destination?.name} Tours`}
                    badge={"🚗 Tours"}
                    subHeading={
                      "We partner with the finest lodges, camps, and resorts across Tanzania to ensure your comfort and an unforgettable stay."
                    }
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedTours?.map((tour, index) => (
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
        <NoDataFound text={"Destination not found"} />
      )}
    </>
  );
}

export default Page;
