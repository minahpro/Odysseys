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
    "border border-highlight/40 text-white bg-highlight/40 rounded-xl shadow-[0_0px_40px_-8px_rgba(0,0,0,0.1)] sm:p-10 p-6 space-y-4";

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
    <div className="space-y-8">
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Advanced Search </h1>
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
      </div>
      <SideBanner3
        title={"Need Help Choosing?"}
        sub="Our local experts are here to help you plan the perfect day trip experience."
        link={"/contact"}
        linkText="Contact Us"
        Icon={FaStar}
      />

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
      <SideBanner1
        title="✨ Plan Your Dream Trip"
        sub="Create your perfect adventure with our custom trip planner. Your journey, your way!"
        link="/plan-trip"
        linkText="Start Planning"
        smallSub={"Featured"}
      />
    </div>
  );
}

export default DaysTripFilter;
