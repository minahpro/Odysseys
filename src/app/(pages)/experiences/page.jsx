"use client";
import TitleHeader from "@/components/titleHeader";
import { ExperiancesData } from "@/data/randomData";
import { Search, Users } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function page() {
  const [active, setActive] = useState(0);

  return (
    <>
      <TitleHeader
        first={"Exper"}
        last={"iences"}
        sub={
          "Walk. Boat. Barge. Float. Fly. Drive. Ride. Trek. Track. Discover. A world of experiences awaits with Wilderness."
        }
        image={"/images/bg/36.png"}
        link={{
          href: "/blog",
          text: "Read Our stories",
        }}
      />
      <section className="py-16 bg-accent/40">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden" data-animate>
            <div className="py-16 px-8 text-center">
              <div data-aos="fade-down" className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <Users className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2
                data-aos="fade-down"
                className="font-jua text-3xl md:text-4xl text-primary mb-4"
              >
                Do something different.
              </h2>
              <p
                data-aos="fade-down"
                className="font-quicksand text-lg text-secondary max-w-3xl mx-auto"
              >
                Safari vehicles are being refuelled. Delicious bush brunches are
                being baked. Star-Beds are being prepared. The people of
                Wilderness are ready to welcome you. Travelling is not only
                about the places you visit or the things you’ll see, it’s about
                making memories and experiencing something you’ve never done
                before. Whatever that is, we’re ready for you.
              </p>
              <div className="respons mt-12">
                {/* tabs */}
                <div className="w-full flex-all flex-col space-y-12">
                  <div className="flex-all rounded-xl p-2 overflow-hidden bg-white/20">
                    {ExperiancesData?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`flex-all rounded-xl px-6 py-3 text-sm font-medium ${active === index ? "bg-primary text-accent" : "text-primary"}`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                  {/* tab container */}
                  <div className="grid grid-cols-10 items-center gap-8">
                    <div className="col-span-6">
                      <Image
                        data-aos="fade-right"
                        className="w-full h-[350px] object-cover rounded-xl shadow-2xl hover:scale-95 transitions"
                        src={ExperiancesData[active].image}
                        alt={ExperiancesData[active].title}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div
                      data-aos="fade-left"
                      className="space-y-4 pl-10 col-span-4 text-start"
                    >
                      <h2 className="font-jua text-xl md:text-2xl text-primary">
                        {ExperiancesData[active].subTitle}
                      </h2>
                      <hr className="w-14 h-1 bg-secondary" />

                      <p className="text-primary leading-7">
                        {ExperiancesData[active].desc}
                      </p>
                    </div>
                  </div>
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

      <div className="respons lg:py-20 py-10">
        <div className="flex justify-between items-center">
          <h2 className="font-jua text-3xl md:text-4xl text-primary mb-4">
            under construction
          </h2>
        </div>
      </div>
    </>
  );
}

export default page;
