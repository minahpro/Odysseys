"use client";

import { Search } from "lucide-react";
import { MiniBookingForm } from "../homeComponents/miniBookingForm";

function BookingBanner() {
  return (
    <>
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden" data-animate>
            <div className="py-16 px-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <Search className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2 className="font-jua text-3xl md:text-4xl text-primary mb-4">
                Epic Safari Adventures Await
              </h2>
              <p className="font-quicksand text-lg text-secondary mb-8 max-w-3xl mx-auto">
                Embark on extraordinary wildlife journeys through Tanzania's
                most iconic national parks and witness nature's greatest
                spectacles
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MiniBookingForm />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-secondary/20 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-primary/20 rounded-full"></div>
            <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookingBanner;
