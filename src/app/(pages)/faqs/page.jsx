// pages/Faqs.js
"use client";
import { NoDataFound } from "@/components/Loadings/ErrorComp";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import TitleHeader from "@/components/titleHeader";
import { ChevronDown, ShieldQuestion } from "lucide-react";
import React, { Suspense, useState } from "react";
import { faqsData } from "@/data/randomData";
import AccommodationsHome from "@/components/homeComponents/AccommodationsHome";

function Faqs() {
  const [openItems, setOpenItems] = useState({});
  const [activeTab, setActiveTab] = useState(faqsData[0]?.title || "Bookings");

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Get all categories from faqsData (excluding "All Questions")
  const categories = faqsData.map((category) => category.title);

  // Get filtered questions based on active tab
  const getFilteredQuestions = () => {
    const selectedCategory = faqsData.find(
      (category) => category.title === activeTab
    );
    return selectedCategory
      ? selectedCategory.questions.map((question, questionIndex) => ({
          ...question,
          category: selectedCategory.title,
          id: `${activeTab}-${questionIndex}`,
        }))
      : [];
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <>
      <TitleHeader
        first={"FA"}
        last={"Qs"}
        link={{
          text: "Our Destinations",
          href: "/destinations",
        }}
        sub={
          " Find answers to the most common questions about traveling to Tanzania, safari experiences, trekking adventures, and accommodations."
        }
        image={"/images/bg/13.png"}
      />

      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <ShieldQuestion />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Frequently Asked Questions
          </h2>
          <div className="grid w-full grid-cols-12 md:mt-12 mt-8 gap-6">
            <div
              data-aos="fade-right"
              className="col-span-12 lg:col-span-3 flex lg:flex-col flex-row flex-wrap items-center bg-white rounded p-4 gap-2"
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(category);
                    setOpenItems({}); // Reset open items when switching tabs
                  }}
                  className={`${
                    activeTab === category
                      ? "bg-primary text-accent"
                      : "bg-accent/15 text-primary hover:bg-accent/25"
                  } border border-accent/30 text-sm font-bold lg:w-full sm:w-auto w-full sm:px-8 lg:px-0 py-3 rounded transition-all duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="bg-white rounded p-6 mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {activeTab}
                </h3>
                <p className="text-textcolor/70 text-sm">
                  {filteredQuestions.length} questions in this category
                </p>
              </div>
              {filteredQuestions?.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions?.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-accent/40 rounded-xl border border-secondary/30 overflow-hidden hover:border-secondary transitions"
                    >
                      <button
                        onClick={() => toggleItem(item.id || index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-medium text-primary">
                            {item?.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-primary transition-transform duration-200 flex-shrink-0 ${
                            openItems[item.id || index] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openItems[item.id || index] && (
                        <div className="px-6 pb-4">
                          <div className="p-6 bg-white rounded">
                            <p className="text-primary leading-relaxed">
                              {item?.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <NoDataFound text="No Questions Found" />
              )}
            </div>
          </div>
        </div>
      </section>

      <AccommodationsHome />
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
