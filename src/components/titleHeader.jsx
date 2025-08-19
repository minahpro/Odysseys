import React from "react";
import Image from "next/image";
import { SecondaryButton } from "./buttons";
import Link from "next/link";

export default function TitleHeader({ first, last, link, sub, image }) {
  return (
    <section className={`w-full relative grid grid-cols-2 gap-12`}>
      <div className="bg-white flex-all h-full">
        <div className=" space-y-6 pl-32 w-full">
          <h1
            data-aos="fade-right"
            className={`font-jua text-3xl md:text-4xl xl:text-5xl font-semibold text-primary `}
          >
            <span>{first}</span>
            <span className="text-secondary">{last}</span>
          </h1>

          <p
            data-aos="fade-right"
            data-aos-delay="100"
            className="font-medium text-primary"
          >
            {sub ||
              "Our team of experienced guides, commitment to sustainable tourism, and dedication to exceptional service ensure that every journey with us is not just a trip."}
          </p>
          <div data-aos="fade-right" data-aos-delay="200">
            <Link href={link?.href || "/contact"}>
              <SecondaryButton className="text-sm font-bold">
                {link?.text || "Contact Us"}
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
      <Image
        width={1000}
        height={500}
        alt="Loading.."
        src={image ? image : "/images/header.jpeg"}
        className="w-full bg-accent md:h-[450px] h-[300px] object-cover"
      />
    </section>
  );
}
