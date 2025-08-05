import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { InputField, RadioFilter } from "../inputField";
import { removeZeroCounts } from "../Functions";
import {
  SideBanner1,
  SideBanner2,
  SideBanner3,
} from "../banners/SidebarBanners";

function DestinationsFilter({ clearFilter, setCurrentPage }) {
  // *************** STATES ***************
  const [name, setName] = React.useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sharedClassBox =
    "border border-highlight/40 text-white bg-highlight/40 rounded-xl shadow-[0_0px_40px_-8px_rgba(0,0,0,0.1)] sm:p-10 p-6 space-y-4";

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
    <div className="space-y-8">
      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Advanced Search </h1>
        <InputField
          type="text"
          placeholder="Enter Destination Name"
          name="destinationName"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={"w-full"}
        />
        <button
          onClick={filterByName}
          className="w-full font-semibold rounded-full py-3 bg-primary text-black hover:shadow"
        >
          Search
        </button>
      </div>

      <div data-aos="fade-right" className={sharedClassBox}>
        <h1 className="text-md font-semibold">Categories </h1>
        <div className="space-y-5">
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

      <button
        onClick={clearFilter}
        className="w-full font-semibold text-primary"
      >
        Clear Filter
      </button>
      <SideBanner2
        title="Kilimanjaro Summit"
        sub="Conquer Africa's highest peak - 5,895m of pure determination"
        link="/tours/climbing-trips"
        linkText="Climbing Trips"
      />
      <SideBanner1
        title="What to expect"
        sub="In Tanzania, the allure of spotting the 'Big Five' lions, leopards, buffaloes, rhinos, and elephants—draws many to its safaris."
        link="/plan-your-safari"
        linkText="Plan Your Safari"
        smallSub={"Now"}
      />
    </div>
  );
}

export default DestinationsFilter;
