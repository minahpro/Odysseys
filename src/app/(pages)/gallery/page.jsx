// pages/Gallery.js
"use client";
import { PrimaryButton } from "@/components/buttons";
import SubscribeSection from "@/components/homeComponents/SubscribeHome";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import TitleHeader from "@/components/titleHeader";
import GalleryFilter from "@/components/gallery/GalleryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryModal from "@/components/gallery/GalleryModal";
import useGallery from "@/lib/hooks/useGallery";
import { galleryData } from "@/data/randomData";
import { Camera, Search } from "lucide-react";

import React, { Suspense, useState } from "react";

function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    images,
    allImages,
    categories,
    activeCategory,
    loading,
    error,
    handleCategoryChange,
    handleSearch,
    hasImages,
    filteredCount,
    totalImages
  } = useGallery();

  // Fallback to static data if Firebase data is not available
  const displayImages = hasImages ? images : galleryData;
  const displayCategories = categories.length > 1 ? categories : ['All', 'Safari', 'Trekking', 'Beach', 'Wildlife', 'Culture', 'Landscape'];

  const handleImageClick = (image, index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <>
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={displayImages}
        initialIndex={selectedImageIndex}
        title="Wild Odysseys Gallery"
      />
      
      <TitleHeader
        first={"Photo "}
        last={"Gallery."}
        image={"/images/tourImages/epso33.jpg"}
        sub="Explore our stunning collection of photographs showcasing Tanzania's incredible wildlife, breathtaking landscapes, and rich cultural heritage."
        link={{
          text: "Read Our Blogs",
          href: "/blog",
        }}
      />
      
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className="bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6"
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
          
          <div className="max-w-4xl text-center space-y-6 mb-8">
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
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8" data-aos="fade-up" data-aos-delay="300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <GalleryFilter
            categories={displayCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Results Count */}
          {hasImages && (
            <div className="text-center mb-6" data-aos="fade-up">
              <p className="text-sm text-gray-600">
                Showing {filteredCount} of {totalImages} images
                {activeCategory !== 'All' && ` in ${activeCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="mt-12 w-full">
            <GalleryGrid
              images={displayImages}
              onImageClick={handleImageClick}
              loading={loading}
              error={error}
              emptyMessage={searchTerm ? `No images found matching "${searchTerm}"` : "No images available"}
            />
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
      <Gallery />
    </Suspense>
  );
}
