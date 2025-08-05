import AdventureBanner from "@/components/banners/AdventureBanner";
import AboutHome from "@/components/homeComponents/AboutHome";
import ActivitiesSection from "@/components/homeComponents/Activities";
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
        image={"/images/gallery/zanzi5.png"}
      />

      <AboutHome about={true} />
      <WhyChooseUs />
      <PatinersSection />
      <AdventureBanner />
      <GallerySection />
      <TestimonialsSection home={false} />
    </>
  );
}

export default page;
