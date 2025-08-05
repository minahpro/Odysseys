// pages/Galley.js
"use client";
import { PrimaryButton } from "@/components/buttons";
import { GalleryItem } from "@/components/cards";
import DayTripsHome from "@/components/homeComponents/DayTripsHome";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import { PlainTitle } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import { galleryData } from "@/data/randomData";

import React, { Suspense, useEffect, useState } from "react";

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
      />
      <main className="respons lg:pt-20 pt-10">
        {/* Page Introduction */}
        <div className="text-center mb-12">
          <PlainTitle first={"Capture the "} last={"Magic"} />
          <p className="text-lg text-textcolor/70 max-w-3xl mx-auto mb-8 mt-4">
            Explore our stunning collection of photographs showcasing Tanzania's
            incredible wildlife, breathtaking landscapes, and rich cultural
            heritage.
          </p>
        </div>
        <div className="mb-12">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-highlight/40 rounded-xl p-6 text-center border border-highlight">
              <div className="text-3xl font-bold text-primary mb-2">
                {galleryData.length}
              </div>
              <div className="text-sm text-textcolor">Total Photos</div>
            </div>
            <div className="bg-highlight/40 rounded-xl p-6 text-center border border-highlight">
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-textcolor">Categories</div>
            </div>
            <div className="bg-highlight/40 rounded-xl p-6 text-center border border-highlight">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-textcolor">Locations</div>
            </div>
            <div className="bg-highlight/40 rounded-xl p-6 text-center border border-highlight">
              <div className="text-3xl font-bold text-primary mb-2">25k+</div>
              <div className="text-sm text-textcolor">Total Views</div>
            </div>
          </div>
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredImages.map((item, index) => (
              <GalleryItem
                key={index}
                item={item}
                onClick={() => setOpen(true)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <PrimaryButton>Load More Photos</PrimaryButton>
          </div>
        </div>
      </main>

      <DayTripsHome />
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
