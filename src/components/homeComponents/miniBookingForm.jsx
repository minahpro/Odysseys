"use client";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../buttons";
import { SelectField } from "../inputField";
import { useRouter, useSearchParams } from "next/navigation";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { useAppContext } from "@/context/AppContext";
import { removeZeroCounts } from "../Functions";
import { Calendar, MapPin, Users } from "lucide-react";

export const MiniBookingForm = () => {
  // *************** STATES ******************
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    type: "",
    destination: "",
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState(null);

  // ************ USEEFFECT FOR PARAMS ************ //
  useEffect(() => {
    setParams(searchParams);
  }, [searchParams]);
  // *************** FETCHING DATA ******************
  const { data: tourCategories, isLoading: isFetchingTourCategories } =
    useFetchAll("tour-categories");
  const { data: tourTypes, isLoading: isFetchingTourTypes } =
    useFetchAll("tour-types");
  const {
    fetchedDestinations,
    allFetchedTours,
    isLoading: contextLoading,
  } = useAppContext();

  // *************** GET TOUR COUNTS ON FILTERS ******************
  const getTourCount = ({ type, id }) => {
    const tourCount = allFetchedTours?.filter((tour) =>
      type === "category"
        ? tour?.category === id
        : type === "type"
          ? tour?.focus?.some((item) => item === id)
          : tour?.itinerary.some((item) => item.destinationId === id)
    ).length;
    return tourCount;
  };

  // *************** ON CHANGE FUNCTION ******************
  const handleChange = (value, { name }) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // *************** FILTER ******************
  const filterTours = () => {
    if (!params) return;
    const query = new URLSearchParams(params);

    if (filterOptions?.category) {
      query.set("filter", "category");
      query.set("value", filterOptions.category);
      router.push(`/tours?${query.toString()}`);
    }

    if (filterOptions?.type) {
      query.set("filter", "type");
      query.set("value", filterOptions.type);
      router.push(`/tours?${query.toString()}`);
    }

    if (filterOptions?.destination) {
      query.set("filter", "destination");
      query.set("value", filterOptions.destination);
      router.push(`/tours?${query.toString()}`);
    }
  };

  // *************** USE EFFECT ******************

  useEffect(() => {
    if (params) filterTours();
  }, [filterOptions, params]);
  return (
    <div data-aos="fade-up" className="respons flex-all">
      <div className="md:mt-12 mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Form Content */}

        {/* Destination */}
        <SelectField
          Icon={MapPin}
          placeholder={"Destination"}
          handleSingleSelectChange={(value) =>
            handleChange(value, { name: "destination" })
          }
          isLoading={contextLoading}
          options={removeZeroCounts({
            datas: fetchedDestinations,
            title: "destination",
            getAmount: getTourCount,
          })}
        />
        <SelectField
          isLoading={isFetchingTourTypes}
          Icon={Calendar}
          placeholder={" Tour Type"}
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
          isLoading={isFetchingTourCategories}
          Icon={Users}
          placeholder={"Tour Category"}
          handleSingleSelectChange={(value) =>
            handleChange(value, { name: "category" })
          }
          options={removeZeroCounts({
            datas: tourCategories,
            title: "category",
            getAmount: getTourCount,
          })}
        />

        {/* Submit Button */}
        <PrimaryButton className="rounded py-0 h-12">
          View All Packages
        </PrimaryButton>
      </div>
    </div>
  );
};
