/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#083633", // Forest green
        secondary: "#9B7342", // Deep bronze
        accent: "#fae1a8", // Safari gold / sand beige
        highlight: "#f2e9dc", // Desert ivory
      },
      fontFamily: {
        jua: ["var(--font-jua)", "serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
