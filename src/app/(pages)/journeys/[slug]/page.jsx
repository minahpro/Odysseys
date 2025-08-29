"use client";

import { SingleHeader } from "@/components/texties";
import { Globe, LayoutList } from "lucide-react";
import { useState } from "react";
import ImagePreviewPopUp from "@/components/Popups/ImagePreviewPopUp";
import FeaturesTours from "@/components/homeComponents/FeaturesTours";
import PromoBanner from "@/components/banners/PromoBanner";
import ZanzibarTripsHome from "@/components/homeComponents/ZanzibarTrips";
import Link from "next/link";
import { PrimaryButton } from "@/components/buttons";
import Image from "next/image";
import FaqsSingle from "@/components/singleComponents/faqsSingle";

const destination = {
  name: "Honeymoon",

  photos: [
    "https://images.pexels.com/photos/1024991/pexels-photo-1024991.jpeg",
    "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
    "https://images.pexels.com/photos/4172878/pexels-photo-4172878.jpeg",
    "https://images.pexels.com/photos/33534296/pexels-photo-33534296.jpeg",
    "https://images.pexels.com/photos/1488312/pexels-photo-1488312.jpeg",
  ],
  slogan: "Land of Kilimanjaro & Serengeti",
  overview:
    "From granddad to grandchildren, we’ve got every family member covered. Action-packed itineraries provide endless options for every mood, and all-included logistics make family travel hassle-free. It’ll be the perfect first adventure for the little ones. And the ideal way to tune in and reconnect for the older ones. No need to worry or wait. Just go.",
  banner: {
    images: [
      "https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg",
      "https://images.pexels.com/photos/33543622/pexels-photo-33543622.jpeg",
      "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg",
    ],
    title: "Explore the wild in safe hands",
    sub: "Our family-first experiences are safe, educational and enriching. Every little detail, from itineraries to logistics to payments, has been pre-empted, pre-planned, and pre-sorted so you can focus on family. Unflappable camp staff, used to hosting families of all sizes, are always on hand to make your safari holiday simple. That’s because you and your family are our biggest priority.",
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
              <LayoutList />
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
                {destination?.overview}
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
      <div className="w-full py-20 bg-secondary">
        <div className="respons">
          <div className="grid lg:grid-cols-2 grid-col-1 gap-8 items-center">
            <div
              data-aos="fade-right"
              className="w-full grid grid-cols-2 gap-2"
            >
              <Image
                className="col-span-2 w-full h-60 object-cover rounded-xl"
                src={destination?.banner?.images[0]}
                width={500}
                height={500}
              />
              <Image
                className="h-40 w-full object-cover rounded-xl"
                src={destination?.banner?.images[1]}
                width={500}
                height={500}
              />
              <Image
                className="h-40 w-full object-cover rounded-xl"
                src={destination?.banner?.images[2]}
                width={500}
                height={500}
              />
            </div>
            <div data-aos="fade-left" className="space-y-8 lg:pl-12">
              <h1 className="md:text-4xl text-3xl font-jua text-accent">
                {destination?.banner?.title}
              </h1>

              <p className="text-accent leading-6">
                {destination?.banner?.sub}
              </p>

              <div>
                <Link href={`/contact`}>
                  <PrimaryButton>Book with us</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturesTours
        datas={{
          title: "Explore our romantic packages",
          sub: "Disconnect from daily life and discover remote, wild areas and spectacular",
          packages: [],
        }}
      />

      <div className="w-full bg-highlight/30 py-20">
        <div className="respons space-y-10">
          <h2 className="md:text-3xl text-xl text-primary font-jua">FAQs</h2>
          <FaqsSingle datas={destination?.faqs} />
        </div>
      </div>
    </>
  );
}

export default Page;
