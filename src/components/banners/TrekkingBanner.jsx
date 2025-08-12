"use client";
import { Clock, Shield, Heart, Backpack } from "lucide-react";
import React from "react";
import { PlainTitle } from "../texties";
import { PrimaryButton } from "../buttons";
import { downloadFile } from "../Functions";

function TrekkingBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-highlight/30">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Content Section */}
        <div className="lg:py-20 py-10 lg:pl-20 pl-4 pr-4 lg:pr-12 flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-sm px-4 py-2 rounded-full bg-primary/20 text-primary">
              Preparation Guide
            </span>
          </div>

          <div className="mb-6">
            <PlainTitle first="Ready for the " last="Ultimate Challenge?" />
          </div>

          <p
            data-aos="fade-right"
            className="text-lg mb-8 leading-relaxed text-textcolor"
          >
            Proper preparation is key to summit success. Our comprehensive
            training program and expert guidance ensure you're ready for every
            step of the journey.
          </p>

          <div className="space-y-4 mb-8">
            <div
              data-aos="fade-right"
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10"
            >
              <Heart className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-white">Physical Fitness</div>
                <div className="text-sm text-textcolor">
                  Cardiovascular and strength training program
                </div>
              </div>
            </div>
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10"
            >
              <Backpack className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-white">Gear & Equipment</div>
                <div className="text-sm text-textcolor">
                  Complete packing list and rental options
                </div>
              </div>
            </div>
            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10"
            >
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-white">
                  Training Timeline
                </div>
                <div className="text-sm text-textcolor">
                  12-week preparation schedule
                </div>
              </div>
            </div>
          </div>
          <div>
            <PrimaryButton
              onClick={() =>
                downloadFile({
                  file: "/images/kili.pdf",
                  name: "Kilimanjaro Preparation Guide",
                })
              }
              className="py-6"
            >
              Download Preparation Guide
            </PrimaryButton>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-80 lg:h-full relative bg-[url('/images/gallery/kili4.png')] bg-no-repeat bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-highlight/40 to-black/20"></div>

          {/* Floating Stats */}
          <div className="absolute top-8 left-8 p-4 rounded-xl backdrop-blur-sm bg-highlight/80">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-white">Success Rate</div>
          </div>

          <div className="absolute bottom-8 right-8 p-4 rounded-xl backdrop-blur-sm bg-highlight/80">
            <div className="text-2xl font-bold text-primary">7</div>
            <div className="text-sm text-white">Days to Summit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrekkingBanner;
