// pages/Privacy.js
"use client";
import AboutHome from "@/components/homeComponents/AboutHome";
import FeaturesDestinations from "@/components/homeComponents/DestinationsHome";
import TestimonialsSection from "@/components/homeComponents/ReviewsHome";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import {
  PageLoading,
  PrivacyLoadingComp,
} from "@/components/Loadings/LoadingComp";
import { PlainTitle } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { Eye, Shield, Users } from "lucide-react";
import React, { Suspense } from "react";

function Privacy() {
  const {
    data: policies,
    isLoading,
    didSucceed,
  } = useFetchMultipleDocsByFieldNames("policies", [], {
    fieldName: "createdAt",
    value: "desc",
  });

  const privacyData = didSucceed && policies[0]?.body;

  return (
    <>
      <TitleHeader
        first={"Privacy "}
        last={"Policy."}
        image={"/images/tourImages/epso55.jpg"}
        sub="We are committed to protecting your privacy and ensuring the
            security of your personal information. This policy explains how we
            collect, use, and safeguard your data."
        link={{
          href: "/about",
          text: "Read About Us",
        }}
      />

      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Shield />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Your Privacy Matters
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Wild Odysseys was founded with a singular vision: to share the
              unparalleled beauty and magic of Tanzania with the world,
              responsibly and authentically. As a locally-owned and operated
              company, we bring an intimate knowledge of the land, its wildlife,
              and its people to every journey we craft.
              <br />
              <br />
              Our roots are deeply embedded in the Tanzanian soil, allowing us
              to offer unique insights and access to experiences that go beyond
              the typical tourist trail. We believe in creating connections –
              between our guests and nature, between travelers and local
              communities, and between dreams and reality.
              <br />
              <br />
              Wild Odysseys was founded with a singular vision: to share the
              unparalleled beauty and magic of Tanzania with the world,
              responsibly and authentically. As a locally-owned and operated
              company, we bring an intimate knowledge of the land, its wildlife,
              and its people to every journey we craft.
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">Secure Data</h3>
              <p className="text-sm text-primary">
                Your information is encrypted and stored securely
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="bg-white rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">Transparent</h3>
              <p className="text-sm text-primary">
                Clear information about data collection and use
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="bg-white rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">Your Control</h3>
              <p className="text-sm text-primary">
                You control your data and privacy preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutHome />
      <TestimonialsSection />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Privacy />
    </Suspense>
  );
}
