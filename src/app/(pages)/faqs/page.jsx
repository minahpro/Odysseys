// pages/Faqs.js
"use client";
import { QuickTipsBanner } from "@/components/banners/SmallBanners";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import {
  FaqsLoadingComp,
  PageLoading,
} from "@/components/Loadings/LoadingComp";
import { PlainTitle } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { ChevronDown } from "lucide-react";
import React, { Suspense, useState } from "react";

function Faqs() {
  const [openItems, setOpenItems] = useState({});

  const {
    data: faqs,
    isLoading,
    didSucceed,
  } = useFetchMultipleDocsByFieldNames("faqs", [], {
    fieldName: "createdAt",
    value: "desc",
  });

  const faqsDatas = (didSucceed && faqs[0]?.items) || [];

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <TitleHeader
        first={"FA"}
        last={"Qs"}
        image={"/images/tourImages/epso44.jpg"}
      />
      <main className="respons lg:pt-20 pt-10">
        {/* Page Introduction */}
        <div className="text-center mb-12">
          <PlainTitle first={"Got "} last={"Questions?"} />
          <p className="text-lg text-textcolor/70 max-w-3xl mx-auto mb-8 mt-4">
            Find answers to the most common questions about traveling to
            Tanzania, safari experiences, trekking adventures, and
            accommodations.
          </p>
        </div>
        <div className="mb-12">
          {
            // loading
            isLoading ? (
              <div className="w-full lg:grid-cols-2 grid gap-4">
                {[...Array(6)].map((_, i) => (
                  <FaqsLoadingComp key={i} />
                ))}
              </div>
            ) : didSucceed && faqsDatas?.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {faqsDatas?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-highlight/40 rounded-xl border border-gray-800 overflow-hidden hover:border-highlight transitions"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between"
                    >
                      <h3 className="font-semibold text-textcolor pr-4">
                        {item?.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform duration-200 ${
                          openItems[index] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openItems[index] && (
                      <div className="px-6 pb-4">
                        <div className="pt-2 border-t border-gray-800">
                          <p className="text-textcolor leading-relaxed">
                            {item?.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <NoDataFound text="No Question Found" />
            )
          }
          <QuickTipsBanner />
        </div>
      </main>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Faqs />
    </Suspense>
  );
}
