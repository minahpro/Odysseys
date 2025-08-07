// pages/Galley.js
"use client";
import { PrimaryButton } from "@/components/buttons";
import { GalleryItem } from "@/components/cards";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import SubscribeSection from "@/components/homeComponents/SubscribeHome";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import TitleHeader from "@/components/titleHeader";
import { galleryData } from "@/data/randomData";
import { Camera } from "lucide-react";

import React, { Suspense, useState } from "react";

function Galley() {
  const [open, setOpen] = useState(false);

  const filteredImages = galleryData;
  return (
    <>
      {open && (
        <ImagePreviewPopUp
          handleOpen={open}
          handleClose={() => setOpen(false)}
          title="Gallery"
          images={filteredImages?.map((item) => item.image)}
        />
      )}
      <TitleHeader
        first={"Photo "}
        last={"Gallery."}
        image={"/images/tourImages/epso33.jpg"}
        sub="    Explore our stunning collection of photographs showcasing Tanzania's
            incredible wildlife, breathtaking landscapes, and rich cultural
            heritage."
        link={{
          text: "Read Our Blogs",
          link: "/blog",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Camera />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Capture the Magic of Tanzania
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
            </p>
          </div>
          <div className="mt-12">
            {/* Masonry Gallery Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mb-12">
              {filteredImages.map((item, index) => (
                <div key={index} className="break-inside-avoid mb-6">
                  <GalleryItem
                    item={item}
                    onClick={() => setOpen(true)}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Galley />
    </Suspense>
  );
}
