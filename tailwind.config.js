/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-100": "#003B5C",
        "primary-200": "#EA7600",
        "primary-300": "#545859",
        "primary-400": "#51284F",
      },
      fontFamily: {
        "poppins-thin": ["Poppins-Thin", 'sans-serif'],
        "poppins-light": ["Poppins-Light", 'sans-serif'],
        "poppins-regular": ["Poppins-Regular", 'sans-serif'],
        "poppins-medium": ["Poppins-Medium", 'sans-serif'],
        "poppins-semiBold": ["Poppins-SemiBold", 'sans-serif'],
        "poppins-bold": ["Poppins-Bold", 'sans-serif'],
        "poppins-extraBold": ["Poppins-ExtraBold", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
