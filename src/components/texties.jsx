"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "./buttons";
import { MapPin } from "lucide-react";

export const HeaderTitle = ({ first, last, subHeading, className }) => {
  return (
    <div className="flex flex-col uppercase">
      <h5
        data-aos="fade-down"
        className={`text-sm pb-5 text-center  ${className}`}
      >
        {subHeading}
      </h5>
      <h1
        data-aos="fade-down"
        className={`font-extrabold  text-center tracking-wide
      ${className} text-2xl py-1 md:text-6xl pb-4`}
      >
        <span>{first}</span>
        &nbsp;
        <span className="text-irisonp">{last}</span>
      </h1>
    </div>
  );
};

export const Title = ({ title, badge, subHeading }) => {
  return (
    <div className="text-center flex-all flex-col mb-12">
      <span
        data-aos="fade-down"
        data-aos-delay="400"
        className={`bg-secondary text-white h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
      >
        {badge}
      </span>
      <h2
        data-aos="fade-down"
        data-aos-delay="300"
        className="md:text-4xl text-3xl text-primary font-jua mb-4"
      >
        {title}
      </h2>
      <p
        data-aos="fade-down"
        data-aos-delay="200"
        className="max-w-xl mx-auto font-medium text-lg text-primary"
      >
        {subHeading}
      </p>
      <hr
        data-aos="fade-down"
        data-aos-delay="100"
        className="w-12 mx-auto border-2 mt-5 border-secondary"
      />
    </div>
  );
};

export const PlainTitle = ({ first, last }) => {
  return (
    <h2
      data-aos="fade-down"
      className="md:text-3xl text-2xl font-bold text-white"
    >
      {first}
      <span className="text-primary">{last}</span>
    </h2>
  );
};

export const SingleHeader = ({ data }) => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data?.photos[0] || "/placeholder.svg?height=800&width=1200"}
          alt={data?.title}
          className="w-full h-full object-cover transitions bg-white"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 pt-20">
        <div className="respons flex-all w-full h-full text-center text-white">
          <div className="flex-all flex-col">
            <h1 className="font-jua text-2xl md:text-4xl lg:text-5xl text-white mb-4">
              {data?.title}
            </h1>

            <SecondaryButton onClick={data?.button?.onClick}>
              {data?.button?.text}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
