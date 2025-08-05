import React from "react";
import { findItName, findItTitle, removeZeroCounts } from "../Functions";
import { useAppContext } from "@/context/AppContext";
import useFetchAll from "@/lib/hooks/useFetchAll";
import TagsFilter from "./TagsFilter";
import { SelectField } from "../inputField";
import { Calendar, Award, Category, MapPin, Sparkles } from "lucide-react";

function PlanSafariFilter({ clearFilter, setFilteredTours }) {
  const { fetchedDestinations, isLoading, allFetchedTours } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");
  const { data: tourStandards, isLoading: isFetchingTourStandards } =
    useFetchAll("tour-standards");
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");

  // *************** GET TOUR COUNTS ON FILTERS ******************
  const getTourCount = ({ type, id }) => {
    const tourCount = allFetchedTours?.filter((tour) =>
      type === "category"
        ? tour?.category === id
        : type === "type"
          ? tour?.focus?.some((item) => item === id)
          : type === "destination"
            ? tour?.itinerary.some((item) => item.destinationId === id)
            : type === "standard"
              ? tour?.standard === id
              : ""
    ).length;
    return tourCount;
  };

  // Filter tours based on query parameters
  const handleChange = (value, { name }) => {
    switch (name) {
      case "category":
        setFilteredTours(
          allFetchedTours?.filter(
            (tour) =>
              tour.category ===
              findItTitle({ data: tourCategories, title: value })
          )
        );
        break;
      case "type":
        setFilteredTours(
          allFetchedTours?.filter((tour) =>
            tour.focus?.includes(findItTitle({ data: tourTypes, title: value }))
          )
        );
        break;
      case "destination":
        setFilteredTours(
          allFetchedTours?.filter((tour) =>
            tour.itinerary?.some(
              (item) =>
                item.destinationId ===
                findItName({ data: fetchedDestinations, title: value })
            )
          )
        );
        break;
      case "standard":
        setFilteredTours(
          allFetchedTours?.filter(
            (tour) =>
              tour.standard ===
              findItTitle({ data: tourStandards, title: value })
          )
        );
        break;
      case "tag":
        setFilteredTours(
          allFetchedTours?.filter((tour) =>
            tour.tags?.some(
              (item) => item === findItTitle({ data: tourTags, title: value })
            )
          )
        );
        break;
      default:
        setFilteredTours(allFetchedTours);
        break;
    }
  };

  return (
    <div className="-w-full p-6 space-y-4 rounded bg-black/50">
      {/* displayed tours */}
      <div className="flex pb-2 justify-between flex-wrap items-center w-full">
        <h4 className="font-semibold sm:block hidden text-white">
          Filter options
        </h4>
        <button
          onClick={clearFilter}
          className="px-4 sm:w-auto w-full py-2 border border-primary/50 text-white rounded text-xs"
        >
          Clear Filter
        </button>
      </div>
      {/* filter */}

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <SelectField
          placeholder="By type"
          options={removeZeroCounts({
            datas: tourTypes,
            title: "type",
            getAmount: getTourCount,
          })}
          handleSingleSelectChange={(value) => {
            handleChange(value, { name: "type" });
          }}
          Icon={Calendar}
          isLoading={isFetchingTourTypes}
        />
        <SelectField
          placeholder="By standard"
          options={removeZeroCounts({
            datas: tourStandards,
            title: "standard",
            getAmount: getTourCount,
          })}
          handleSingleSelectChange={(value) => {
            handleChange(value, { name: "standard" });
          }}
          Icon={Award}
          isLoading={isFetchingTourStandards}
        />
        <SelectField
          placeholder="By category"
          options={removeZeroCounts({
            datas: tourCategories,
            title: "category",
            getAmount: getTourCount,
          })}
          handleSingleSelectChange={(value) => {
            handleChange(value, { name: "category" });
          }}
          Icon={Sparkles}
          isLoading={isFetchingTourCategories}
        />
        <SelectField
          placeholder="By destination"
          options={removeZeroCounts({
            datas: fetchedDestinations,
            title: "destination",
            getAmount: getTourCount,
          })}
          handleSingleSelectChange={(value) => {
            handleChange(value, { name: "destination" });
          }}
          Icon={MapPin}
          isLoading={isLoading}
        />
      </div>
      {/* tags */}
      <TagsFilter
        handleChange={(value) => handleChange(value, { name: "tag" })}
        isFetchingTags={isFetchingTourTags}
        tags={tourTags}
      />
    </div>
  );
}

export default PlanSafariFilter;
