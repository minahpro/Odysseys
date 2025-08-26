"use client";

import { SingleHeader } from "@/components/texties";
import { Globe } from "lucide-react";
import { useState } from "react";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";
import PromoBanner from "@/components/banners/PromoBanner";
import ZanzibarTripsHome from "@/components/homeComponents/ZanzibarTrips";
import FaqsSingle from "@/components/singleComponents/faqsSingle";

const destination = {
  name: "Game drive",

  photos: [
    "https://images.pexels.com/photos/1476619/pexels-photo-1476619.jpeg",
    "https://images.pexels.com/photos/4404524/pexels-photo-4404524.jpeg",
    "https://images.pexels.com/photos/3529692/pexels-photo-3529692.jpeg",
    "https://images.pexels.com/photos/19986882/pexels-photo-19986882.jpeg",
    "https://images.pexels.com/photos/887828/pexels-photo-887828.jpeg",
  ],
  slogan: "Land of Kilimanjaro & Serengeti",
  overview:
    "Home to Africa’s most fascinating wildlife phenomenon, the Great Migration - immerse yourself in the vast, iconic Serengeti National Park.One of the world’s most famous game-viewing parks, the Serengeti is host to the Great Migration, where 2 million wildebeest, zebra and Thomson’s gazelles move together across the plains, predators following closely in their wake. The vast open landscape makes the Serengeti one of the best places to view wildlife on Earth.",

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
          <div className="respons flex-all flex-col">
            <span
              data-aos="fade-up"
              className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
            >
              <Globe />
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="md:text-4xl text-3xl text-secondary font-jua mb-4"
            >
              {destination?.name}
            </h2>
            <div className="max-w-4xl text-center">
              <p
                className="text-lg text-gray-800 leading-relaxed mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Gear up for thrilling game drives on a safari with Wilderness. A
                wildlife sighting is always unpredictable and that’s what makes
                a game drive so exciting. Look out for tracks. Listening for
                alarm calls and be on the alert for nearby predators. There’s so
                much to see, and being the first to spot something brings a
                whole new level of satisfaction to your day.
              </p>
              <p
                className="text-lg text-gray-800 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Our roots are deeply embedded in the Tanzanian soil, allowing us
                to offer unique insights and access to experiences that go
                beyond the typical tourist trail. We believe in creating
                connections – between our guests and nature, between travelers
                and local communities, and between dreams and reality.
              </p>
            </div>
          </div>
        </section>
      </div>
      <FeaturesTours
        datas={{
          title: "Game drive with Wilderness",
          sub: "Whether you’re a family on safari, a photographer, big cat enthusiast or avid birder.",
          packages: [],
        }}
      />
      <PromoBanner
        title="Beyond the Big Five"
        subtitle="Discover hidden gems and unique experiences that go beyond the typical safari."
        imageSrc="/images/bg/3.png"
        contentList={[
          {
            icon: "Leaf",
            text: "Walking safaris for an intimate bush experience",
          },
          {
            icon: "Sun",
            text: "Hot air balloon rides over the Serengeti at dawn",
          },
          {
            icon: "Users",
            text: "Authentic cultural visits to Maasai villages",
          },
          { icon: "Compass", text: "Birdwatching in diverse ecosystems" },
        ]}
        buttonText="Explore Unique Experiences"
        buttonLink="/tours"
        bgColor="bg-secondary"
      />
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
