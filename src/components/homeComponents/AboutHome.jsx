import React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { Award, Users, Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function AboutHome({ about }) {
  const features = [
    {
      icon: Award,
      title: "15+ Years Experience",
      description: "Trusted by thousands of travelers worldwide",
    },
    {
      icon: Users,
      title: "Expert Local Guides",
      description: "Passionate guides with deep local knowledge",
    },
    {
      icon: Globe,
      title: "Sustainable Tourism",
      description: "Committed to preserving Tanzania's natural beauty",
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Tailored experiences for every traveler",
    },
  ];
  return (
    <section className="bg-white respons lg:py-20 py-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div data-aos="fade-right">
          <span
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <Globe />
          </span>
          <h2 className="md:text-4xl text-3xl text-secondary font-jua mb-4">
            About Wild Odysseys
          </h2>

          <div className="space-y-6 text-primary leading-relaxed">
            <p>
              For over 15 years, Wild Odysseys has been crafting extraordinary
              safari experiences that connect travelers with the raw beauty and
              incredible wildlife of Tanzania. Our passion for conservation and
              authentic cultural experiences drives everything we do.
            </p>

            <p>
              From the endless plains of the Serengeti to the snow-capped peak
              of Kilimanjaro, from the pristine beaches of Zanzibar to the
              wildlife-rich Ngorongoro Crater, we offer carefully curated
              adventures that create memories to last a lifetime.
            </p>

            <p>
              Our team of experienced guides, commitment to sustainable tourism,
              and dedication to exceptional service ensure that every journey
              with us is not just a trip, but a transformative experience.
            </p>
          </div>

          {!about && (
            <div className="mt-8">
              <Link href="/about">
                <PrimaryButton>Learn More About Us</PrimaryButton>
              </Link>
            </div>
          )}
        </div>

        {/* facts Grid */}
        <div
          data-aos="fade-left"
          className="grid sm:grid-cols-2 grid-cols-1 gap-6"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-primary font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-primary/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutHome;
