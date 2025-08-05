import React from "react";
import TourPriceFilterPro from "@/components/Filters/tourPriceFilter";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { removeZeroCounts } from "../Functions";
import {
  ArrowUpDown,
  Calendar,
  Home,
  MapPin,
  Sparkles,
  Sun,
  Umbrella,
  Users,
} from "lucide-react";
import { RadioFilter, SelectField } from "../inputField";
import TagsFilter from "./TagsFilter";
import { SideBanner3, SideBanner4 } from "../banners/SidebarBanners";

function FilterTour({ passingDatas }) {
  // *************** PROPS ******************
  const { availableTours, clearFilter, valuePrice, setCurrentPage } =
    passingDatas;
  const sharedClassBox =
    "border border-highlight/40 text-white bg-highlight/40 rounded-xl shadow-[0_0px_40px_-8px_rgba(0,0,0,0.1)] sm:p-10 p-6 space-y-4";

  // *************** STATES ******************
  const [filterOptions, setFilterOptions] = React.useState({
    sort: "",
    type: "",
    destination: "",
    category: "",
    standard: "",
    tag: "",
    price: { min: 0, max: 0 },
    duration: "",
    filterBy: "",
  });
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // *************** FETCHING DATA ******************

  const { fetchedDestinations, isLoading, allFetchedTours } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");
  const { data: tourStandards, isLoading: isFetchingTourStandards } =
    useFetchAll("tour-standards");
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");

  // ****************** GET FEATURED TOURS ******************* //
  const tours = allFetchedTours?.filter((item) => item?.isFeatured);

  // *************** GET TOUR COUNTS ON FILTERS ******************
  const getTourCount = ({ type, id }) => {
    const tourCount = availableTours?.filter((tour) =>
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

  // *************** ON CHANGE FUNCTION ******************
  const handleChange = (value, { name }) => {
    if (value) {
      setCurrentPage(1);
      setFilterOptions((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      params.delete("min");
      params.delete("max");
      params.set("filter", name);
      params.set("value", value);
      window.history.replaceState({}, "", "?" + params.toString());
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      setFilterOptions((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      clearFilter();
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // *************** PRICE RANGE SLIDER ******************
  const handlePriceRangeChange = (value) => {
    if (value) {
      setCurrentPage(1);
      setFilterOptions((prevState) => ({
        ...prevState,
        price: value,
      }));
      params.delete("value");
      params.set("filter", "price");
      params.set("min", value?.min);
      params.set("max", value?.max);
      window.history.replaceState({}, "", "?" + params.toString());
    } else {
      setFilterOptions((prevState) => ({
        ...prevState,
        price: { min: 0, max: 0 },
      }));
      clearFilter();
    }
  };

  return (
    <div className="space-y-8">
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Advanced Search </h1>
        <div className="space-y-5">
          <SelectField
            isLoading={isFetchingTourTypes}
            Icon={Calendar}
            placeholder={"Tour Type"}
            handleSingleSelectChange={(value) =>
              handleChange(value, { name: "type" })
            }
            options={removeZeroCounts({
              datas: tourTypes,
              title: "type",
              getAmount: getTourCount,
            })}
          />

          <SelectField
            Icon={MapPin}
            placeholder={"Choose Destination"}
            handleSingleSelectChange={(value) =>
              handleChange(value, { name: "destination" })
            }
            isLoading={isLoading}
            options={removeZeroCounts({
              datas: fetchedDestinations,
              title: "destination",
              getAmount: getTourCount,
            })}
          />
          <SelectField
            options={[
              { label: "IsRecommended", value: "recommended" },
              { label: "IsFeatured", value: "featured" },
              { label: "IsOnOffer", value: "offer" },
              { label: "IsSpecial", value: "special" },
              { label: "Latest Packages", value: "latest" },
            ]}
            handleSingleSelectChange={(value) => {
              handleChange(value, { name: "filterBy" }); // change the state based on state name
            }}
            isLoading={isLoading}
            Icon={Sparkles}
            placeholder={"Filter By"}
          />
          <SelectField
            Icon={ArrowUpDown}
            placeholder={"Sort By"}
            options={[
              { label: "Cheap - Expensive", value: "cheap-expensive" },
              { label: "Expensive - Cheap", value: "expensive-cheap" },
              { label: "Ascending", value: "ascending" },
              { label: "Descending", value: "descending" },
            ]}
            handleSingleSelectChange={(value) => {
              handleChange(value, { name: "sort" }); // change the state based on state name
            }}
            isLoading={isLoading}
          />
        </div>
      </div>

      <SideBanner4
        title="Quick Safari Escape"
        sub="Whether you have a single day or a few days, these trips are designed to showcase the best of Tanzania’s natural beauty and cultural heritage. "
        link="/tours/day-trips"
        image={"/images/tourImages/ngoro.jpg"}
        Icon={Sun}
        smallSub={"1 Day"}
      />
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Filter by Price</h1>
        <div className="space-y-5">
          <TourPriceFilterPro
            handleChanges={handlePriceRangeChange}
            valuePrice={valuePrice}
          />
        </div>
      </div>
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Duration</h1>
        <div className="space-y-5">
          <RadioFilter
            options={[
              { label: "1-3 days", value: "1-3" },
              { label: "4-6 days", value: "4-6" },
              { label: "7+ days", value: "7+" },
            ]}
            handleChange={(value) => handleChange(value, { name: "duration" })} // change the state based on state name
            isLoading={isFetchingTourCategories}
          />
        </div>
      </div>
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Group Size</h1>
        <div className="space-y-5">
          <RadioFilter
            options={removeZeroCounts({
              datas: tourCategories,
              title: "category",
              getAmount: getTourCount,
            })}
            handleChange={(value) => handleChange(value, { name: "category" })} // change the state based on state name
            isLoading={isFetchingTourCategories}
          />
        </div>
      </div>
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Tour Standard</h1>
        <div className="space-y-5">
          <RadioFilter
            options={removeZeroCounts({
              datas: tourStandards,
              title: "standard",
              getAmount: getTourCount,
            })}
            handleChange={(value) => handleChange(value, { name: "standard" })} // change the state based on state name
            isLoading={isFetchingTourStandards}
          />
        </div>
      </div>
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Tags</h1>
        <div className="space-y-5">
          <TagsFilter
            handleChange={(value) => handleChange(value, { name: "tag" })}
            isFetchingTags={isFetchingTourTags}
            tags={tourTags}
            selectedTag={filterOptions?.tag}
          />
        </div>
      </div>
      <SideBanner3
        title={"Under the Stars"}
        sub={
          "Authentic camping experiences with crackling campfires and endless skies"
        }
        link="/accommodations"
        linkText={"View Accommodations"}
        Icon={Home}
      />
    </div>
  );
}

export default FilterTour;
