"use client";
import WildlifeBanner from "@/components/banners/WildlifeBanner";
import { DayTripCardPro } from "@/components/cards";
import DaysTripFilter from "@/components/Filters/DayTripsFilter";
import SubscribeSection from "@/components/homeComponents/SubscribeHome";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import { demoDataBase } from "@/data/Demo-database";
import { ExperiancesData } from "@/data/randomData";
import { Users } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function page() {
  const [active, setActive] = useState(0);
  const destinations = demoDataBase?.mainDestinations;
  const dayTripsData = demoDataBase?.experiances
    ?.slice(0, 12)
    .map((exp, index) => ({
      ...exp,
      destinations: exp?.location?.map((loc) => {
        const dest = destinations?.find((d) => d?.id === loc?.destination);
        return dest?.title;
      }),
      slug: exp?.id,
    }));

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
            <div className="py-16 text-center">
              <div data-aos="fade-down" className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <Users className="sm:w-12 sm:h-12 w-8 h-8 text-accent" />
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
                  <div className="flex-all flex-wrap sm:w-auto w-full rounded-xl p-2 overflow-hidden bg-white/20">
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
                  <div className="grid xl:grid-cols-10 md:grid-cols-2 grid-cols-1 items-center gap-8">
                    <div className="xl:col-span-6">
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
                      className="space-y-4 md:pl-10 xl:col-span-4 text-start"
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
        <div className="md:grid grid-cols-4 bg-highlight p-10 rounded-xl gap-4 items-center">
          <h2 className="font-jua text-3xl md:text-4xl text-primary">
            Filter By
          </h2>

          <DaysTripFilter />
        </div>
        {/* experiances */}
        <div className="md:grid-cols-2 mt-12 grid gap-6">
          {dayTripsData?.map((dayTrip, index) => (
            <div
              className="w-full"
              data-aos={
                // 2 should fade right and 2 should fade left
                index % 2 === 0 ? "fade-right" : "fade-left"
              }
              data-aos-delay={index * 200}
              key={dayTrip?.id}
            >
              <DayTripCardPro tour={dayTrip} />
            </div>
          ))}
        </div>
        {/* Paginations */}

        <div className="mt-12">
          <PaginationSet
            totalPosts={dayTripsData?.length}
            postsPerPage={4}
            setCurrentPage={() => {}}
            currentPage={4}
          />
        </div>
      </div>
      <WildlifeBanner />
      <SubscribeSection />
    </>
  );
}

export default page;
