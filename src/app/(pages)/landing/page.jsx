import Hero from "@/components/homeComponents/Hero";
import React, { Suspense } from "react";
import NavBar from "@/components/navbar";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";
import WildlifeBanner from "@/components/banners/WildlifeBanner";
import FeaturesDestinations from "@/components/homeComponents/DestinationsHome";
import AboutHome from "@/components/homeComponents/AboutHome";
import TrekkingTours from "@/components/homeComponents/TrekkingHome";
import AdventureBanner from "@/components/banners/AdventureBanner";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import ZanzibarTripsHome from "@/components/homeComponents/ZanzibarTrips";
import AccommodationsHome from "@/components/homeComponents/AccommodationsHome";
import SubscribeSection from "@/components/homeComponents/SubscribeHome";
import TestimonialsSection from "@/components/homeComponents/ReviewsHome";
import BlogsHome from "@/components/homeComponents/BlogsHome";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import ListBanner from "@/components/banners/ListBanner";
import BookingBanner from "@/components/banners/BookingBanner";
import GallerySection from "@/components/homeComponents/gallerryHome";
export const metadata = {
  title: "Wild Odysseys",
  description:
    " Best and top-rated Serengeti luxury and budget safari company in Tanzania",
};

function Home() {
  return (
    <main>
      <Hero />
      <FeaturesDestinations />
      <AboutHome />
      <WildlifeBanner />
      <BookingBanner />
      <DayTripsHome />
      <ListBanner />
      <TrekkingTours />
      <ZanzibarTripsHome />
      <AdventureBanner />
      <AccommodationsHome />
      <TestimonialsSection />
      <BlogsHome />
      <SubscribeSection />
      <GallerySection />
    </main>
  );
}

export default function Landing() {
  return (
    <Suspense fallback={<PageLoading />}>
      <NavBar />
      <Home />
    </Suspense>
  );
}
