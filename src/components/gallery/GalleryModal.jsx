"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share2, MapPin, Calendar } from "lucide-react";

export default function GalleryModal({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0,
  title = "Gallery"
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsLoading(true);
  };

  const handleShare = async () => {
    const currentImage = images[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || 'Gallery Image',
          text: currentImage.description || 'Check out this amazing image from Wild Odysseys',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleDownload = () => {
    const currentImage = images[currentIndex];
    const link = document.createElement('a');
    link.href = currentImage.image || currentImage.url;
    link.download = `${currentImage.title || 'gallery-image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-white/70">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Download"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Main Image */}
      <div className="relative max-w-7xl max-h-[90vh] mx-4">
        <Image
          src={currentImage.image || currentImage.url || '/placeholder.svg'}
          alt={currentImage.title || currentImage.alt || 'Gallery image'}
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain"
          onLoad={() => setIsLoading(false)}
          priority
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Image Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="text-white max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-1">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="text-sm text-white/80 mb-2">{currentImage.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-white/70">
            {currentImage.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{currentImage.location}</span>
              </div>
            )}
            {currentImage.category && (
              <span className="bg-white/20 px-2 py-1 rounded">
                {currentImage.category}
              </span>
            )}
            {currentImage.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(currentImage.createdAt.seconds * 1000).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
          <div className="flex gap-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
            {images.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((img, idx) => {
              const actualIndex = Math.max(0, currentIndex - 2) + idx;
              return (
                <button
                  key={actualIndex}
                  onClick={() => setCurrentIndex(actualIndex)}
                  className={`relative w-12 h-12 rounded overflow-hidden transition-all ${
                    actualIndex === currentIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.image || img.url || '/placeholder.svg'}
                    alt={img.title || 'Thumbnail'}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}