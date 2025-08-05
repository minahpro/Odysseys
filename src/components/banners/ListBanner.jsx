"use client";
import React from "react";
import { PrimaryButton } from "../buttons";
import { CheckCircle } from "lucide-react";
import { downloadFile } from "../Functions";

function ListBanner() {
  return (
    <section className="sm:pb-28 pb-10 pt-6">
      <div className="respons">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="lg:block hidden">
            <img
              src="/images/tourImages/epso55.jpg"
              alt="Our Commitment"
              className="rounded-lg object-cover w-full h-[600px]"
            />
          </div>

          <div data-aos="fade-left">
            <h2 className="md:text-4xl font-jua text-3xl font-bold text-white mb-4">
              Safari <span className="text-primary">Essentials</span>
            </h2>
            <p className="text-textcolor text-lg mb-6 leading-relaxed">
              Prepare for the adventure of a lifetime! Here's what you should
              bring to make your Tanzanian safari experience comfortable, safe,
              and unforgettable.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Comfortable hiking boots and lightweight walking shoes",
                "Neutral-colored clothing (khaki, beige, olive) for game drives",
                "Wide-brimmed hat and high SPF sunscreen for sun protection",
                "Binoculars for wildlife viewing and bird watching",
                "Camera with extra batteries and memory cards",
                "Insect repellent and basic first aid kit",
                "Light jacket for cool mornings and evenings",
                "Reusable water bottle to stay hydrated",
              ].map((essential, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{essential}</span>
                </div>
              ))}
            </div>

            <PrimaryButton
              onClick={() =>
                downloadFile({
                  file: "/images/esse.pdf",
                  name: "Safari Essentials",
                })
              }
            >
              Download Full Packing List
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListBanner;
