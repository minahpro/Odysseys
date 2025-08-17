import React from "react";
import {
  CheckCircle,
  MapPin,
  Tent,
  Sun,
  Plane,
  Compass,
  Settings,
  Users,
  Leaf,
  Award,
  Home,
  Hotel,
  ShieldCheck,
  Car,
  FireExtinguisherIcon as FirstAidKit,
  Heart,
  Backpack,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { PrimaryButton } from "../buttons";
import Link from "next/link";

const icons = {
  CheckCircle: CheckCircle,
  MapPin: MapPin,
  Tent: Tent,
  Sun: Sun,
  Plane: Plane,
  Compass: Compass,
  Settings: Settings,
  Users: Users,
  Leaf: Leaf,
  Award: Award,
  Home: Home,
  Hotel: Hotel,
  ShieldCheck: ShieldCheck,
  Car: Car,
  FirstAidKit: FirstAidKit,
  Heart: Heart,
  Time: Clock,
  Bag: Backpack,
};

function PromoBanner({
  title,
  subtitle,
  imageSrc,
  contentList, // Array of { icon: "IconName", text: "Description" }
  buttonText,
  buttonLink,
  reverse = false, // Image on right if true
  bgColor = "bg-highlight",
  textColor = {
    title: "text-accent",
    sub: "text-black font-medium",
    list: "text-black",
    icon: "text-accent",
    button: "text-accent",
  },
}) {
  const imageOrder = reverse ? "order-2" : "order-1";
  const contentOrder = reverse ? "order-1" : "order-2";

  return (
    <section className={`py-16 md:py-24 ${bgColor}`}>
      <div className="respons grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className={`relative h-80 md:h-[500px] rounded-xl overflow-hidden shadow-xl ${imageOrder}`}
          data-aos={reverse ? "fade-right" : "fade-left"}
        >
          <Image
            src={imageSrc || "/placeholder.svg?height=600&width=800"}
            alt={"Safari Scene"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className={`${contentOrder}`}
          data-aos={reverse ? "fade-left" : "fade-right"}
        >
          <h1
            className={`!text-left md:text-4xl text-3xl font-jua !mb-4 ${textColor?.title}`}
          >
            {title}
          </h1>
          <p className={`!text-left !mb-8 ${textColor?.sub}`}>{subtitle}</p>
          {contentList && (
            <ul className="space-y-4 mb-8">
              {contentList.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <li
                    key={index}
                    className={`flex items-start gap-3 font-quicksand text-lg ${textColor?.list}`}
                  >
                    {Icon && (
                      <Icon
                        className={`w-6 h-6 flex-shrink-0 ${textColor?.icon}`}
                      />
                    )}
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {buttonText && buttonLink && (
            <Link href={buttonLink || "/"}>
              <PrimaryButton className={`text-sm ${textColor?.button}`}>
                {buttonText}
              </PrimaryButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
