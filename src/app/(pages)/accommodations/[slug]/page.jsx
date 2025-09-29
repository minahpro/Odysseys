"use client";

import { SingleHeader } from "@/components/texties";
import { Check, CircleCheck } from "lucide-react";
import { SecondaryButton } from "@/components/buttons";
import Image from "next/image";
import SingleMap from "@/components/singleComponents/SingleMap";
import FaqsSingle from "@/components/singleComponents/faqsSingle";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";

const destination = {
  name: "Savannah Plains Camp",
  photos: [
    "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
    "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg",
    "https://images.pexels.com/photos/24913567/pexels-photo-24913567.jpeg",
    "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
  ],
  overview:
    "Beyond the exotic spice island of Zanzibar and the dramatic snow-capped peaks of Mount Kilimanjaro, the famed plains of the Serengeti in Tanzania offer some of the best game-viewing on Earth. Tanzania is home to some of the most iconic African national parks, private game reserves and conservation areas, including the Ngorongoro Crater and renowned Serengeti National Park, where over a million wildebeest and zebras cross the plains in the Great Migration.",

  amineties: [
    "Wifi",
    "Air conditioning",
    "TV",
    "Kitchen",
    "Breakfast",
    "Pet friendly",
    "Fridge",
    "Packing area",
  ],
  activities: [
    {
      title: "Safari Adventure",
      description: "Explore the wild with guided safaris.",
    },
    { title: "Beach Relaxation", description: "Unwind on pristine beaches." },
    {
      title: "Cultural Tours",
      description: "Discover local traditions and history.",
    },
    {
      title: "Water Sports",
      description: "Enjoy kayaking, snorkeling, and more.",
    },
    {
      title: "Hiking",
      description: "Explore the beautiful hiking trails.",
    },
    {
      title: "Camping",
      description: "Relax and unwind in the great outdoors.",
    },
    {
      title: "Snorkeling",
      description: "Explore the underwater world.",
    },
    {
      title: "Diving",
      description: "Dive into the water.",
    },
  ],
  banners: [
    {
      title: "Restaurant",
      overview:
        "We have always existed to protect, explore and expand the world’s wilderness. Today, we help protect 6 million acres (2.3 million hectares) of land. We channel our conservation and hospitality business as a force for lasting, positive impact. To achieve this, we focus our conservation and community empowerment programmes under three key impact pillars: Educate, Empower and Protect.",
      image:
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    },
    {
      title: "Bar",
      overview:
        "We have always existed to protect, explore and expand the world’s wilderness. Today, we help protect 6 million acres (2.3 million hectares) of land. We channel our conservation and hospitality business as a force for lasting, positive impact. To achieve this, we focus our conservation and community empowerment programmes under three key impact pillars: Educate, Empower and Protect.",
      image: "https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg",
    },
    {
      title: "Swimming pool",
      overview:
        "We have always existed to protect, explore and expand the world’s wilderness. Today, we help protect 6 million acres (2.3 million hectares) of land. We channel our conservation and hospitality business as a force for lasting, positive impact. To achieve this, we focus our conservation and community empowerment programmes under three key impact pillars: Educate, Empower and Protect.",
      image: "https://images.pexels.com/photos/261105/pexels-photo-261105.jpeg",
    },
  ],

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

              <div className="space-y-4">
                <h2 className="font-bold text-xl text-primary">Amineties</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {destination?.amineties?.map((item, index) => (
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
                <div className="md:h-[400px] h-[250px]">
                  <SingleMap />
                </div>
              </div>
            </div>

            {/* banners */}
            <div className="bg-white rounded-2xl space-y-6 sm:p-12">
              <div className="space-y-10">
                {destination?.banners?.map((item, index) => (
                  <div className="w-full" key={index}>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 sm:gap-6">
                      <Image
                        data-aos={`${index % 2 === 0 ? "fade-right" : "fade-left"}`}
                        className={`${index % 2 === 0 ? "order-1" : "order-2"} w-full h-96 object-cover`}
                        src={item?.image || "/placeholder.svg"}
                        alt={item.title}
                        width={250}
                        height={250}
                      />
                      <div
                        data-aos={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}
                        className={`${index % 2 === 0 ? "lg:order-2 order-1" : "lg:order-1 order-2"} space-y-8 p-8 bg-accent/20 rounded`}
                      >
                        <h1 className="text-2xl font-bold text-primary">
                          {item.title}
                        </h1>
                        <hr className="my-4 border-secondary/30" />

                        <p className="text-primary leading-6 ">
                          {item.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full bg-primary py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-3xl text-xl text-accent font-jua">
            {destination?.name} Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {destination?.activities.map((activity, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white/20 rounded-xl shadow-lg p-10 flex flex-col items-center hover:bg-primary transitions"
              >
                <div className="mb-4">
                  <CircleCheck className="text-white w-8 h-8" />
                </div>
                <h3 className="font-bold text-accent mb-2 text-center">
                  {activity.title}
                </h3>
                <p className="text-gray-200 text-sm text-center">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FeaturesTours
        datas={{
          title: `${destination?.name} Journerys`,
          sub: "Whether you’re a family on safari, a photographer, big cat enthusiast or avid birder.",
          packages: [],
        }}
      />
      <div className="w-full bg-highlight/40 py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-3xl text-xl text-primary font-jua">FAQs</h2>
          <FaqsSingle datas={destination?.faqs} />
        </div>
      </div>
    </>
  );
}

export default Page;
