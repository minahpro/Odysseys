"use client";
import React, { useState } from "react";

import MainPopup from "./MainPopup";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

function ActivitiesPopup({ handleOpen, handleClose, onSelect, activities }) {
  const [filteredActivities, setFilteredActivities] = useState(activities);

  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`Activities/Days trips`}
      contentClass="max-w-4xl"
    >
      {filteredActivities?.length < 1 ? (
        <div className="w-full text-white sm:h-60 h-48 flex justify-center items-center">
          <span>The list is empty</span>
        </div>
      ) : (
        <div className="w-full max-h-[400px] overflow-hidden overflow-y-scroll">
          <div className="grid lg:grid-cols-3 p-4 sm:grid-cols-2 grid-cols-1 overflow-y-scroll md:overflow-y-auto sm:h-auto h-96 gap-4">
            {filteredActivities?.map((activity, index) => (
              <div
                key={index}
                className="p-2 rounded border bg-highlight border-gray-800 relative space-y-4"
              >
                <div className="flex gap-4 items-center">
                  <Image
                    src={activity?.photos[0]}
                    width={2000}
                    height={240}
                    alt="blog"
                    className="w-1/3 rounded h-14 object-cover bg-gray-800"
                  />

                  <div className="w-2/3">
                    <p className="text-white text-sm leading-5 font-normal">
                      {activity?.title}
                    </p>
                    <Link
                      href={`/tours/day-trips/${activity.slug}`}
                      className="text-xs text-textcolor underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
                {/* remove */}
                <button
                  onClick={() => {
                    setFilteredActivities((itms) =>
                      itms.filter((itm) => itm.id !== activity.id)
                    );
                    onSelect(activity);
                  }}
                  className="absolute flex-all text-xs w-6 h-6 rounded-full border border-primary/50 text-primary bg-black -top-7 -right-2"
                >
                  <FaPlus />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainPopup>
  );
}

export default ActivitiesPopup;
