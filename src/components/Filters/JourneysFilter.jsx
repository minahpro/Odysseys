import React from "react";
import { ArrowUpNarrowWide, MapPin, Users } from "lucide-react";
import { SelectField } from "../inputField";
import { demoDataBase } from "@/data/Demo-database";

function JourneyFilter({}) {
  const destinations = demoDataBase?.mainDestinations?.map((item) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });
  return (
    <>
      <SelectField
        Icon={MapPin}
        placeholder={"Choose Destination"}
        handleSingleSelectChange={(value) => {}}
        isLoading={false}
        options={destinations}
      />
      <SelectField
        Icon={ArrowUpNarrowWide}
        placeholder={"Journey Type"}
        handleSingleSelectChange={(value) => {}}
        isLoading={false}
        options={[
          {
            label: "Solo",
            value: "solo",
          },
          {
            label: "Couple",
            value: "couple",
          },
          {
            label: "Family",
            value: "family",
          },
          {
            label: "Business",
            value: "business",
          },
          {
            label: "Honeymoon",
            value: "honeymoon",
          },
          {
            label: "Friends",
            value: "friends",
          },
          {
            label: "Group",
            value: "group",
          },
        ]}
      />
      <SelectField
        Icon={Users}
        placeholder={"Month"}
        handleSingleSelectChange={(value) => {}}
        isLoading={false}
        options={Array.from({ length: 12 }, (_, i) => ({
          label: new Date(0, i).toLocaleString("default", { month: "long" }),
          value: i + 1,
        }))}
      />
    </>
  );
}

export default JourneyFilter;
