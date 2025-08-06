"use client";
import React, { useEffect, useState } from "react";
import { findItTitle } from "./Functions";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";

function MenuLink() {
  const { allFetchedTours, isLoading, allFetchedDayTrips } = useAppContext();
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  const { data: tourTags, isLoading: isFetchingTags } =
    useFetchAll("tour-tags");
  const [trekkings, setTrekkings] = useState([]);

  // get all tours with hiking id on focus
  useEffect(() => {
    const hkId = findItTitle({ data: tourTypes, title: "hiking" });
    if (allFetchedTours?.length > 0 && tourTypes?.length > 0) {
      if (hkId) {
        const trekkingTours = allFetchedTours?.filter((tour) =>
          tour.focus.includes(hkId)
        );

        if (trekkingTours?.length) {
          setTrekkings(trekkingTours);
        }
      } else {
        console.log("hiking id was not found");
      }
    }
  }, [allFetchedTours, tourTypes]);

  // zanzibar
  const finalZanzibarTrips = allFetchedDayTrips?.filter((trip) =>
    trip.tags.includes(findItTitle({ data: tourTags, title: "zanzibar" }))
  );

  // catch if loading
  const ifLoading = isLoading || isFetchingTourTypes || isFetchingTags;

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Packages",
      href: "/packages",
      dropdown: {
        title: "Safari Packages",
        subtitle: "Choose your perfect Tanzania adventure",
        items: [
          {
            name: "Zanzibar Beach Tours",
            href: "/tours/zanzibar-trips",
            description:
              "Pristine beaches, spice tours, and cultural experiences",
            image: "/images/gallery/zanzi3.png",
            price: ifLoading ? "---" : `(${finalZanzibarTrips?.length}) Trips`,
          },
          {
            name: "Kilimanjaro Packages",
            href: "/tours/climbing-trips",
            description: "Conquer Africa's highest peak with expert guides",
            image: "/images/bg/21.png",
            price: ifLoading ? "---" : `(${trekkings?.length}) Trips`,
          },
          {
            name: "Day Trips",
            href: "/tours/day-trips",
            description: "Perfect for short visits and quick adventures",
            image: "/images/bg/18.png",
            price: ifLoading ? "---" : `(${allFetchedDayTrips?.length}) Trips`,
          },
          {
            name: "All Safari Packages",
            href: "/tours",
            description: "Browse our complete collection of adventures",
            image: "/images/bg/3.png",

            price: ifLoading ? "---" : `(${allFetchedTours?.length}) Trips`,
          },
        ],
      },
    },
    { name: "Destinations", href: "/destinations" },
    { name: "Accommodations", href: "/accommodations" },
    {
      name: "Others",
      href: "#",
      dropdown: {
        title: "Resources & More",
        subtitle: "Everything you need to plan your trip",
        items: [
          {
            name: "Contact Us",
            href: "/contact",
            description: "Get in touch with us for more information",
            image: "/images/gallery/team4.png",
            badge: "Contact Us Now",
          },
          {
            name: "Safari Blog",
            href: "/blog",
            description: "Expert tips, guides, and safari stories",
            image: "/images/gallery/kili6.png",
            badge: "Latest Tips",
          },
          {
            name: "Photo Gallery",
            href: "/gallery",
            description: "Stunning wildlife and landscape photography",
            image: "/images/gallery/zanzi2.png",
            badge: "500+ Photos",
          },
          {
            name: "FAQs",
            href: "/faqs",
            description: "Common questions about Tanzania safaris",
            image: "/images/gallery/team3.png",
            badge: "Quick Answers",
          },
          {
            name: "Privacy Policy",
            href: "/privacy",
            description: "How we protect your personal information",
            image: "/images/bg/10.png",
            badge: "Updated 2024",
          },
        ],
      },
    },
  ];
  return menuItems;
}

export default MenuLink;
