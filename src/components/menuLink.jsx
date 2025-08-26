import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PrimaryButton } from "./buttons";

function DestinationsDropDown({ item, index }) {
  return (
    <a
      key={item.name}
      href={`/destinations/${item?.slug}`}
      className="group flex items-center bg-accent/20 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-secondary/10 hover:border-secondary/30"
      style={{ animationDelay: `${index * 300}ms` }}
    >
      {/* Image */}
      <div className="mr-4 overflow-hidden rounded-lg">
        <Image
          // src={item.image || "/placeholder.svg"}
          src={`/images/bg/${index + 1}.png`}
          alt={item.name}
          width={80}
          height={60}
          className="w-40 h-28 bg-highlight object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-primary mb-1">{item.name}</h4>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 ml-4">
        <ChevronDown className="h-4 w-4 text-primary rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </a>
  );
}

function ExperiencesDropDown({ item, index, IconComponent }) {
  return (
    <a
      key={item.name}
      href={`/experiences/${item?.slug}`}
      className="group flex bg-accent/10 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-secondary/10 hover:border-secondary/30"
      style={{ animationDelay: `${index * 300}ms` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:bg-secodary transition-colors duration-300 mr-5">
        {IconComponent && <IconComponent className="h-5 w-5 text-accent" />}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-primary mb-1">{item.name}</h4>
        <p className="text-sm text-primary leading-relaxed line-clamp-1">
          {item.description}
        </p>
        <div className="w-full">
          <span className="text-xs mt-2 font-medium rounded-full px-3 py-1 bg-accent text-primary">
            {item.total}
          </span>
        </div>
      </div>
    </a>
  );
}

function CampsDropDown({ item, index }) {
  return (
    <a
      key={item.name}
      href={`/accommodations/${item?.slug}`}
      className="group flex flex-col space-y-2 bg-accent/40 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-secondary/10 hover:border-secondary/30"
      style={{ animationDelay: `${index * 300}ms` }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-lg">
        <Image
          // src={item.image || "/placeholder.svg"}
          src={`/images/gallery/zanzi${index + 1}.png`}
          alt={item.name}
          width={80}
          height={60}
          className="w-full h-32 bg-highlight object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}

      <h4 className="font-semibold text-primary">{item.name}</h4>
      <p className="text-sm text-secondary leading-relaxed line-clamp-2">
        {item.description}
      </p>
      <div className="grid grid-cols-2">
        <PrimaryButton className="text-xs py-2">Expole Camp</PrimaryButton>
      </div>
    </a>
  );
}

export { CampsDropDown, DestinationsDropDown, ExperiencesDropDown };
