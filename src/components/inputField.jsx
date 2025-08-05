import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FetchCategories, InputLoading } from "./Loadings/LoadingComp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const InputField = ({
  label,
  type,
  placeholder,
  name,
  onChange,
  className,
  pattern,
  value,
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-primary/50">
          {label}
        </label>
      )}

      <input
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        id={`field_${name}`}
        onChange={onChange}
        required
        value={value}
        pattern={pattern}
        className={`w-full font-semibold border focus:border-slate-600 text-sm rounded p-3.5 text-white placeholder:font-light placeholder:text-slate-500 bg-highlight/50 border-gray-900 ${className}`}
      />

      {/* {error && <span className="text-red-500 py-1">{error.message}</span>} */}
    </div>
  );
};

export const TextareaField = ({
  label,
  rows,
  placeholder,
  name,
  onChange,
  value,
  className,
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        id={`field_${name}`}
        onChange={onChange}
        required
        value={value}
        rows={rows || 4}
        className={`w-full border focus:border-slate-600 text-sm font-semibold rounded p-3.5 text-white placeholder:font-light placeholder:text-slate-500 bg-highlight/50 border-gray-900 ${className}`}
      />

      {/* {error && <span className="text-red-500 py-1">{error.message}</span>} */}
    </div>
  );
};

// accordion

export const AccordionFieldComp = ({
  title,
  children,
  className,
  allDivClass,
  Icon,
}) => {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value={"one"} className={`${allDivClass}`}>
        <AccordionTrigger
          className={`${className} hover:no-underline no-underline`}
        >
          <div className="flex items-center gap-4">
            <Icon className="sm:text-xl text-md text-primary" />
            <h1 className="sm:text-lg text-gray-300 text-md font-semibold leading-8">
              {title}
            </h1>
          </div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const SimpleAccordionFieldComp = ({ title, children }) => {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value={"one"} className={`border-b-0`}>
        <AccordionTrigger
          className={`border bg-highlight/40 rounded border-slate-800 py-3 px-4 hover:no-underline no-underline`}
        >
          <h4 className="text-[15px] text-gray-300 leading-8 font-normal">
            {title}
          </h4>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const SelectField = ({
  label,
  placeholder,
  options,
  handleSingleSelectChange,
  initialValue,
  Icon,
  isLoading,
}) => {
  //updating selected input (assign it initial value)
  useEffect(() => {
    if (initialValue) {
      setSelectedItem(() => initialValue);
    }
  }, [initialValue]);

  const [selectedItem, setSelectedItem] = useState("");
  return isLoading ? (
    <InputLoading />
  ) : (
    <div>
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
          {label}
        </label>
      )}
      <Select
        value={selectedItem}
        onValueChange={(value) => {
          handleSingleSelectChange(value);
          setSelectedItem(value);
        }}
      >
        <div className="flex text-textcolor overflow-hidden items-center border w-full bg-white/60 border-secondary/50 rounded">
          <span className="w-14 h-12 flex-all bg-bgcolor/40 rounded">
            <Icon className="h-5 w-5 text-primary" />
          </span>
          {placeholder && (
            <SelectTrigger className="w-full h-12 border-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          )}
          <SelectContent className="bg-white p-4 border-gray-300">
            {options?.map((option, id) => (
              <SelectItem
                key={id}
                value={option?.value}
                className="capitalize font-medium text-primary p-3 hover:bg-accent cursor-pointer"
              >
                {option?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </div>
      </Select>
    </div>
  );
};

export const RadioFilter = ({ options, handleChange, isLoading }) => {
  return isLoading ? (
    <FetchCategories />
  ) : (
    <RadioGroup defaultValue="option-one">
      {options?.map((option, index) => {
        return (
          <div key={index} className="flex mt-2 items-center space-x-4">
            <RadioGroupItem
              value={option?.value}
              id={option?.id}
              onClick={() => handleChange(option?.value)}
            />
            <p
              htmlFor={option?.id}
              className="text-sm text-textcolor capitalize"
            >
              {option?.label}
            </p>
          </div>
        );
      })}
    </RadioGroup>
  );
};
