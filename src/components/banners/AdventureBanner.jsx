"use client";
import { Plane } from "lucide-react";
import { SecondaryButton, PrimaryButton } from "../buttons";
import Image from "next/image";
import Link from "next/link";
import { downloadFile } from "../Functions";

export default function AdventureBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}

      <div className=" relative z-10">
        {/* Main Banner */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/bg/16.png"
              alt="Plan Your Safari"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
          </div>

          <div
            data-aos="fade-right"
            className="relative respons z-10 py-20 sm:py-32"
          >
            <div className="max-w-2xl space-y-6">
              <span
                className={`bg-accent/20 text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-accent/50 inline-block`}
              >
                <Plane />
              </span>

              <h1
                className={`max-w-4xl font-jua text-3xl md:text-4xl xl:text-5xl font-semibold text-white `}
              >
                Hot Air <span className="text-accent">Balloon Safari.</span>
              </h1>

              <p className="font-medium text-gray-200 max-w-xl leading-relaxed">
                Soar Above the Serengeti at Sunrise – An Unforgettable View.
                Watch the Great Migration from the sky as the African sun paints
                the endless plains in golden hues.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/tours">
                  <PrimaryButton className="border border-accent">
                    Book Baloon Safaris
                  </PrimaryButton>
                </Link>
                <SecondaryButton
                  onClick={() =>
                    downloadFile({
                      file: "/images/itenary.pdf",
                      name: "Sample Itineraries",
                    })
                  }
                >
                  View Sample Itineraries
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
