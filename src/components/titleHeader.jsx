import React from "react";
import Image from "next/image";

export default function TitleHeader({ first, last, image }) {
  return (
    <section className={`w-full relative md:h-[400px] h-[250px]`}>
      <Image
        width={1000}
        height={500}
        alt="Loading.."
        src={image ? image : "/images/header.jpeg"}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50  ">
        <div className="respons flex-all gap-4 flex-col w-full h-full">
          <h1
            data-aos="fade-down"
            className="text-2xl md:text-4xl text-white lg:text-5xl font-black font-jua uppercase tracking-wider"
          >
            <span>{first}</span>
            <span className="text-primary">{last}</span>
          </h1>
          <div
            data-aos="fade-up"
            className="flex items-center justify-center w-full max-w-md mx-auto"
          >
            <div className="w-24 h-2 bg-gradient-to-r from-transparent to-primary/70"></div>
            <div className="px-4 flex items-center gap-1">
              <span className="text-primary text-lg">★</span>
              <span className="text-primary text-xl">★</span>
              <span className="text-primary text-lg">★</span>
            </div>
            <div className="w-24 h-2 bg-gradient-to-l from-transparent to-primary/70"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
