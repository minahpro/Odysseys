"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PrimaryButton, SecondaryButton, ActionButton } from "./buttons";
import { Clock, MapPin, Share2, Users } from "lucide-react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { FaStar } from "react-icons/fa6";

// CARDS I USE ON SITE
export const DestinationCardProHome = ({ item: destination }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-highlight hover:shadow-xl transition-all duration-300 group">
      <div className="p-5">
        <div className="relative h-72 rounded-xl overflow-hidden">
          <Image
            src={destination?.image || "/placeholder.svg"}
            alt={destination?.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content Overlay */}
          <Link
            href={`/destinations/${destination?.slug}`}
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
          >
            <h3 className="text-2xl font-medium font-jua">
              {destination?.name}
            </h3>
            <p className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 group-hover:mt-1 group-hover:mb-3 text-sm font-semibold text-gray-300">
              {destination?.slogan}
            </p>
            <ActionButton className="bg-white/20 text-white group-hover:bg-accent group-hover:text-primary font-bold backdrop-blur-sm border-0">
              Explore
            </ActionButton>
          </Link>
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
      className="grid grid-cols-6 gap-6 hover:shadow-primary/40 shadow-md items-center py-3 px-3 bg-highlight/50 border border-gray-900 rounded-xl group transitions"
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
      <div className="relative h-80 overflow-hidden">
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

export const DayTripCardPro = ({ tour }) => {
  return (
    <div className="bg-white group rounded-xl hover:shadow-2xl shadow-xl overflow-hidden transitions lg:max-w-4xl">
      <div className="relative">
        <div className="relative w-full md:h-96 h-80">
          <Image
            src={tour?.photos[0] || "/placeholder.svg"}
            alt={tour?.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="pl-14 pr-4 py-8 absolute right-0 rounded-bl-full group-hover:bg-accent transitions bg-white top-0">
          <div className=" mb-3">
            <div>
              <h3 className="font-bold text-primary text-lg mb-2">
                {tour?.title}
              </h3>
              <div className="flex items-center gap-1 text-secondary">
                <MapPin className="w-4 h-4" />
                <span className="font-quicksand text-sm">
                  {tour?.destinations
                    ?.slice(0, 3)
                    .map((dest) => dest)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 -right-56 group-hover:right-4 transition-all duration-700">
          <Link href={`/experiences/game-drive`}>
            <PrimaryButton className={`py-4 text-sm`}>
              Find Out More
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AccommodationCardPro = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-full min-h-[200px]">
          <Image
            src={item?.photos[0]}
            alt={item?.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 text-xs bg-accent text-primary px-3 py-1.5 rounded font-quicksand font-bold">
            {item?.destination}
          </div>
        </div>
        <div className="p-4 lg:p-8 border border-secondary/10 flex flex-col justify-center">
          <div data-aos="fade-left">
            <h3 className="font-black text-lg text-primary mb-4">
              {item?.name}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: item?.overview,
              }}
              className=" text-primary line-clamp-2 mb-6 leading-relaxed"
            />
            <div className="grid grid-cols-2 gap-6 mb-6">
              {item?.datas?.map((data, index) => (
                <div
                  className="flex-all flex-col p-6 bg-accent/40 rounded gap-3"
                  key={index}
                >
                  <data.icon className="w-5 h-5 text-primary" />
                  <span className="font-bold capitalize text-sm text-secondary">
                    {data.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Link href={`/accommodations/${item?.slug}`}>
                <PrimaryButton>View Details</PrimaryButton>
              </Link>
              {/* stars */}
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-sm text-primary">
                  {/* randomize number from 3-5 with points */}
                  {item?.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCardPro = ({ item }) => {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-highlight hover:shadow-xl transitions group">
      <Link href={`/blog/${item?.slug}`}>
        <div className="p-6">
          <div className="relative h-48 rounded-xl overflow-hidden mb-6">
            <Image
              src={item?.featuredImage || "/placeholder.svg"}
              alt={item?.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="capitalize font-bold text-secondary text-sm">
                {item?.category}
              </span>
              <span className="text-secondary text-sm">{item?.date}</span>
            </div>
            <h3 className="font-bold text-primary group-hover:underline transition-colors cursor-pointer line-clamp-2">
              {item?.title}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: item?.overview,
              }}
              className="text-primary text-sm leading-relaxed line-clamp-3"
            />

            <SecondaryButton className="font-bold text-sm">
              Read More
            </SecondaryButton>
          </div>
        </div>
      </Link>
    </article>
  );
};

// Contact Info Card Component
export const ContactInfoCard = ({ icon: Icon, title, info, description }) => {
  return (
    <div className="rounded-xl space-y-5 sm:p-8 p-5 flex-all flex-col bg-white hover:shadow-xl transitions">
      <div className="bg-accent flex-all w-14 h-14 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-2 w-full bg-highlight/30 p-4 rounded text-center">
        <h3 className="font-bold text-primary">{title}</h3>
        <p className="font-medium text-primary break-words">{info}</p>
        <p className="text-sm text-secondary">{description}</p>
      </div>
    </div>
  );
};

// Gallery Item Component
export function GalleryItem({ item, onClick, index }) {
  // Create varied heights for masonry effect
  const getRandomHeight = (index) => {
    const heights = ["h-48", "h-56", "h-64", "h-72", "h-80", "h-60"];
    return heights[index % heights.length];
  };

  return (
    <div
      className="group bg-white/60 relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full"
      onClick={() => onClick()}
    >
      <Image
        width={500}
        height={500}
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        className={`w-full ${getRandomHeight(index)} object-cover`}
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
