import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { InputField, RadioFilter } from "../inputField";
import { removeZeroCounts } from "../Functions";
import { PrimaryButton } from "../buttons";

function DestinationsFilter({ clearFilter, setCurrentPage }) {
  // *************** STATES ***************
  const [name, setName] = React.useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sharedClassBox =
    "w-full mb-6 text-sm border border-secondary/10 font-bold bg-accent text-primary py-4 px-6 rounded";

  // ************** FETCHING DATA **************
  const { data: destinationTypes, isLoading: isFetchingOptions } =
    useFetchAll("destination-types");
  const { fetchedDestinations, isLoading } = useAppContext();

  // ********** GET DEST AMOUNT FOR EACH DEST-TYPE ************
  const getDestAmount = ({ type, id }) => {
    const destAmount = fetchedDestinations?.filter((itm) => itm?.type === id);
    return destAmount?.length;
  };

  // ************** TYPE HANDLERS **************
  const handleOrderDest = (value) => {
    if (value) {
      setCurrentPage(1);
      params.delete("name");
      params.set("filter", value);
      window.history.replaceState({}, "", "?" + params.toString());
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      params.delete("name");
      params.delete("filter");
      window.history.replaceState({}, "", "?" + params.toString());
      clearFilter();
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // ************** FILTER BY NAME **************
  const filterByName = () => {
    if (name) {
      setCurrentPage(1);
      params.delete("filter");
      params.set("name", name);
      window.history.replaceState({}, "", "?" + params.toString());
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    } else {
      params.delete("filter");
      params.delete("name");
      window.history.replaceState({}, "", "?" + params.toString());
      clearFilter();
      // scroll to top of the page
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // ************** GETTING ALL DEST TYPE WHICH HAVE TOUR **************
  const allDestTypes = destinationTypes?.filter((type) => {
    const destAmount = fetchedDestinations?.filter(
      (itm) => itm?.type === type?.id
    );
    return destAmount?.length > 0;
  });

  return (
    <div className="space-y-8 bg-white border border-secondary/10 p-10 rounded-xl">
      <div>
        <div className={sharedClassBox}>
          <h1 className="text-md font-semibold">Advanced Search </h1>
        </div>
        <div className="space-y-5">
          <InputField
            type="text"
            placeholder="Enter Destination Name"
            name="destinationName"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={"w-full"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterByName();
              }
            }}
          />
          <RadioFilter
            options={removeZeroCounts({
              datas: allDestTypes,
              title: "type",
              getAmount: getDestAmount,
            })}
            handleChange={handleOrderDest}
            isLoading={isFetchingOptions || isLoading}
          />
        </div>
      </div>

      <PrimaryButton onClick={clearFilter} className="w-full text-sm">
        Clear Filter
      </PrimaryButton>
    </div>
  );
}

export default DestinationsFilter;
