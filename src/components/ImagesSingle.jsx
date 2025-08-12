import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

function ImagesSingle({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative" data-aos="fade-right">
      <div className="relative md:h-96 sm:h-56 h-48 rounded-xl overflow-hidden">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={`Hotel image ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl">
          <span className="text-white text-sm">
            {currentImage + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              currentImage === index ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImagesSingle;
