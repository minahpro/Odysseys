"use client";
import React from "react";
import { PrimaryButton } from "../buttons";
import {
  Shirt,
  Backpack,
  Sun,
  Camera,
  CloudRain,
  Heart,
  Box,
} from "lucide-react";
import { downloadFile } from "../Functions";

function ListBanner() {
  const packingItems = [
    {
      icon: Shirt,
      title: "Lightweight, neutral-colored clothing",
      description: "Comfortable and breathable fabrics in earth tones",
    },
    {
      icon: Backpack,
      title: "Small daypack for excursions",
      description: "Easy to carry for day trips and game drives",
    },
    {
      icon: Sun,
      title: "Sunscreen, hat, and sunglasses",
      description: "Essential protection from the African sun",
    },
    {
      icon: Camera,
      title: "Camera with extra batteries and memory",
      description: "Capture unforgettable wildlife moments",
    },
    {
      icon: CloudRain,
      title: "Rain jacket or poncho",
      description: "Stay dry during unexpected weather",
    },
    {
      icon: Heart,
      title: "Personal medications and first-aid kit",
      description: "Important health and safety essentials",
    },
  ];

  return (
    <section className="lg:py-20 bg-accent/40 py-10">
      <div className="respons">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div
            data-aos="fade-down"
            className="text-center flex-all flex-col mb-12"
          >
            <span
              className={`bg-secondary text-white h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
            >
              <Box />
            </span>
            <h2 className="md:text-4xl text-3xl text-primary font-jua mb-4">
              What to Pack for Safari
            </h2>

            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Prepare for your unforgettable journey with our essential packing
              guide.
            </p>
          </div>

          {/* Packing Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packingItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  className="rounded-xl p-6 hover:bg-accent transitions"
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <IconComponent size={48} className="text-primary" />
                    </div>
                    <h3 className=" font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <PrimaryButton
              onClick={() => {
                downloadFile({
                  fileName: "kili.pdf",
                  name: "Wild Odysseys Packing List",
                });
              }}
              className="px-8 py-3"
            >
              Download Complete Packing List
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListBanner;
