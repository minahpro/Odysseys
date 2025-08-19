"use client";
import { PrimaryButton } from "@/components/buttons";
import AccommodationsHome from "@/components/homeComponents/AccommodationsHome";
import PaginationSet from "@/components/paginationSet";
import TitleHeader from "@/components/titleHeader";
import TourImagesSwiper from "@/components/TourImagesSwiper";
import { demoDataBase } from "@/data/Demo-database";
import { List, PawPrint, Tent } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <TitleHeader
        first={"Journey "}
        last={"Inspiration"}
        sub={
          "From the Okavango Delta to the deserts of Namibia to wild Rwanda and beyond, let Wilderness curate your perfect journey. "
        }
        image={"/images/bg/30.png"}
        link={{
          href: "/destinations",
          text: "View Destinations",
        }}
      />
      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <List />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Unveiling African Journey Inspiration
          </h2>
          <div className="max-w-4xl text-center space-y-6">
            <p
              className="text-lg text-gray-800 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              From the Big Five in Kenya to gorillas in Rwanda, experience
              iconic wildlife across Africa’s diverse landscapes.
            </p>
          </div>
          <div className="w-full mt-12 space-y-10">
            {demoDataBase?.tourTypes?.map((type, index) => (
              <div key={index} className="grid grid-cols-10 ">
                <div className="col-span-7 ">
                  <TourImagesSwiper
                    h={"h-[500px]"}
                    images={[
                      `/images/bg/${index + 1 * 4}.png`,
                      `/images/bg/${index + 4}.png`,
                      `/images/bg/${index + 6}.png`,
                      `/images/bg/${index + 8}.png`,
                    ]}
                  />
                </div>
                <div className="col-span-3 bg-accent hover:bg-accent/80 group hover:shadow-2xl transitions p-8 flex-all flex-col">
                  <div className="space-y-6">
                    <h1
                      data-aos="fade-left"
                      data-aos-delay="100"
                      className="text-2xl font-bold text-primary"
                    >
                      {type.title}
                    </h1>
                    {/* icons */}
                    <div
                      data-aos="fade-left"
                      data-aos-delay="200"
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-4">
                        <PawPrint className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium text-primary">
                          6 Journery
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Tent className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium text-primary">
                          34 Camps
                        </span>
                      </div>
                    </div>
                    {/* desc */}
                    <p
                      data-aos="fade-left"
                      data-aos-delay="300"
                      className="text-sm text-primary leading-6 line-clamp-5"
                    >
                      {type.overview} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Corrupti magnam nesciunt voluptatibus.
                      Voluptatum quae at tempora accusantium. Recusandae maxime
                    </p>
                    <hr
                      data-aos="fade-left"
                      data-aos-delay="400"
                      className="my-4 border-secondary/30"
                    />
                    <div data-aos="fade-left" data-aos-delay="500">
                      <Link href={`/journeys/${type.id}`}>
                        <PrimaryButton className="group-hover:bg-secondary group-hover:text-white transitions">
                          See More Details
                        </PrimaryButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <PaginationSet
              totalPosts={demoDataBase?.tourTypes?.length}
              postsPerPage={3}
              setCurrentPage={(page) => {}}
              currentPage={1}
            />
          </div>
        </div>
      </section>

      <AccommodationsHome />
    </div>
  );
}

export default page;
