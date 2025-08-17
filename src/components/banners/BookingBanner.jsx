"use client";

import { whyUsData } from "@/data/randomData";
import { Home, MapPin, Search, ShieldCheck, Sun, Users } from "lucide-react";
import { useState } from "react";

const datas = [
  {
    icon: Home,
    title: "Camps",
    description:
      "Wilderness owns over 60 luxury and immersive camps thoughout Africa",
  },
  {
    title: "Countries",
    description:
      "Offering impactful travel in a range of the finest destinations in Africa",
    icon: MapPin,
  },
  {
    title: "Private",
    description:
      "Exclusive access to some 2.3 million hectares of Africa’s best wildlife areas",
    icon: ShieldCheck,
  },

  {
    title: "Community",
    description:
      "Activities allow guests to immerse themselves in various cultures and customs",
    icon: Users,
  },
];

function BookingBanner() {
  const [active, setActive] = useState(0);
  return (
    <>
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden" data-animate>
            <div data-aos="fade-up" className="py-16 px-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <Search className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2 className="font-jua text-3xl md:text-4xl text-primary mb-4">
                Epic Safari Adventures Await
              </h2>
              <p className="font-quicksand text-lg text-secondary max-w-3xl mx-auto">
                Embark on extraordinary wildlife journeys most iconic national
                parks and witness nature's greatest spectacles
              </p>
              <div className="respons mt-12">
                {/* tabs */}
                <div className="w-full flex-all flex-col space-y-12">
                  <div className="flex-all rounded-xl p-2 overflow-hidden bg-white/20">
                    {whyUsData?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`flex-all rounded-xl px-6 py-3 text-sm font-medium ${active === index ? "bg-primary text-accent" : "text-primary"}`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {datas.map((data, index) => (
                    <div
                      key={index}
                      className="bg-white/20 p-8 text-center rounded-xl flex-all flex-col gap-2"
                    >
                      <div className="w-12 h-12 bg-secondary text-white flex-all rounded-full">
                        <data.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-primary font-bold">{data.title}</h3>
                      <p className="text-primary text-sm">{data.description}</p>
                    </div>
                  ))}
                </div>
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
