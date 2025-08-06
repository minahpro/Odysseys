import AdventureBanner from "@/components/banners/AdventureBanner";
import AboutHome from "@/components/homeComponents/AboutHome";
import ActivitiesSection from "@/components/homeComponents/Activities";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import GallerySection from "@/components/homeComponents/gallerryHome";
import PatinersSection from "@/components/homeComponents/PatinersSection";
import TestimonialsSection from "@/components/homeComponents/ReviewsHome";
import WhyChooseUs from "@/components/homeComponents/WhyUsHome";
import TitleHeader from "@/components/titleHeader";
import React from "react";

function page() {
  return (
    <>
      <TitleHeader
        first={"About "}
        last={"Us"}
        sub={
          "About Wild Odysseys, Your trusted partner for unforgettable safari and travel experiences in Tanzania. We are dedicated to providing you with the best possible safari and travel experiences. "
        }
        image={"/images/gallery/team3.png"}
      />

      <WhyChooseUs />
      <AboutHome about={true} />
      <DayTripsHome />
      <AdventureBanner />
      <GallerySection />
      <TestimonialsSection home={false} />
      <PatinersSection />
    </>
  );
}

export default page;
