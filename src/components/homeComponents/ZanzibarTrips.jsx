"use client";
import React from "react";
import { Globe, Umbrella } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ZanzibarTripsHome() {
  return (
    <section className="sm:py-28 py-10 bg-accent/40">
      <div className="respons flex-all flex-col">
        <span
          data-aos="fade-up"
          className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
        >
          <Globe />
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="md:text-4xl text-3xl text-secondary font-jua mb-4"
        >
          Our impact ethos
        </h2>
        <div className="max-w-4xl text-center">
          <p
            className="text-lg text-gray-800 leading-relaxed mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our journeys change lives. Not just yours but also those of our
            staff, communities, and the ecosystems we impact. We restore
            wilderness through low-volume high-value conservation tourism. Our
            purpose is a shared one. To ensure upliftment of local communities
            with help from guests, partners, donors, governments, and
            researchers. Our ambitions are bold. Our model is responsible,
            sustainable, inspiring.
          </p>
          <p
            className="text-lg text-gray-800 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Our roots are deeply embedded in the Tanzanian soil, allowing us to
            offer unique insights and access to experiences that go beyond the
            typical tourist trail. We believe in creating connections – between
            our guests and nature, between travelers and local communities, and
            between dreams and reality.
          </p>
          <Link
            href={"https://www.safaribookings.com/tanzania"}
            className="flex-all w-full mt-4"
          >
            <Image
              src="/partners/safaribookings.png"
              alt="Safari Bookings"
              className="w-full h-20 object-contain"
              width={500}
              height={500}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ZanzibarTripsHome;
