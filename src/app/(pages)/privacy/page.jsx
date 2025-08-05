// pages/Privacy.js
"use client";
import FeaturesDestinations from "@/components/homeComponents/DestinationsHome";
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
      />
      <main className="respons lg:pt-20 pt-10">
        {/* Page Introduction */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <PlainTitle first={"Your Privacy "} last={"Matters"} />
          <p className="text-lg text-textcolor/70 max-w-3xl mx-auto mb-8 mt-4">
            We are committed to protecting your privacy and ensuring the
            security of your personal information. This policy explains how we
            collect, use, and safeguard your data.
          </p>
          <div className="bg-primary/20 rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-white">
              <strong>Last Updated:</strong> December 2024 |{" "}
              <strong>Effective Date:</strong> January 1, 2024
            </p>
          </div>
        </div>
        <div className="mb-12 max-w-4xl mx-auto">
          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-highlight/40 rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-rose-100/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">Secure Data</h3>
              <p className="text-sm text-textcolor">
                Your information is encrypted and stored securely
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="bg-highlight/40 rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-blue-100/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">Transparent</h3>
              <p className="text-sm text-textcolor">
                Clear information about data collection and use
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="bg-highlight/40 rounded-xl p-6 border border-highlight text-center"
            >
              <div className="bg-purple-100/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-white mb-2">Your Control</h3>
              <p className="text-sm text-textcolor">
                You control your data and privacy preferences
              </p>
            </div>
          </div>

          <div className="bg-highlight/20 rounded-xl shadow-sm border border-highlight p-8">
            {
              // loading
              isLoading ? (
                <PrivacyLoadingComp />
              ) : didSucceed ? (
                <div
                  dangerouslySetInnerHTML={{ __html: privacyData }}
                  className="prose prose-lg max-w-none text-textcolor leading-relaxed"
                />
              ) : (
                <NoDataFound text="No Data Found" />
              )
            }
          </div>
        </div>
      </main>
      <FeaturesDestinations />
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
