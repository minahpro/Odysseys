import Hero from "@/components/homeComponents/Hero";
import React, { Suspense } from "react";
import NavBar from "@/components/navbar";
import ActivitiesSection from "@/components/homeComponents/Activities";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";
import WildlifeBanner from "@/components/banners/WildlifeBanner";
import FeaturesDestinations from "@/components/homeComponents/DestinationsHome";
import AboutHome from "@/components/homeComponents/AboutHome";
import WhyChooseUs from "@/components/homeComponents/WhyUsHome";
import TrekkingTours from "@/components/homeComponents/TrekkingHome";
import AdventureBanner from "@/components/banners/AdventureBanner";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import ZanzibarTripsHome from "@/components/homeComponents/ZanzibarTrips";
import GallerySection from "@/components/homeComponents/gallerryHome";
import AccommodationsHome from "@/components/homeComponents/AccommodationsHome";
import SubscribeSection from "@/components/homeComponents/SubscribeHome";
import TestimonialsSection from "@/components/homeComponents/ReviewsHome";
import BlogsHome from "@/components/homeComponents/BlogsHome";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import PromoBanner from "@/components/banners/PromoBanner";
import ListBanner from "@/components/banners/ListBanner";
import TrekkingBanner from "@/components/banners/TrekkingBanner";
import { PrimaryButton } from "@/components/buttons";
import BookingBanner from "@/components/banners/BookingBanner";
export const metadata = {
  title: "Wild Odysseys",
  description:
    " Best and top-rated Serengeti luxury and budget safari company in Tanzania",
};

function Home() {
  return (
    <main>
      <Hero />
      <BookingBanner />
      <FeaturesTours />
      <WildlifeBanner />
      <FeaturesDestinations />
      <AboutHome />
      <DayTripsHome />
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
