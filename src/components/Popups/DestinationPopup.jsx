"use client";

import React, { useState } from "react";

import MainPopup from "./MainPopup";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import PaginationSet from "../paginationSet";
function DestinationPopup({ handleOpen, handleClose, onSelect, destinations }) {
  const [filteredDstns, setFilteredDstns] = useState(destinations);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentDstns = filteredDstns?.slice(firstPostIndex, lastPostIndex);

  const handleSearchDestinationsByName = (searchQuery) => {
    const filtereddestinations = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    setFilteredDstns(filtereddestinations);
  };

  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`Destinations`}
      contentClass="max-w-4xl"
    >
      {destinations?.length < 1 ? (
        <div className="w-full sm:h-60 text-white h-48 flex justify-center items-center">
          <span>The list is empty</span>
        </div>
      ) : (
        <div>
          <div className="space-y-2 p-4">
            <input
              type="text"
              placeholder="search ....."
              onChange={(event) =>
                handleSearchDestinationsByName(event.target.value)
              }
              required
              className="w-full font-semibold border focus:border-slate-600 text-sm rounded p-3.5 text-white placeholder:font-light placeholder:text-slate-500 bg-highlight/50 border-gray-900"
            />
          </div>
          <div className="w-full max-h-[400px] overflow-hidden overflow-y-scroll">
            <div className="grid lg:grid-cols-3 p-4 sm:grid-cols-2 grid-cols-1 overflow-y-scroll md:overflow-y-auto sm:h-auto h-96 gap-4">
              {currentDstns?.map((destination, index) => (
                <div
                  key={index}
                  className="p-2 rounded border bg-highlight border-gray-800 relative space-y-4"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={destination?.photos[0]}
                      width={2000}
                      height={240}
                      alt="blog"
                      className="w-1/3 rounded h-16 object-cover bg-gray-800"
                    />

                    <div className="w-2/3">
                      <p className="text-sm text-white leading-5 font-normal">
                        {destination?.name}
                      </p>
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="text-xs text-textcolor underline"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                  {/* remove */}
                  <button
                    onClick={() => {
                      setFilteredDstns((itms) =>
                        itms.filter((itm) => itm.id !== destination.id)
                      );
                      onSelect(destination);
                    }}
                    className="absolute flex-all text-xs w-6 h-6 rounded-full border border-primary/50 text-primary bg-black -top-7 -right-2"
                  >
                    <FaPlus />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <PaginationSet
                totalPosts={destinations.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      )}
    </MainPopup>
  );
}

export default DestinationPopup;
