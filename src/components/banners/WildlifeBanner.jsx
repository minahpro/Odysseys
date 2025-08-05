import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const bigFiveAnimals = [
  {
    name: "African Lion",
    description:
      "The king of the savanna, known for their majestic manes and powerful roars",
    image:
      "https://www.bornfree.org.uk/wp-content/uploads/2023/09/Web-image-iStock-492611032.jpg",
    fact: "Lions can roar up to 5 miles away",
  },
  {
    name: "African Elephant",
    description:
      "The largest land mammal, intelligent and deeply social creatures",
    image:
      "https://cms.bbcearth.com//sites/default/files/factfiles/2024-07/el2.jpg",
    fact: "Elephants can live up to 70 years",
  },
  {
    name: "Cape Buffalo",
    description:
      "One of Africa's most dangerous animals, known for their unpredictable nature",
    image:
      "https://www.activewild.com/wp-content/uploads/2022/05/African-buffalo-cape-buffalo.jpg",
    fact: "Buffalo have excellent memories",
  },
  {
    name: "African Leopard",
    description: "Elusive and powerful, masters of stealth and climbing",
    image:
      "https://b2386983.smushcdn.com/2386983/wp-content/uploads/2020/09/A-leopard-page-800x603.jpg?lossy=0&strip=1&webp=1",
    fact: "Leopards can carry prey twice their weight up trees",
  },
  {
    name: "Rhinoceros",
    description: "Ancient giants with incredible strength and surprising speed",
    image:
      "https://cdn.shortpixel.ai/spai2/q_glossy+w_1082+to_auto+ret_img/www.fauna-flora.org/wp-content/uploads/2023/05/rhino_shutterstock_60362779-scaled-e1655220982564.jpg",
    fact: "Rhinos can run up to 35 mph",
  },
];

export default function WildlifeBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-textcolor">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg/6.png"
          alt="Wildlife in Serengeti"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center flex-all flex-col text-white space-y-8">
            <span
              data-aos="fade-down"
              className={`bg-secondary text-white h-14 w-14 flex-all rounded-full text-xs font-bold border border-accent/50 inline-block mb-6`}
            >
              <PawPrint />
            </span>

            <h1
              data-aos="fade-up"
              className={`max-w-4xl font-jua mx-auto text-3xl md:text-4xl xl:text-5xl font-semibold text-white `}
            >
              Meet <span className="text-accent">Big Five.</span>
            </h1>

            <p
              data-aos="fade-up"
              className="text-lg text-gray-200 max-w-xl mx-auto leading-relaxed"
            >
              Hover over each animal to discover fascinating facts about
              Africa's most legendary creatures
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10">
              {bigFiveAnimals.map((animal, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-accent/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={animal.image || "/placeholder.svg"}
                      alt={animal.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className=" text-white font-semibold text-sm text-center mb-2 transition-colors">
                    {animal.name}
                  </h3>
                </div>
              ))}
            </div>

            <div data-aos="fade-up" className="pt-8">
              <Link href="/plan-your-safari">
                <SecondaryButton className="px-12 py-6">
                  Begin Your Journey
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
