import React, { useEffect, useState } from "react";

import MainPopup from "../Popups/MainPopup";
import TourImagesSwiper from "../TourImagesSwiper";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import PaginationSet from "../paginationSet";

function AccomodationPopup({
  handleOpen,
  handleClose,
  onSelect,
  dstnId,
  selectedAccommodationId,
}) {
  const { fetchedAccommodations } = useAppContext();
  const { data: accmStandards } = useFetchAll("accommodation-standards");
  const { data: accmCategories } = useFetchAll("accommodation-categories");

  const [availableAccommodations, setAvailableAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const allAccommodationsFilter = () => {
    if (fetchedAccommodations.length > 0) {
      const dstnAccms = fetchedAccommodations.filter((accm) => {
        if (
          accm.destinationId === dstnId &&
          accm.id !== selectedAccommodationId
        ) {
          return true;
        } else {
          return false;
        }
      });

      setAvailableAccommodations(dstnAccms);
      setFilteredAccommodations(dstnAccms);
    }
  };

  useEffect(() => {
    allAccommodationsFilter();
  }, [fetchedAccommodations, dstnId]);

  const handleFilterByStandard = (stdId) => {
    const accms = availableAccommodations.filter((itm) => itm.level === stdId);
    console.log(accms);

    setFilteredAccommodations(accms);
  };

  const handleFilterByCategory = (catId) => {
    const accms = availableAccommodations.filter(
      (itm) => itm.category === catId
    );
    setFilteredAccommodations(accms);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentAccmms = filteredAccommodations?.slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`Accommodations`}
      contentClass="max-w-4xl"
    >
      <div className=" overflow-y-scroll md:overflow-y-auto md:h-auto h-96">
        {/* filetr */}
        <div className="flex items-center flex-wrap gap-4">
          <button
            onClick={() => setFilteredAccommodations(availableAccommodations)}
            className="bg-primary text-black border-primary border text-sm py-2 px-4 rounded"
          >
            All
          </button>

          {accmStandards.length > 0 &&
            accmStandards.map((level, index) => (
              <button
                onClick={() => handleFilterByStandard(level.id)}
                key={index}
                className="bg-highlight text-textcolor border-gray-800 border text-sm py-2 px-4 rounded"
              >
                {level.title}
              </button>
            ))}

          {accmCategories.length > 0 &&
            accmCategories.map((cat, index) => (
              <button
                onClick={() => handleFilterByCategory(cat.id)}
                key={index}
                className="bg-highlight text-textcolor border-gray-800 border text-sm py-2 px-4 rounded"
              >
                {cat.title}
              </button>
            ))}
        </div>
        {/* accommodations */}
        {currentAccmms?.length < 1 ? (
          <div className="w-full text-white sm:h-60 h-48 flex justify-center items-center">
            <span>The list is empty</span>
          </div>
        ) : (
          <div className="w-full max-h-[400px] overflow-hidden overflow-y-scroll">
            <div className="overflow-auto">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
                {currentAccmms?.map((data, index) => (
                  <div
                    key={index}
                    className="p-2 rounded border bg-highlight border-gray-800 relative space-y-4"
                  >
                    <TourImagesSwiper images={data?.photos} h={"h-32"} />
                    <h4 className="text-sm text-white leading-5 font-normal">
                      {data?.name}
                    </h4>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 items-center">
                      <Link
                        href={`/accommodations/${data.slug}`}
                        target="_blank"
                        className="text-sm border border-primary rounded flex-all text-textcolor py-1 px-4"
                      >
                        View Hotel
                      </Link>{" "}
                      <button
                        onClick={() =>
                          onSelect({
                            acc: data,
                            dstnId,
                          })
                        }
                        className="text-sm border border-primary text-black bg-primary rounded py-1 px-4"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredAccommodations.length > postsPerPage && (
              <div className="mt-3">
                <PaginationSet
                  totalPosts={filteredAccommodations.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </MainPopup>
  );
}

export default AccomodationPopup;
