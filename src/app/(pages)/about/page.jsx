import WhyBanner from "@/components/banners/WhyBanner";
import AboutHome from "@/components/homeComponents/AboutHome";
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
          "Expanding the World’s odyssey We are a group of individuals, helping to conserve 6 million acres (2.3 million-plus hectares) of land across our planet. "
        }
        image={"/images/bg/28.png"}
      />

      <WhyChooseUs />
      <AboutHome about={true} />
      <WhyBanner />
      <TestimonialsSection home={false} />
      <GallerySection />
      <PatinersSection />
    </>
  );
}

export default page;
