"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../buttons";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const contentRef = useRef(null);

  const slides = [
    {
      image: "/images/bg/24.png", // animals
      title: "Where the Wild Roams Free",
      subtitle:
        "From the Big Five in Kenya to gorillas in Rwanda, experience iconic wildlife across Africa’s diverse landscapes.",
      cta1: { label: "View Experiences", link: "/experiences" },
      cta2: { label: "Read Our Blogs", link: "/blog" },
    },
    {
      image: "/images/bg/26.png", // forest
      title: "Into the Heart of the Forest",
      subtitle:
        "Explore the Congo Basin, Uganda’s Bwindi, and other lush rainforests home to gorillas, chimps, and rare species.",
      cta1: { label: "Explore Journeys", link: "/journeys" },
      cta2: { label: "About Us", link: "/about-us" },
    },
    {
      image: "/images/bg/21.png", // treks
      title: "Adventure Above the Clouds",
      subtitle:
        "Climb Kilimanjaro, hike Ethiopia’s Simien Mountains, or trek through South Africa’s Drakensberg ranges.",
      cta1: { label: "Plan Your Journey", link: "/journeys" },
      cta2: { label: "View Experiences", link: "/experiences" },
    },
    {
      image: "/images/bg/25.png", // waterfalls
      title: "Chasing Waterfalls",
      subtitle:
        "From Victoria Falls in Zambia to hidden cascades in Madagascar, discover nature’s most powerful displays.",
      cta1: { label: "View Gallery", link: "/gallery" },
      cta2: { label: "Contact Us", link: "/contact-us" },
    },
    {
      image: "/images/bg/29.png", // desert / beaches
      title: "Escape to Paradise",
      subtitle:
        "Unwind on Zanzibar’s beaches, explore the Seychelles, or journey through Namibia’s vast desert dunes.",
      cta1: { label: "Beach Journeys", link: "/journeys" },
      cta2: { label: "View Gallery", link: "/gallery" },
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
              <Link href={slides[currentSlide].cta1?.link}>
                <PrimaryButton>
                  {slides[currentSlide].cta1?.label}
                </PrimaryButton>
              </Link>

              <Link href={slides[currentSlide].cta2?.link}>
                <SecondaryButton>
                  {slides[currentSlide].cta2?.label}
                </SecondaryButton>
              </Link>
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
