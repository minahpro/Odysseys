import { clsx } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isNumber(value) {
  return typeof parseInt(value) === "number";
}

export function isValidNumber(value) {
  // Convert the value to a number
  const numberValue = Number(value);

  // Check if the value is not an empty string and the converted value is a number and not NaN
  return (
    value.trim() !== "" &&
    typeof numberValue === "number" &&
    !isNaN(numberValue)
  );
}

export function getSlug(title) {
  const slug = slugify(title, {
    lower: true,
    remove: /[*+~,.()'"!:@]/g,
  });
  return slug;
}
// removes all HTML tags
export function stripHtml(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export function truncateDescription(desc, wordLimit) {
  const words = desc.split(" ");
  return (
    words.slice(0, wordLimit).join(" ") +
    (words.length > wordLimit ? "..." : "")
  );
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function changeToCurrency(amount) {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedAmount;
}

export function hasPermission(userRoleId, allowedRoleIds) {
  return allowedRoleIds.includes(userRoleId);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
