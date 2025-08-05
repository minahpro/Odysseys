"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  PrimaryButton,
  SecondaryButton,
  TourButton,
  OutlineButton,
} from "./buttons";
import {
  Building,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Mountain,
  Sailboat,
  Share2,
  TreePine,
  Users,
  Star,
  ArrowRight,
  PawPrint,
  Dog,
} from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { LuHouse } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdAccessTime } from "react-icons/md";
import { IoPawSharp } from "react-icons/io5";

// CARDS I USE ON SITE
export const DestinationCardProHome = ({ item: destination }) => {
  const imgSrc = destination?.photos?.[0] ?? "/placeholder.svg";
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-highlight hover:shadow-xl transition-all duration-300 max-w-sm group">
      <div className="p-6">
        <div className="relative h-40 rounded-xl overflow-hidden mb-4">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={destination?.name}
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-20 group-hover:bottom-0 transition-[bottom] duration-500 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent flex-all pb-2">
            <Link href={`/destinations/${destination?.slug}`}>
              <SecondaryButton className="text-sm py-4">
                Explore Destination
              </SecondaryButton>
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-primary">
            {destination?.name}
          </h3>

          <div className="flex items-center gap-4 text-secondary text-sm">
            <div className="flex items-center gap-1">
              <IoPawSharp className="w-4 h-4" />
              <span className="font-quicksand">
                ({destination?.tourAmount || 0}) Tours Packages
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DestinationCardPro = ({ item: destination }) => {
  const imgSrc = destination?.photos?.[0] ?? "/placeholder.svg";

  return (
    <Link
      href={`/destinations/${destination?.slug}`}
      className="grid grid-cols-6 gap-6 hover:shadow-primary/40 shadow-md items-center py-3 px-3 bg-highlight/50 border border-gray-900 rounded-lg group transitions"
    >
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={destination?.name}
        width={80}
        height={80}
        className="rounded-xl bg-accent object-cover w-full sm:col-span-2 col-span-6 h-40"
      />
      <div className="space-y-2 sm:col-span-4 col-span-6 flex-wrap gap-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-white line-clamp-2">
            {destination?.name}
          </h3>
          <p className="text-sm text-gray-400">
            ({destination?.tourAmount}) Tours
          </p>
        </div>
        <PrimaryButton className="bg-primary/10 hover:text-black text-primary">
          See Details
        </PrimaryButton>
      </div>
    </Link>
  );
};

export const TourCardPro = ({ tour, index = 0 }) => {
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  // tour types
  const focus = tour?.focus
    ?.map((item) => tourTypes?.find((type) => type?.id === item))
    .map((type) => type?.title);

  return (
    <div
      key={tour.id}
      className=" bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.photos?.[0] || "/placeholder.svg"}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-primary mb-3">{tour.title}</h3>
        <div className="flex items-center justify-between text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{tour.duration} Days</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm"> {tour?.category || "---"} Tour</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-primary mb-2">Highlights:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {focus?.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <PrimaryButton className="flex-1 col-span-4 text-sm py-2">
            <Link href={`/tours/${tour?.slug}`}>Book Now</Link>
          </PrimaryButton>

          <SecondaryButton className="text-sm col-span-2 py-2 px-4">
            ${tour?.prices}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export const ZanzibarCardPro = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-4xl">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 md:h-auto flex-shrink-0">
          <Image
            src={tour?.photos[0] || "/placeholder.svg"}
            alt={tour?.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex-1">
          <div className=" mb-3">
            <div>
              <h3 className="font-bold text-primary mb-2">{tour?.title}</h3>
              <div className="flex items-center gap-1 text-secondary">
                <MapPin className="w-4 h-4" />
                <span className="font-quicksand text-sm">
                  {tour?.destinations
                    ?.slice(0, 1)
                    ?.map((dest) => dest)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: tour?.overview,
            }}
            className="font-quicksand text-primary text-sm line-clamp-2 mb-4 leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <PrimaryButton
              className={`${tour?.bg ? "bg-secondary text-white" : ""} py-4  text-sm`}
            >
              Book Now
            </PrimaryButton>
            <div className="text-right">
              <div className="font-bold text-primary text-xl">
                ${tour?.price || 0}
              </div>
              <div className="font-quicksand text-secondary text-xs">
                per person
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DayTripCardPro = ({ tour }) => {
  return (
    <Link
      href={`/tours/day-trips/${tour?.slug}`}
      className="relative overflow-hidden rounded-lg transitions group h-80 flex flex-col justify-end p-6 text-white shadow-md"
    >
      <Image
        src={tour?.photos[0] || "/placeholder.svg"}
        alt={tour?.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-75"
      />
      <div className="relative z-10 p-4 rounded bg-highlight/80">
        <h3 className="font-bold font-jua line-clamp-2">{tour.title}</h3>
        <button className="py-2 px-6 text-sm bg-secondary border border-primary text-black transitions rounded-full group-hover:bg-transparent group-hover:text-primary mt-3">
          <span className="font-bold">${tour.prices} /</span>{" "}
          <span className="font-extralight">Pp</span>
        </button>
      </div>
    </Link>
  );
};

export const AccommodationCardPro = ({ item: accommodation }) => {
  return (
    <div className="group bg-highlight/50 border border-highlight hover:shadow-2xl transitions overflow-hidden rounded-xl">
      <div className="relative overflow-hidden">
        <img
          src={accommodation?.photos?.length > 0 && accommodation?.photos[0]}
          alt={accommodation?.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute -bottom-4 left-0 right-0 top-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="w-full px-6 absolute -bottom-80 group-hover:bottom-4 transition-[bottom] duration-500">
          <div className="w-full p-6 bg-black/30 rounded backdrop-blur-lg space-y-4">
            <div className="flex items-center gap-2 text-white">
              <LuHouse className="h-4 w-4 text-primary" />
              <span className="text-sm capitalize">
                {accommodation?.category}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{accommodation?.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Building className="h-4 w-4 text-primary" />
              <span className="text-sm capitalize">
                {" "}
                {accommodation?.standard}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white">
              {accommodation?.isInPark ? (
                <TreePine className="h-4 w-4 text-primary" />
              ) : (
                <MapPin className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm">
                {accommodation?.isInPark ? "In Park" : "Out Park"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/accommodations/${accommodation?.slug}`}>
        <div className="p-6 transition-all">
          <h3 className="text-xl font-bold text-white mb-5 line-clamp-2">
            {accommodation?.name}
          </h3>

          <PrimaryButton className="w-full">View Details</PrimaryButton>
        </div>
      </Link>
    </div>
  );
};

export const BlogCardPro = ({ item }) => {
  return (
    <div className="relative">
      {" "}
      <Link
        href={`blog/${item?.slug}`}
        className="w-fullgroup bg-white overflow-hidden"
      >
        <Image
          src={item?.photos[0]}
          alt="acc1"
          width={500}
          height={500}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute left-2 bottom-2 bg-black/30 rounded backdrop-blur-lg right-2 px-6 pb-6 pt-4 space-y-4">
          <h2 className="font-semibold text-white text-md border-l-4 border-secondary pl-3 line-clamp-3">
            {item?.title}
          </h2>

          <PrimaryButton>Read More</PrimaryButton>
        </div>
      </Link>
    </div>
  );
};

// Contact Info Card Component
export const ContactInfoCard = ({ icon: Icon, title, info, description }) => {
  return (
    <div className="bg-highlight border-gray-800 rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-primary mb-1">{title}</h3>
          <p className="text-white font-medium mb-1">{info}</p>
          <p className="text-sm text-textcolor">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Gallery Item Component
export function GalleryItem({ item, onClick }) {
  return (
    <div
      className="group bg-white/60 relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={() => onClick()}
    >
      <Image
        width={500}
        height={500}
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        className="w-full h-64 object-cover"
        loading="lazy"
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
          {item.category}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
          <Share2 className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-white/80">{item.location}</p>
      </div>
    </div>
  );
}

// trekking
export const TrekkingCardPro = ({ tour }) => {
  return (
    <div className="group bg-red-50/20 flex flex-col md:flex-row hover:shadow-2xl transitions hover:-translate-y-2 rounded overflow-hidden">
      <div className="relative w-full md:w-2/5 flex-shrink-0">
        <img
          src={tour?.photos[0] || "/placeholder.svg"}
          alt={tour?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Mountain Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary font-bold text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Mountain className="h-4 w-4" />
            {tour?.mountain}
          </span>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between md:w-3/5">
        <div>
          <h3 className="font-semibold text-textcolor mb-3 line-clamp-2">
            {tour?.title}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-textcolor/70">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm">{`${tour?.duration} Days, ${
                tour?.duration - 1
              } Nights`}</span>
            </div>
            <div className="flex items-center gap-2 text-textcolor/70">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm capitalize">
                {" "}
                {tour?.category || "---"} Tour
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tour?.focus?.slice(0, 4).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-accent text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-left">
            <span className="text-xl font-bold text-secondary">
              ${tour?.prices}
            </span>
            <span className="text-sm text-textcolor/70 block">per person</span>
          </div>
          <Link href={`/tours/${tour?.slug}`}>
            <SecondaryButton className="group-hover:bg-secondary group-hover:text-white">
              {" "}
              Book Trek
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ListCustomBookingCardTour = ({ tour, onSelect }) => {
  const extractData = [
    {
      title: `${tour?.category} Tour`,
      icon: HiOutlineUserGroup,
    },
    {
      title: `${tour?.duration} Days`,
      icon: MdAccessTime,
    },
  ];
  return (
    <div className="bg-highlight/50 text-white transitions shadow-md hover:shadow-lg  rounded-lg  p-3 border border-gray-800">
      {/* image */}
      <Image
        src={tour?.photos[0]}
        alt={tour?.title}
        width={1000}
        height={230}
        className="w-full h-32 rounded object-cover"
      />

      {/* content */}
      <div className="pt-4 px-4 space-y-3">
        <Link href={`/tours/${tour?.slug}`} target={"_blank"}>
          <h2 className="font-bold text-sm capitalize leading-6 ">
            {tour?.title}
          </h2>
        </Link>

        {/* icons */}
        <div className="flex items-center gap-2 flex-wrap capitalize ">
          {extractData.map((data, index) => (
            <p
              key={index}
              className="text-sm text-textcolor flex items-center flex-row gap-2"
            >
              <data.icon className="text-primary text-base" size={14} />
              {data?.title}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-sm capitalize">
            ${tour?.prices} <span className="text-sm font-light">(pp)</span>
          </h2>
          <button
            onClick={() => onSelect(tour)}
            className={
              "bg-primary px-4 rounded text-black py-1 text-sm hover:bg-secondary transitions font-medium"
            }
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export function PromoCard({ image, title, subtitle, buttonText, buttonLink }) {
  return (
    <div className="relative rounded-lg overflow-hidden p-8 text-white min-h-[250px] md:min-h-[400px] flex flex-col justify-end group">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        objectFit="cover"
        className="group-hover:brightness-75 brightness-50 transition-all duration-300"
      />
      <div className="relative z-10">
        <p className="text-secondary font-semibold">{subtitle}</p>
        <h3 className="text-3xl font-bold font-jua mt-1 mb-4">{title}</h3>
        <Link href={buttonLink}>
          <PrimaryButton className="rounded ">{buttonText}</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
