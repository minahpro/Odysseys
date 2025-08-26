"use client";
import { useState } from "react";
import BookingPopup from "@/components/Popups/BookingPopup";
import TourImagesSwiper from "@/components/TourImagesSwiper";
import Image from "next/image";
import { PrimaryButton } from "@/components/buttons";
import { Clock, MapPin } from "lucide-react";
import SingleMap from "@/components/singleComponents/SingleMap";
import SingleItenaries from "@/components/singleComponents/singleItenaries";

const images = [
  "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
  "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
  "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg",
  "https://images.pexels.com/photos/24913567/pexels-photo-24913567.jpeg",
  "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
];

const tour = {
  title:
    "Chemka Hot Springs Day Trip – A Natural Oasis for Relaxation and Adventure",
  duration: 4,
  image: "/images/bg/5.png",
  countries: ["Tanzania", "Uganda", "Kenya"],
  price: 1500,
  itenaries: [
    {
      title: "Day 1 - Kilimanjaro Airport",
      image: "/images/bg/8.png",
      description:
        "On arrival at Cape Town International Airport, a Menzies representative will meet you with your name on a signboard when you enter the main terminal building. The representative will assist you through customs and immigration (if on an international flight) and to collect your luggage. You are accompanied to the arrivals hall to meet your transfer driver for your onward journey.",
      accomodation: {
        name: "Savannah Plains Camp",
        images: images,
        slug: "camp1",
      },
      destination: {
        name: "Arusha, Tanzania",
        images: images,
        slug: "arusha",
      },
    },
    {
      title: "Day 2 - Arusha National Park",

      image: "/images/bg/9.png",
      description:
        "On arrival at Cape Town International Airport, a Menzies representative will meet you with your name on a signboard when you enter the main terminal building. The representative will assist you through customs and immigration (if on an international flight) and to collect your luggage. You are accompanied to the arrivals hall to meet your transfer driver for your onward journey.",
      accomodation: {
        name: "Savannah Plains Camp",
        images: images,
        slug: "arusha",
      },
      destination: {
        name: "Arusha, Tanzania",
        images: images,
        slug: "arusha",
      },
    },
    {
      title: "Day 3 - Tarangire National Park",

      image: "/images/bg/10.png",
      description:
        "On arrival at Cape Town International Airport, a Menzies representative will meet you with your name on a signboard when you enter the main terminal building. The representative will assist you through customs and immigration (if on an international flight) and to collect your luggage. You are accompanied to the arrivals hall to meet your transfer driver for your onward journey.",
      accomodation: {
        name: "Savannah Plains Camp",
        images: images,
        slug: "tarangire",
      },
      destination: {
        name: "Tarangire, Tanzania",
        images: images,
        slug: "tarangire",
      },
    },
  ],
  destinations: [
    "Arusha, Tanzania",
    "Tarangire, Tanzania",
    "Masai mara, Kenya",
    "Ngorongoro, Tanzania",
    "Kilimanjaro, Tanzania",
    "Mount Kenya, Kenya",
    "Serengeti nation pack",
  ],
};

function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <BookingPopup
          handleOpen={open}
          handleClose={() => setOpen(false)}
          datas={{
            status: "single-tour",
            id: tour?.id,
            title: tour?.title,
            slug: tour?.slug,
          }}
        />
      )}
      <div className="">
        <div className="relative w-full overflow-hidden">
          <Image
            src={tour?.image}
            alt={tour?.title}
            width={1920}
            height={1080}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0 flex-all">
            <div className="bg-white/60 w-4/6 backdrop-blur-sm p-12 rounded">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{tour?.title}</h2>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <p className="text-sm font-medium">
                    {tour?.countries?.map((item) => item).join(",")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <p className="text-sm font-medium">{tour?.duration} days</p>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <PrimaryButton onClick={() => setOpen(true)}>
                    Enqure This Trip
                  </PrimaryButton>
                  <h2 className="text-2xl text-secondary  font-black">
                    <span className="text-sm font-medium">From</span> $
                    {tour?.price}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* map */}
        <div className="w-full h-[500px] bg-gray-100 flex-all">
          <h1 className="text-primary">Map Display Here</h1>
        </div>
        {/* destinations */}
        <div className="w-full bg-secondary py-20">
          <div className="respons space-y-10">
            <h2 className="md:text-3xl text-xl text-accent font-jua">
              Destinations you will visit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tour?.destinations.map((activity, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-white/20 rounded-lg hover:shadow-xl transitions p-2 flex gap-3 items-center"
                >
                  <div className="w-10 h-10 bg-accent rounded-xl text-primary flex-all font-bold">
                    {String.fromCharCode(97 + idx).toUpperCase()}
                  </div>
                  <h3 className="font-medium text-white">{activity}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* itenaries */}
        <div className="w-full bg-white py-20">
          <div className="respons space-y-10">
            <h2 className="md:text-3xl text-xl text-primary font-jua">
              Your Itinerary
            </h2>
            <SingleItenaries datas={tour?.itenaries} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
