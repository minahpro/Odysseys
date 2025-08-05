import { Shield, Award, Users, Clock, Globe, Star } from "lucide-react";
import { PlainTitle } from "../texties";
import { PrimaryButton } from "../buttons";
import Image from "next/image";

const reasons = [
  {
    icon: Award,
    title: "Expert Local Guides",
    description:
      "Our guides are born and raised in Tanzania, offering unparalleled local knowledge.",
  },
  {
    icon: Users,
    title: "Eco-Friendly Tours",
    description:
      "We are committed to sustainable tourism that respects wildlife and local communities.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "We prioritize your safety with well-maintained vehicles and certified guides.",
  },
  {
    icon: Clock,
    title: "Tailor-Made Itineraries",
    description:
      "We customize every trip to match your interests, budget, and travel style.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="sm:py-28 py-10">
      <div className="respons">
        <div
          data-aos="fade-right"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="lg:grid hidden grid-cols-2 gap-2 items-center">
            <Image
              src="/images/copy.jpg"
              alt="Local community"
              width={300}
              height={200}
              className="rounded-2xl w-full h-[500px] object-cover"
            />
            <Image
              src="/images/gallery/kili3.png"
              alt="Local community"
              width={300}
              height={200}
              className="rounded-2xl w-full h-[500px] object-cover"
            />
          </div>
          <div data-aos="fade-left" data-aos-delay="100" className="space-y-8">
            <span
              className={`bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/30 inline-block mb-6`}
            >
              ⭐ Why Travel With Us?
            </span>

            {reasons?.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-jua font-bold text-white">
                    {point.title}
                  </h3>
                  <p className="text-textcolor">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
