"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../buttons";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const contentRef = useRef(null);

  const slides = [
    {
      image: "/images/44.jpeg",
      title: "Relax in Paradise",
      subtitle: "Unwind on the pristine beaches after your safari adventure",
      cta1: "Beach Packages",
      cta2: "View Gallery",
    },
    {
      image: "/images/bg/21.png",
      title: "Conquer Africa's Highest Peak",
      subtitle:
        "Join us on an epic journey to the roof of Africa - Mount Kilimanjaro awaits your adventure",
      cta1: "Plan Your Trek",
      cta2: "Learn More",
    },
    {
      image: "/images/bg/8.png",
      title: "Discover the Wild Heart of Tanzania",
      subtitle:
        "Experience unforgettable safaris, majestic mountains, and pristine beaches with Wild Odysseys",
      cta1: "Explore Packages",
      cta2: "Watch Video",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Animation effect for content visibility
  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Initial animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="respons text-center text-white">
          <div
            ref={contentRef}
            data-animate
            className={`transition-all duration-1000 transform ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-jua text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {slides[currentSlide].title}
            </h1>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton>{slides[currentSlide].cta1}</PrimaryButton>
              <SecondaryButton>{slides[currentSlide].cta2}</SecondaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-secondary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
