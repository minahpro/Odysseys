"use client";
import React from "react";
import { Slider } from "@nextui-org/slider";

const TourPriceFilterPro = ({ handleChanges, valuePrice }) => {
  const { setValues, min, max, values } = valuePrice;

  const handleChange = (value) => {
    setValues(value);
    handleChanges({ min: value[0], max: value[1] });
  };
  return (
    <div className="w-full flex-all flex-col gap-4">
      <p className="text-textcolor text-xs font-medium">
        From ${values[0]} - ${values[1]}
      </p>
      <Slider
        size="sm"
        step={10}
        minValue={min}
        maxValue={max}
        showTooltip={true}
        aria-label="Price Range"
        onChange={handleChange}
        value={values}
        defaultValue={[min, max]}
        formatOptions={{ style: "currency", currency: "USD" }}
        tooltipValueFormatOptions={{ style: "currency", currency: "USD" }}
        className={{
          base: "slider-class",
          filler: "bg-primary",
        }}
      />
    </div>
  );
};

export default TourPriceFilterPro;
