import { demoDataBase } from "@/data/Demo-database";
import React, { useState } from "react";

function AccommodationFilter() {
  const [active, setActive] = useState("All");
  const tabsData = [
    {
      id: "dest0",
      title: "All",
    },
    ...demoDataBase?.mainDestinations,
  ];
  return (
    <div className="space-y-8 bg-white border border-secondary/10 p-10 rounded-xl">
      <div>
        <h1 className="font-bold text-primary mb-4">Filter By Destination</h1>

        <div className="space-y-2">
          {tabsData?.map((dest, index) => (
            <button
              key={index}
              onClick={() => setActive(dest?.title)}
              className={`${
                active === dest?.title
                  ? "bg-primary text-accent"
                  : "text-primary hover:bg-accent/25 "
              } text-[16px] font-medium w-full py-3 px-4 border text-start border-accent/30 rounded transitions capitalize`}
            >
              {dest?.title}

              <span className="ml-2 text-xs opacity-80">(3)</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccommodationFilter;
