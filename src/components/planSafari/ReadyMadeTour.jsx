"use client";
import { ListCustomBookingCardTour } from "@/components/cards";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import DestAndAct from "./DestAndAct";
import { useAppContext } from "@/context/AppContext";
import PaginationSet from "@/components/paginationSet";
import useFetchAll from "@/lib/hooks/useFetchAll";
import Image from "next/image";
import { TourLoading } from "@/components/Loadings/LoadingComp";
import PlanSafariFilter from "@/components/Filters/planSafariFilter";
import { SimpleAccordionFieldComp } from "../inputField";

function ReadyMadeTour() {
  // ********* STATES ***********
  const [filteredTours, setFilteredTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [selected, setSelected] = React.useState(false);
  const [selectedTour, setSelectedTour] = React.useState(null);

  // ********* FETCHING ***********
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { customizeTour, setCustomizeTour, allFetchedTours, isLoading } =
    useAppContext();

  // ********* EFFECTS ***********

  // set filtered tours
  useEffect(() => {
    setFilteredTours(allFetchedTours);
  }, [allFetchedTours]);
  //  set selected tour
  useEffect(() => {
    if (customizeTour) {
      onSelectTour(customizeTour);
    }
  }, [customizeTour]);

  // ********* FUNCTIONS ***********

  // select tour
  const onSelectTour = (tour) => {
    setSelected(true);
    setSelectedTour(tour);
    setCustomizeTour(tour);
    window?.scrollTo({ top: 400, behavior: "smooth" });
  };

  // unselect
  const unSelectTour = () => {
    setSelected(false);
    setSelectedTour(null);
    setCustomizeTour(null);
  };

  // remove from itinerary
  const handleRemoveItnItem = (itmIndex) => {
    const updatedTourItn = selectedTour.itinerary.filter(
      (itm, index) => index !== itmIndex
    );
    const updatedTour = { ...selectedTour, itinerary: updatedTourItn };
    setSelectedTour(updatedTour);
    setCustomizeTour(updatedTour);
  };

  // clear filter
  const clearFilter = () => {
    setFilteredTours(allFetchedTours);
    setCurrentPage(1);
  };

  // ********* PAGINATION ***********

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentTours = filteredTours?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="space-y-6 flex-all flex-col">
        {selected ? (
          <>
            {/* content */}
            <div className="w-full space-y-4">
              <div className="flex justify-between gap-4 flex-wrap items-center w-full">
                <h4 className="font-semibold text-white">
                  {selectedTour?.title}
                </h4>
                {selectedTour && (
                  <button
                    onClick={unSelectTour}
                    className="px-4 py-2 bg-red-100 font-semibold text-red-500 rounded text-xs"
                  >
                    Unselect
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {selectedTour?.itinerary.map((item, index) => (
                  <div key={index} className="relative">
                    <SimpleAccordionFieldComp title={` ${item.title}`}>
                      <div className="py-4 px-6 space-y-8 rounded bg-highlight text-textcolor">
                        <p className="text-sm leading-7">
                          {item?.description.substring(0, 200)}....
                        </p>

                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                          {/* accomodation */}
                          {item.accommodation && (
                            <div className="space-y-3">
                              <p className="font-medium text-white text-sm">
                                Accomodation
                              </p>
                              <Image
                                src={item?.photos[0]}
                                width={500}
                                height={300}
                                className={"h-32 w-full object-cover"}
                              />
                              <h4 className="text-sm font-medium">
                                {item.accommodation.name}
                              </h4>
                              <div>
                                <Link
                                  href={`/accomodations/${item?.accommodation?.slug}`}
                                  target="_blank"
                                  className="bg-primary rounded text-black py-1 px-4"
                                >
                                  View Accommodation
                                </Link>
                              </div>
                            </div>
                          )}

                          {/* destination */}
                          {item.destination && (
                            <div className="space-y-3">
                              <p className="font-medium text-white text-sm">
                                Destination
                              </p>

                              <Image
                                src={item?.destination?.photos[0]}
                                alt={item.destination.name}
                                width={1000}
                                height={230}
                                className="w-full h-32 rounded object-cover"
                              />

                              <h4 className="text-sm font-medium">
                                {item.destination.name}
                              </h4>
                              <div>
                                <Link
                                  href={`/destinations/${item?.destination?.slug}`}
                                  target="_blank"
                                  className="bg-primary rounded text-black py-1 px-4"
                                >
                                  View Destination
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </SimpleAccordionFieldComp>
                    {/* remove */}
                    <button
                      onClick={() => handleRemoveItnItem(index)}
                      className="absolute flex-all text-xs w-6 h-6 rounded-full border border-primary/50 text-primary bg-black -top-2 -right-2"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* dest and activies */}
            <div className="pt-3 w-full">
              <DestAndAct />
            </div>
            {/* form */}
          </>
        ) : (
          <>
            {/* filter */}{" "}
            <div className="lg:hidden block w-full">
              <SimpleAccordionFieldComp
                allDivClass={"rounded-lg px-6 py-0 border space-y-2 text-sm"}
                Icon={() => {}}
                title={"Filter options"}
              >
                <PlanSafariFilter
                  setFilteredTours={setFilteredTours}
                  clearFilter={clearFilter}
                />
              </SimpleAccordionFieldComp>
            </div>
            <div className="lg:block hidden w-full">
              <PlanSafariFilter
                clearFilter={clearFilter}
                setFilteredTours={setFilteredTours}
              />
            </div>
            {isLoading || isFetchingTourCategories ? (
              <div className="sektion md:grid-cols-2 ">
                {[...Array(2)].map((_, i) => (
                  <TourLoading key={i} />
                ))}
              </div>
            ) : (
              <>
                {" "}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                  {filteredTours.length > 0 ? (
                    <>
                      {currentTours.map((tour, index) => (
                        <ListCustomBookingCardTour
                          onSelect={onSelectTour}
                          key={index}
                          tour={{
                            ...tour,
                            prices: tour?.price?.foreigner?.adult?.highSeason,
                            category: tourCategories?.find(
                              (cat) => cat?.id === tour?.category
                            )?.title, // get category title
                          }}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="text-center mt-7">
                      <h5 className="mt-2 font-bold text-white">
                        {" "}
                        No tours found.{" "}
                      </h5>
                    </div>
                  )}
                </div>
                {/* load more */}
                {filteredTours?.length > postsPerPage && (
                  <div className="mt-3">
                    <PaginationSet
                      totalPosts={filteredTours.length}
                      postsPerPage={postsPerPage}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ReadyMadeTour;
