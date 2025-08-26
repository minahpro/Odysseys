import {
  BedSingle,
  MapPin,
  Minus,
  Plus,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRef, useEffect } from "react";

const includedItems = [
  "Free Wi-Fi",
  "Breakfast included",
  "Airport transfers",
  "Guided tours",
  "24-hour room service",
];

const excludedItems = [
  "No refund after check-in",
  "No refund after check-out",
  "No refund after cancellation",
];

function SingleItenaries({ datas }) {
  const [openIndex, setOpenIndex] = React.useState(null);
  const itemRefs = useRef([]);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && itemRefs.current[openIndex]) {
      itemRefs.current[openIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openIndex]);

  return (
    <div className="space-y-4">
      {datas.map((item, index) => (
        <div
          key={index}
          ref={el => itemRefs.current[index] = el}
          data-aos="fade-up"
          data-aos-delay={index * 200}
          className="bg-white border-b group border-secondary/30 overflow-hidden "
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-lg text-primary ">{item.title}</h3>
            </div>
            <div className="w-16 h-16 rounded-full transitions flex-all border bg-white group-hover:bg-secondary text-primary group-hover:text-white">
              {openIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </div>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {openIndex === index && (
              <div className="px-6 pb-4">
                <div className="bg-accent/40 rounded">
                  <div className="relative w-full h-[400px] overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover "
                      width={500}
                      height={300}
                    />
                    <div className="absolute bottom-6 left-0 right-0 flex-all">
                      <div className="bg-black/60 w-4/6 backdrop-blur-sm p-8 rounded">
                        <div className="space-y-4">
                          <h2 className="text-xl text-white font-bold">
                            {item?.title}
                          </h2>
                          <div className="flex items-center gap-2">
                            <BedSingle className="w-4 h-4 text-white" />
                            <p className="text-sm font-medium text-accent">
                              3 Nights
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-12 space-y-6">
                    <p className="text-primary font-medium leading-relaxed">
                      {item.description}
                    </p>
                    {/* included & excluded */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-4">
                          Included
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          {includedItems.map((item, idx) => (
                            <li key={idx} className="text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-4">
                          Excluded
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          {excludedItems.map((item, idx) => (
                            <li key={idx} className="text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* destination & accommodation */}
                    <div className="flex items-center gap-6">
                      <div className="bg-accent rounded-lg hover:shadow-xl transitions p-4 flex gap-10 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-xl text-accent flex-all font-bold">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <h3 className="font-medium text-primary">
                            {item.destination?.name}
                          </h3>
                        </div>
                        <Link href={`/destinations/${item.destination?.slug}`}>
                          <SquareArrowOutUpRight className="w-5 h-5 text-secondary" />
                        </Link>
                      </div>
                      <div className="bg-accent rounded-lg hover:shadow-xl transitions p-4 flex gap-10 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-xl text-accent flex-all font-bold">
                            <BedSingle className="w-5 h-5" />
                          </div>
                          <h3 className="font-medium text-primary">
                            {item.accomodation?.name}
                          </h3>
                        </div>
                        <Link href={`/accommodations/${item.accomodation?.slug}`}>
                          <SquareArrowOutUpRight className="w-5 h-5 text-secondary" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleItenaries;
