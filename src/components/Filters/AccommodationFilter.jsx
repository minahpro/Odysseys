import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { removeZeroCounts } from "../Functions";
import { Dog, MapPin, Umbrella } from "lucide-react";
import { RadioFilter, SelectField } from "../inputField";
import {
  SideBanner1,
  SideBanner2,
  SideBanner3,
  SideBanner4,
} from "../banners/SidebarBanners";
import { MdEmail } from "react-icons/md";

function AccommodationFilter() {
  // ************ STATES ************
  const [filterOptions, setFilterOptions] = React.useState({
    inOutPark: "",
    category: "",
    destination: "",
    level: "",
  });
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sharedClassBox =
    "border border-highlight/40 text-white bg-highlight/40 rounded-xl shadow-[0_0px_40px_-8px_rgba(0,0,0,0.1)] sm:p-10 p-6 space-y-4";

  // *************** FETCHING DATA ******************
  const { fetchedAccommodations, fetchedDestinations, isLoading } =
    useAppContext();
  const { data: accommodationTypes, isLoading: isFetchingAccommodationTypes } =
    useFetchAll("accommodation-categories");
  const {
    data: accommodationStandards,
    isLoading: isFetchingAccommodationStandards,
  } = useFetchAll("accommodation-standards");

  // ********** GET ACC AMOUNT FOR EACH ACC-TYPE ************
  const getAccAmount = ({ type, id }) => {
    const accAmount =
      type === "category"
        ? fetchedAccommodations?.filter((itm) => itm?.category === id)
        : type === "level"
          ? fetchedAccommodations?.filter((itm) => itm?.level === id)
          : type === "destination"
            ? fetchedAccommodations?.filter((itm) => itm?.destinationId === id)
            : type === "inOutPark"
              ? fetchedAccommodations?.filter((itm) => itm?.isInPark === id)
              : "";

    return accAmount?.length;
  };

  // *************** ON CHANGE FUNCTION ******************
  const handleChange = (value, { name }) => {
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
      window.history.replaceState({}, "", "?" + params.toString());
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-sm font-semibold">Advanced Search </h1>
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
              getAmount: getAccAmount,
            })}
          />

          <SelectField
            Icon={Dog}
            placeholder={"In Park / Out of Park"}
            options={[
              {
                id: 1,
                value: "inpark",
                label: `In Park (${getAccAmount({
                  type: "inOutPark",
                  id: true,
                })})`,
              },
              {
                id: 0,
                value: "outpark",
                label: `Out of Park (${getAccAmount({
                  type: "inOutPark",
                  id: false,
                })})`,
              },
            ]}
            handleSingleSelectChange={(value) => {
              handleChange(value, { name: "inOutPark" });
            }}
            isLoading={isLoading}
          />
        </div>
      </div>

      <SideBanner2
        title="Serengeti Spectacle"
        sub="Witness the Great Migration across endless golden plains"
        link="/destinations"
        linkText="Big Five Territory"
      />

      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-sm font-semibold">Type</h1>
        <div className="space-y-5">
          <RadioFilter
            options={removeZeroCounts({
              datas: accommodationTypes,
              title: "category",
              getAmount: getAccAmount,
            })}
            handleChange={(value) => {
              handleChange(value, { name: "category" });
            }}
            isLoading={isFetchingAccommodationTypes}
          />
        </div>
      </div>
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-sm font-semibold"> Standard</h1>
        <div className="space-y-5">
          <RadioFilter
            options={removeZeroCounts({
              datas: accommodationStandards,
              title: "level",
              getAmount: getAccAmount,
            })}
            handleChange={(value) => {
              handleChange(value, { name: "level" });
            }}
            isLoading={isFetchingAccommodationStandards}
          />
        </div>
      </div>
      <SideBanner4
        title="Spice Island Discovery"
        sub="Journey through fragrant plantations where cloves, cinnamon, and cardamom have grown for centuries. Discover the spices that once made Zanzibar the center of global trade."
        link="/tours/zanzibar-trips"
        image={"/images/gallery/zanzi3.png"}
        Icon={Umbrella}
        smallSub={"Aromatic"}
      />
    </div>
  );
}

export default AccommodationFilter;
