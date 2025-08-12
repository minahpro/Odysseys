import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { removeZeroCounts } from "../Functions";
import { MapPin } from "lucide-react";
import { SelectField } from "../inputField";
import TagsFilter from "./TagsFilter";
import { SideBanner1, SideBanner3 } from "../banners/SidebarBanners";
import { FaStar } from "react-icons/fa6";

function DaysTripFilter({ availableTours }) {
  // *************** PROPS ******************
  const sharedClassBox =
    "w-full mb-6 text-sm border border-secondary/10 font-bold bg-accent text-primary py-4 px-6 rounded";

  // *************** STATES ******************
  const [filterOptions, setFilterOptions] = React.useState({
    destination: "",
    tag: "",
  });
  const searchParams = useSearchParams();

  // *********** FETCH DATA *****************
  const { fetchedDestinations, isLoading } = useAppContext();
  const { data: tourTags, isLoading: isFetchingTourTags } =
    useFetchAll("tour-tags");

  // *************** GET TOUR COUNTS ON FILTERS ******************
  const getTourCount = ({ type, id }) => {
    const tourCount = availableTours?.filter((tour) =>
      type === "destination"
        ? tour?.destinations?.some((item) => item === id)
        : ""
    ).length;
    return tourCount;
  };

  // *************** ON CHANGE FUNCTION ******************
  const handleChange = (value, { name }) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      setFilterOptions((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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
      params.delete("filter");
      params.delete("value");
      params.delete("min");
      params.delete("max");
      window.history.replaceState({}, "", "?" + params.toString());
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 bg-white border border-secondary/10 p-10 rounded-xl">
      <div className={sharedClassBox}>
        <h1 className="text-md font-semibold">Advanced Search </h1>
      </div>
      <div className="space-y-5">
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
        <TagsFilter
          handleChange={(value) => handleChange(value, { name: "tag" })}
          isFetchingTags={isFetchingTourTags}
          tags={tourTags}
          selectedTag={filterOptions?.tag}
        />
      </div>
    </div>
  );
}

export default DaysTripFilter;
