"use client";

import { SingleHeader } from "@/components/texties";
import Link from "next/link";
import {
  MapPin,
  Sun,
  ListTodo,
  PawPrint,
  Check,
  AlertTriangleIcon,
  Backpack,
  Thermometer,
} from "lucide-react";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import Image from "next/image";
import { demoDataBase } from "@/data/Demo-database";
import SingleMap from "@/components/singleComponents/SingleMap";
import SingleSmallAcc from "@/components/singleComponents/SingleSmallAcc";
import FaqsSingle from "@/components/singleComponents/faqsSingle";
import ExperiancesSingle from "@/components/singleComponents/ExperiancesSingle";

const destination = {
  name: "Tanzania",
  photos: [
    "https://images.pexels.com/photos/13869972/pexels-photo-13869972.jpeg",
    "https://images.pexels.com/photos/3307279/pexels-photo-3307279.jpeg",
    "https://images.pexels.com/photos/13338819/pexels-photo-13338819.jpeg",
    "https://images.pexels.com/photos/3566237/pexels-photo-3566237.jpeg",
    "https://images.pexels.com/photos/31105917/pexels-photo-31105917.jpeg",
  ],
  slogan: "Land of Kilimanjaro & Serengeti",
  overview:
    "Beyond the exotic spice island of Zanzibar and the dramatic snow-capped peaks of Mount Kilimanjaro, the famed plains of the Serengeti in Tanzania offer some of the best game-viewing on Earth. Tanzania is home to some of the most iconic African national parks, private game reserves and conservation areas, including the Ngorongoro Crater and renowned Serengeti National Park, where over a million wildebeest and zebras cross the plains in the Great Migration.",

  datas: {
    facts: {
      title: "Facts",
      overview:
        "Tanzania is the largest country in East Africa and includes the islands of Zanzibar, Pemba, and Mafia. The country is about twice the size of California and is bordered by the Indian Ocean. Mount Kilimanjaro is the highest point in Africa and is flanked by three of the largest lakes on the continent. Lake Victoria, in the north, Lake Tanganyika in the west, and Lake Nyasa in the south-west. <br/>Clouds of dust across the plains. Horns, hooves, stripes; behold Africa’s most impressive wildlife spectacle, the Great Migration. Watch hundreds of thousands of wildebeest, zebra and other plains game travel an endless journey, covering the entire Serengeti; crossing its rivers, braving its predators. Grazing, drinking, breeding, moving as one.",
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
    whatToBring: {
      title: "What to Bring",
      items: [
        "Water",
        "Snacks",
        "Camera",
        "Phone",
        "ID",
        "Passport",
        "Money",
        "Clothes",
        "Shoes",
        "Socks",
        "Hat",
        "Glasses",
        "Mask",
      ],
    },
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

  return (
    <>
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
              className="bg-white rounded-2xl space-y-6 sm:p-12 p-6"
            >
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <h2 className="md:text-4xl text-3xl text-primary font-jua">
                  {destination?.name}
                </h2>
                <SecondaryButton
                  onClick={() => setOpenGallery(true)}
                  className="text-sm bg-white border border-secondary text-secondary hover:text-primary"
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

              <div className="flex flex-col space-y-12">
                <div className="flex flex-wrap w-auto items-center rounded-xl p-2 overflow-hidden bg-accent">
                  {Object.entries(destination.datas).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex-all rounded-xl px-6 py-3 text-sm font-medium ${activeTab === key ? "bg-primary text-accent" : "text-primary"}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
                {/* tab container */}

                <div className="min-h-[400px]">
                  {(() => {
                    const section = destination.datas[activeTab];
                    if (!section) return null;

                    // Facts Tab
                    if (section.title === "Facts") {
                      return (
                        <div className="grid lg:grid-cols-10 grid-cols-1 gap-8">
                          <div className="lg:col-span-6">
                            <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                              <MapPin className="text-secondary" />{" "}
                              {destination?.slogan}
                            </h2>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section?.overview,
                              }}
                              className="text-gray-800 mt-3 leading-relaxed"
                            />
                          </div>
                          <div className="space-y-4 pl-10 border-l lg:col-span-4">
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

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

                    // what to bring
                    if (section.title === "What to Bring") {
                      return (
                        <div className="space-y-10">
                          <h2 className="font-bold text-xl text-primary flex items-center gap-4">
                            <Backpack className="text-secondary" /> Essential
                            Items
                          </h2>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {section?.items?.map((item, index) => (
                              <div
                                key={item}
                                className="flex items-center gap-3 bg-accent/20 rounded-lg p-3 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                              >
                                <Check className="w-4 h-4 text-secondary" />
                                <span className="text-gray-700 font-medium capitalize">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 p-4 bg-secondary rounded-lg border-l-4 border-white">
                            <p className="text-white text-sm flex md:flex-nowrap flex-wrap items-center gap-2">
                              <AlertTriangleIcon className="w-4 h-4" />
                              <strong>Pro Tip:</strong> Pack light but don't
                              forget the essentials. Weather can change quickly
                              in {destination?.name}.
                            </p>
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

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                              <div className="bg-accent/40 rounded-xl p-6 mb-6">
                                <h3 className="font-semibold text-lg text-primary mb-3">
                                  Climate Overview
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                  {section?.overview}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h3 className="font-semibold text-lg text-primary mb-4">
                                Seasonal Guide
                              </h3>
                              {section?.items?.map((item, index) => (
                                <div
                                  key={item.title}
                                  className="bg-white rounded-lg p-4 shadow-md border-l-4 border-secondary hover:shadow-lg transition-all duration-300 transform hover:translate-x-2"
                                  style={{ animationDelay: `${index * 200}ms` }}
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
                      );
                    }

                    return null;
                  })()}
                </div>
              </div>
            </div>
            {/* experiances */}
            <div
              data-aos="fade-up"
              className="bg-white rounded-2xl space-y-6 md:p-12 p-6"
            >
              <div className="space-y-6">
                <h2 className="md:text-2xl text-xl text-primary font-jua">
                  {destination?.name} Safari Experiances
                </h2>
                <ExperiancesSingle datas={demoDataBase?.experiances} />
              </div>
            </div>
            {/* map */}
            <div
              data-aos="fade-up"
              className="bg-white rounded-2xl space-y-6 md:p-12 p-6"
            >
              <div className="space-y-6">
                <h2 className="md:text-2xl text-xl text-primary font-jua">
                  {destination?.name} Location
                </h2>
                <div className="sm:h-[400px] h-[250px]">
                  <SingleMap />
                </div>
              </div>
            </div>

            {/* destinations */}
            <div className="bg-white rounded-2xl space-y-6 md:p-12 p-6">
              <div className="space-y-6">
                <h2 className="md:text-2xl text-xl text-primary font-jua">
                  Destinations Found In {destination?.name}
                </h2>

                <div className="space-y-10">
                  {demoDataBase?.subDestinations
                    ?.slice(0, 3)
                    ?.map((item, index) => (
                      <div className="w-full" key={index}>
                        <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-6">
                          <div className="space-y-8 sm:p-8 p-4 bg-accent/20 rounded">
                            <h1 className="text-2xl font-bold text-primary">
                              {item.title}
                            </h1>
                            <p className="text-primary leading-6 line-clamp-4">
                              {item.overview} Lorem ipsum dolor sit amet
                              consectetur adipisicing elit. Corrupti magnam
                              nesciunt voluptatibus. Voluptatum quae at tempora
                              accusantium. Recusandae maxime Lorem ipsum dolor
                              sit amet consectetur adipisicing elit. Corrupti
                              magnam nesciunt voluptatibus. Voluptatum quae at
                              tempora accusantium. Recusandae maxime
                            </p>

                            <hr className="my-4 border-secondary/30" />
                            <div>
                              <Link
                                href={`/destinations/sub-destination/${item.id}`}
                              >
                                <PrimaryButton className="bg-secondary text-white transitions">
                                  See More Details
                                </PrimaryButton>
                              </Link>
                            </div>
                          </div>
                          <Image
                            data-aos="fade-left"
                            className="w-full md:h-96 h-48 object-cover"
                            src={
                              `/images/bg/${index + 1}.png` ||
                              "/placeholder.svg"
                            }
                            alt={item.title}
                            width={250}
                            height={250}
                          />
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex-all">
                  <button className="px-6 py-2 bg-accent text-primary font-semibold text-sm">
                    Load More
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
