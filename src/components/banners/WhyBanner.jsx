import { Lightbulb, Sun } from "lucide-react";
import React from "react";
import { PrimaryButton, SecondaryButton } from "../buttons";
import Link from "next/link";
import Image from "next/image";

const datas = [
  {
    title: "Our partnerships",
    image: "/images/bg/33.png",
    desc: "Our global partner network helps us bring to life our incomparable Wilderness journeys. We align with the very best airlines, non-profit organisations, travel agencies, apparel brands and more all with a focus on sustainable practices and making a positive impact",
  },
  {
    title: "Our awards",
    image: "/images/bg/34.png",
    desc: "We are proud to have received multiple awards for our commitment to wildlife conservation and sustainable travel. These include the World Wildlife Fund’s Wildlife Conservation Award, the International Association of Wildlife Guides’ Guide of the Year Award, and the European Wildlife Association’s Wildlife Tourism Award.",
  },
  {
    title: "Our manifesto",
    image: "/images/bg/31.png",
    desc: "As a leading conservation and hospitality company, we focus on immersing our guests in our many fascinating environments. Guiding them through each expansive private concession. Creating intimate encounters between them, nature and culture. And ultimately, increasing the world’s wilderness by involving more and more people in our purpose.",
  },
];

function WhyBanner() {
  return (
    <div className="bg-accent">
      <div className="respons lg:py-20 py-10">
        {/* banner */}

        <div className="relative rounded-2xl py-16 bg-primary overflow-hidden">
          <div data-aos="fade-up" className="px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-accent p-5 rounded-full">
                <Sun className="sm:w-10 sm:h-10 w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="font-jua text-3xl md:text-4xl text-accent mb-4">
              What Drives Us
            </h2>
            <p className="font-quicksand sm:text-lg text-accent/80 mb-8 max-w-3xl mx-auto">
              At Wild Odysseys, we believe travel is more than just visiting new
              places — it’s about creating stories that last a lifetime. Our
              passion for conservation, commitment to authentic experiences, and
              deep local expertise are what set us apart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/experiences">
                <SecondaryButton>Inspirational Trips</SecondaryButton>
              </Link>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-secondary/20 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-accent/20 rounded-full"></div>
          <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>

        <div className="mt-12 relative space-y-20">
          {datas?.map((dat, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-8"
            >
              <Image
                data-aos={`${index % 2 === 0 ? "fade-right" : "fade-left"}`}
                className={`w-full h-[400px] md:block hidden object-cover rounded-xl shadow-2xl hover:scale-95 transitions ${
                  index % 2 === 0 ? "order-1" : "order-2"
                }`}
                src={dat.image}
                alt={dat.title}
                width={500}
                height={500}
              />

              <div
                data-aos={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}
                className={`space-y-4 text-start ${
                  index % 2 === 0 ? "md:pr-10 order-2" : "md:pl-10 order-1"
                }`}
              >
                <h2 className="font-jua text-xl md:text-3xl text-primary">
                  {dat.title}
                </h2>
                <hr className="w-14 h-1 bg-secondary" />

                <p className="text-primary leading-7">{dat.desc}</p>
                <PrimaryButton className="text-sm">
                  Book With Us Now
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyBanner;
