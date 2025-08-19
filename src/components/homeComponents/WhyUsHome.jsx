import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section className="sm:py-28 py-10 bg-accent/40">
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
          It all started in 1983
        </h2>
        <div className="max-w-4xl text-center">
          <p
            className="text-lg text-gray-800 leading-relaxed mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Wild Odysseys was founded with a singular vision: to share the
            unparalleled beauty and magic of Tanzania with the world,
            responsibly and authentically. As a locally-owned and operated
            company, we bring an intimate knowledge of the land, its wildlife,
            and its people to every journey we craft.
          </p>
          <p
            className="text-lg text-gray-800 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Our roots are deeply embedded in the Tanzanian soil, allowing us to
            offer unique insights and access to experiences that go beyond the
            typical tourist trail. We believe in creating connections – between
            our guests and nature, between travelers and local communities, and
            between dreams and reality.
          </p>
          <Link
            href={"https://www.safaribookings.com/tanzania"}
            className="flex-all w-full mt-4"
          >
            <Image
              src="/partners/safaribookings.png"
              alt="Safari Bookings"
              className="w-full h-20 object-contain"
              width={500}
              height={500}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
