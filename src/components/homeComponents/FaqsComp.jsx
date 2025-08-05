"use client";
import React, { useState } from "react";
import { Title } from "../texties";
import useFetchMultipleDocsByFieldNames from "@/lib/hooks/useFetchMultipleDocsByFieldNames";
import { ChevronDown } from "lucide-react";
import { NoDataFound } from "../Loadings/ErrorComp";
import { FaqsLoadingComp } from "../Loadings/LoadingComp";

function FaqsComp() {
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
    <section className="sm:py-28 py-10 bg-highlight/30">
      <div className="respons">
        <Title
          badge={"✍ Frequently Asked Questions"}
          title={"Answers to Common Questions"}
          subHeading={
            "Can't find what you're looking for? Contact us directly and we'll be happy to help."
          }
        />

        <div className="relative mt-12">
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
        </div>
      </div>
    </section>
  );
}

export default FaqsComp;
