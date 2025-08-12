import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { removeZeroCounts } from "../Functions";
import { Dog, MapPin } from "lucide-react";
import { RadioFilter, SelectField } from "../inputField";
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
    "w-full mb-6 text-sm border border-secondary/10 font-bold bg-accent text-primary py-4 px-6 rounded";

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
    <div className="space-y-8 bg-white border border-secondary/10 p-10 rounded-xl">
      <div>
        <div className={sharedClassBox}>
          <h1>Advanced Search </h1>
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

      <div>
        <div className={sharedClassBox}>
          <h1>Type</h1>
        </div>
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
      <div>
        <div className={sharedClassBox}>
          <h1>Standard</h1>
        </div>
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
    </div>
  );
}

export default AccommodationFilter;
