"use client";

import { SingleHeader } from "@/components/texties";
import { MapPin, Sun, ListTodo, PawPrint, Thermometer } from "lucide-react";
import { useState } from "react";
import { SecondaryButton } from "@/components/buttons";
import Image from "next/image";
import ExperiancesSingle from "@/components/singleComponents/ExperiancesSingle";
import { demoDataBase } from "@/data/Demo-database";
import SingleMap from "@/components/singleComponents/SingleMap";
import SingleSmallAcc from "@/components/singleComponents/SingleSmallAcc";
import FaqsSingle from "@/components/singleComponents/faqsSingle";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import TourPackagesSingle from "@/components/singleComponents/TourPackagesSingle";

const destination = {
  name: "Serengeti National Park",

  photos: [
    "https://images.pexels.com/photos/17663712/pexels-photo-17663712.jpeg",
    "https://images.pexels.com/photos/15341662/pexels-photo-15341662.jpeg",
    "https://images.pexels.com/photos/3529692/pexels-photo-3529692.jpeg",
    "https://images.pexels.com/photos/19986882/pexels-photo-19986882.jpeg",
    "https://images.pexels.com/photos/17820242/pexels-photo-17820242.jpeg",
  ],
  slogan: "Land of Kilimanjaro & Serengeti",
  overview:
    "Home to Africa’s most fascinating wildlife phenomenon, the Great Migration - immerse yourself in the vast, iconic Serengeti National Park.One of the world’s most famous game-viewing parks, the Serengeti is host to the Great Migration, where 2 million wildebeest, zebra and Thomson’s gazelles move together across the plains, predators following closely in their wake. The vast open landscape makes the Serengeti one of the best places to view wildlife on Earth.",

  datas: {
    weather: {
      title: "Weather",
      overview:
        "Tanzania enjoys a tropical climate year-round, but due to its diverse geography, rainfall and humidity vary. The hottest and most humid part of the country is the coast. Other low-lying areas, such as the western and southern parks, are also hot but less humid. The rest of the interior is much milder and cools down significantly at night. Tanzania has two rainy seasons.",
      items: [
        { title: "Transition Season", overview: "March to May" },
        { title: "Rainy Season", overview: "June to August" },
        {
          title: "Snowy Season",
          overview: "September to November",
        },
      ],
    },
    facts: {
      title: "Facts",
      overview:
        "Located in northern Tanzania, the Serengeti forms part of the country’s renowned northern safari circuit. Spanning almost 15,000 square kilometres, (it’s slightly bigger than Connecticut) of vast grassy plains, flat-topped acacia trees, rocky kopjes and undulating savannah landscape, this region is a contender for one of the best wildlife experiences in Africa. <br/> <br/>A vast grassland dotted with spreading acacias and rocky outcrops. Thousands of wildebeest, zebra and other plains game as far as the eye can see. Predators stalk prey on the endless plains, singling out the young, the weak and the slow; the Serengeti delivers a quintessentially African safari experience.",
      items: [
        { title: "Population", overview: "60 million" },
        { title: "Area", overview: "65,200 square kilometers" },
        { title: "Capital", overview: "Dodoma" },
        { title: "Currency", overview: "Tanzanian Shilling" },
        { title: "Language", overview: "Swahili" },
        { title: "Time Zone", overview: "UTC+3" },
      ],
    },
    habitats: {
      title: "Habitats",
      items: [
        {
          title: "Open plains",
          image:
            "https://images.pexels.com/photos/3026097/pexels-photo-3026097.jpeg",
          subTitle: "Savannah landscape covers the volcanic grasslands.",
        },
        {
          title: "Mountains",
          image:
            "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg",
          subTitle: "Home to the highest mountain in Africa.",
        },
        {
          title: "Rivers",
          image:
            "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
          subTitle:
            "Tanzania is home to some of the longest rivers in the world.",
        },
        {
          title: "Forests",
          image:
            "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
          subTitle:
            "Tanzania is home to some of the longest rivers in the world.",
        },
        {
          title: "Waterfalls",
          image:
            "https://images.pexels.com/photos/237321/pexels-photo-237321.jpeg",
          subTitle:
            "Tanzania is home to some of the longest rivers in the world.",
        },
      ],
    },
    wildlife: {
      title: "Wildlife",
      items: [
        {
          title: "Lion",
          image: "/placeholder.svg",
        },
        {
          title: "Cheetah",
          image: "/placeholder.svg",
        },
        {
          title: "Zebra",
          image: "/placeholder.svg",
        },
        {
          title: "Giraffe",
          image: "/placeholder.svg",
        },
        {
          title: "Elephant",
          image: "/placeholder.svg",
        },
        {
          title: "Monkey",
          image: "/placeholder.svg",
        },
      ],
    },
  },
  faqs: [
    {
      question: "Why Tanzania is the best destination to visit?",
      answer:
        "because Tanzania is a beautiful country with a rich history and culture. It is a country of contrasts, with its mountains, deserts, and plains. Tanzania is also a country of contrasts, with its mountains, deserts, and plains.",
    },
    {
      question: "What is the best time to visit Tanzania?",
      answer:
        "The best time to visit Tanzania is from June to August. This is the time of year when the weather is warm and the rains are light.",
    },
    {
      question: "What should I bring to Tanzania?",
      answer:
        "You should bring your camera, phone, ID, passport, money, clothes, shoes, socks, hat, glasses, and mask.",
    },
    {
      question: "What is the best way to get to Tanzania?",
      answer:
        "You can get to Tanzania by air, train, or car. The best way to get to Tanzania by air is to fly to Dar es Salaam, Tanzania. The best way to get to Tanzania by train is to train to Dar es Salaam, Tanzania. The best way to get to Tanzania by car is to drive to Dar es Salaam, Tanzania.",
    },
  ],
};

function Page() {
  const [activeTab, setActiveTab] = useState(Object.keys(destination.datas)[0]);
  const [openGallery, setOpenGallery] = useState(false);

  return (
    <>
      {openGallery && (
        <ImagePreviewPopUp
          images={destination?.photos}
          title={destination?.name}
          handleClose={() => setOpenGallery(false)}
          handleOpen={() => setOpenGallery(true)}
        />
      )}
      <div className="bg-accent/40 pt-8 pb-20">
        <div className="respons">
          <SingleHeader
            data={{
              photos: destination?.photos,
              title: destination?.name,
              button: {
                text: "Book This Destination",

                onClick: () => setOpen(true),
              },
            }}
          />
        </div>

        <section className="mt-12 ">
          <div className="respons space-y-12">
            <div
              data-aos="fade-up"
              className="bg-white rounded-2xl space-y-6 p-12"
            >
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <h2 className="md:text-4xl text-3xl text-primary font-jua">
                  {destination?.name}
                </h2>
                <SecondaryButton
                  onClick={() => setOpenGallery(true)}
                  className="text-sm bg-secondary text-white hover:bg-primary"
                >
                  View All Images
                </SecondaryButton>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: destination?.overview,
                }}
                className="text-lg text-gray-800 leading-relaxed"
              />

              <div className="grid grid-cols-12 items-start gap-6 pt-12">
                <div className="col-span-2 w-full space-y-3 rounded-xl p-2 overflow-hidden bg-accent">
                  {Object.entries(destination.datas).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex-all w-full rounded-xl px-6 py-3 text-sm font-medium ${activeTab === key ? "bg-primary text-accent" : "text-primary"}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
                {/* tab container */}

                <div className="min-h-[400px] col-span-10">
                  {(() => {
                    const section = destination.datas[activeTab];
                    if (!section) return null;

                    // Facts Tab
                    if (section.title === "Facts") {
                      return (
                        <div className="grid grid-cols-10 gap-8">
                          <div className="col-span-6">
                            <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                              <MapPin className="text-secondary" /> What you
                              need to know
                            </h2>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section?.overview,
                              }}
                              className="text-gray-800 mt-3 leading-relaxed"
                            />
                          </div>
                          <div className="space-y-4 pl-10 border-l col-span-4">
                            {section?.items?.map((item) => (
                              <div className="space-y-2" key={item.title}>
                                <h3 className="font-semibold text-primary">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-secondary">
                                  {item.overview}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Habitats Tab
                    if (section.title === "Habitats") {
                      return (
                        <div className="space-y-10">
                          <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                            <ListTodo className="text-secondary" />{" "}
                            {destination?.name} Habitats
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section?.items?.map((item, index) => (
                              <div
                                key={item.title}
                                className="group bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                              >
                                <div className="overflow-hidden h-48">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-110 transitions"
                                  />
                                </div>
                                <div className="p-5">
                                  <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">
                                    {item.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.subTitle}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // wildlife
                    if (section.title === "Wildlife") {
                      return (
                        <div className="space-y-10">
                          <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                            <PawPrint className="text-secondary" /> Wildlife you
                            will see
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {section?.items?.map((item, index) => (
                              <div
                                key={item.title}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="relative">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    width={250}
                                    height={250}
                                    className="w-full h-40 object-cover group-hover:brightness-110 transition-all duration-500"
                                  />
                                </div>
                                <div className="p-4 text-center">
                                  <h3 className="font-semibold text-primary group-hover:text-secondary transition-colors">
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Weather Tab
                    if (section.title === "Weather") {
                      return (
                        <div className="space-y-10">
                          <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                            <Thermometer className="text-secondary" /> Climate &
                            Weather
                          </h2>

                          <div className="space-y-8">
                            <div className="bg-accent/40 rounded-xl p-6">
                              <h3 className="font-semibold text-lg text-primary mb-3">
                                Climate Overview
                              </h3>
                              <p className="text-gray-700 leading-relaxed">
                                {section?.overview}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <h3 className="font-semibold text-lg text-primary mb-4">
                                Seasonal Guide
                              </h3>
                              <div className="grid grid-cols-2 gap-6">
                                {section?.items?.map((item, index) => (
                                  <div
                                    key={item.title}
                                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-secondary hover:shadow-lg transition-all duration-300 transform hover:translate-x-2"
                                    style={{
                                      animationDelay: `${index * 200}ms`,
                                    }}
                                  >
                                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                      <Sun className="w-5 h-5 text-yellow-600" />
                                      {item.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                      {item.overview}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })()}
                </div>
              </div>
            </div>

            {/* map */}
            <div
              data-aos="fade-up"
              className="bg-white rounded-2xl space-y-6 p-12"
            >
              <div className="space-y-6">
                <h2 className="md:text-2xl text-xl text-primary font-jua">
                  {destination?.name} Location
                </h2>
                <div className="h-[400px]">
                  <SingleMap />
                </div>
              </div>
            </div>

            {/* destinations */}
            <div className="bg-white rounded-2xl space-y-6 p-12">
              <div className="space-y-6">
                <h2 className="md:text-2xl text-xl text-primary font-jua">
                  Journey with Wilderness
                </h2>

                <TourPackagesSingle />

                <div className="flex-all">
                  <button className="px-6 py-2 rounded bg-secondary text-white font-semibold text-sm">
                    See All Journeys
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full bg-primary py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-3xl text-xl text-white font-jua">
            Best Camps Found In {destination?.name}
          </h2>
          <SingleSmallAcc datas={demoDataBase?.camps} />
        </div>
      </div>

      {/* experiances */}
      <div className="w-full bg-accent/40 py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-2xl text-xl text-primary font-jua">
            {destination?.name} Safari Experiances
          </h2>
          <ExperiancesSingle datas={demoDataBase?.experiances} />
        </div>
      </div>

      <div className="w-full bg-white py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-3xl text-xl text-primary font-jua">FAQs</h2>
          <FaqsSingle datas={destination?.faqs} />
        </div>
      </div>
    </>
  );
}

export default Page;
