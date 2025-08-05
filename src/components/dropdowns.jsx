"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NavDropdown = ({ title, items, className = "" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`text-white hover:text-primary hover:bg-transparent font-openSans font-semibold ${className}`}
        >
          {title}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 p-4 border-gray-800">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="text-white p-3 hover:text-primary hover:bg-gray-800 cursor-pointer"
          >
            <a href={item?.link} className="w-full">
              {item.title}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const FilterSelect = ({
  placeholder,
  options,
  value,
  onValueChange,
  className = "",
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`bg-gray-800 border-gray-700 text-white focus:border-primary ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-800">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-white hover:text-primary hover:bg-gray-800"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const SortDropdown = ({ value, onValueChange, className = "" }) => {
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "duration", label: "Duration" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`bg-gray-800 border-gray-700 text-white focus:border-primary w-48 ${className}`}
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-800">
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-white hover:text-primary hover:bg-gray-800"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const LanguageDropdown = ({ className = "" }) => {
  const languages = [
    { value: "en", label: "English" },
    { value: "sw", label: "Swahili" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-gray-400 hover:text-primary hover:bg-transparent ${className}`}
        >
          EN
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-800">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            className="text-white hover:text-primary hover:bg-gray-800 cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const CurrencyDropdown = ({ className = "" }) => {
  const currencies = [
    { value: "usd", label: "USD ($)" },
    { value: "eur", label: "EUR (€)" },
    { value: "gbp", label: "GBP (£)" },
    { value: "tzs", label: "TZS (TSh)" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-gray-400 hover:text-primary hover:bg-transparent ${className}`}
        >
          USD
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-800">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.value}
            className="text-white hover:text-primary hover:bg-gray-800 cursor-pointer"
          >
            {currency.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
