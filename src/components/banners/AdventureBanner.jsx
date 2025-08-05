"use client";
import { Calendar, Users } from "lucide-react";
import { SecondaryButton, PrimaryButton } from "../buttons";
import Image from "next/image";
import Link from "next/link";
import { downloadFile } from "../Functions";
import { useAppContext } from "@/context/AppContext";

export default function AdventureBanner() {
  const { companyDetails, isLoading, didSucceed } = useAppContext();
  const CompDetails = didSucceed && companyDetails[0];

  return (
    <section className="pb-10 relative overflow-hidden">
      {/* Background Elements */}

      <div className=" relative z-10">
        {/* Main Banner */}
        <div className="relative overflow-hidden md:mb-16 mb-10">
          <div className="absolute inset-0">
            <Image
              src="/images/simba.jpeg"
              alt="Plan Your Safari"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          <div
            data-aos="fade-right"
            className="relative respons z-10 py-20 sm:py-32"
          >
            <div className="max-w-2xl">
              <h2 className="md:text-4xl font-jua text-3xl font-bold text-white mb-4">
                Plan Your <span className="text-primary">Perfect Safari</span>{" "}
                Adventure
              </h2>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                Let our expert team create a personalized safari experience
                tailored to your dreams, budget, and schedule. From luxury
                lodges to camping adventures, we'll make it unforgettable.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/plan-your-safari">
                  <PrimaryButton>Start Planning</PrimaryButton>
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

              {/* Features */}
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex items-center gap-2 text-gray-200">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Flexible Dates</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Any Group Size</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Banners */}
        <div className="grid respons md:grid-cols-2 grid-cols-1 gap-8">
          {/* Emergency Contact Banner */}
          <div
            data-aos="fade-up"
            className="bg-gradient-to-br from-primary to-secondary rounded-2xl sm:p-8 p-2 text-center"
          >
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-jua font-bold text-black mb-4">
              Last Minute Bookings?
            </h3>
            <p className="text-black/80 mb-6">
              Need to book urgently? We can arrange same-day departures for
              selected tours with our emergency booking service.
            </p>
            <PrimaryButton className="bg-black hover:bg-gray-800 text-primary">
              Call Now:{" "}
              {isLoading
                ? "Loading..."
                : CompDetails?.phoneNumbers?.length > 0
                  ? CompDetails?.phoneNumbers[0]
                  : "+255 123 456 789"}
            </PrimaryButton>
          </div>

          {/* Group Discount Banner */}
          <div
            data-aos="fade-up"
            data-aos-delay={"300"}
            className="bg-highlight border border-gray-800 rounded-2xl sm:p-8 p-2 text-center hover:border-primary transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-jua font-bold text-white mb-4">
              Group Discounts Available
            </h3>
            <p className="text-gray-300 mb-6">
              Traveling with friends or family? Get up to 20% off for groups of
              6 or more people on selected safari packages.
            </p>
            <Link href="/contact">
              <SecondaryButton>Contact Us For Discounts</SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
