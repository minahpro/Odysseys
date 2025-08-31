"use client";
import React from "react";
import { GalleryItem } from "@/components/cards";
import { PageLoading } from "@/components/Loadings/LoadingComp";

export default function GalleryGrid({ 
  images, 
  onImageClick, 
  loading = false, 
  error = null,
  emptyMessage = "No images found",
  className = ""
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <PageLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Images</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-gray-800 font-semibold mb-2">No Images</h3>
          <p className="text-gray-600 text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 ${className}`}>
      {images.map((item, index) => (
        <div key={item.id || index} className="break-inside-avoid mb-6">
          <GalleryItem
            item={item}
            onClick={() => onImageClick(item, index)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}