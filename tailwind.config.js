/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "375px" },
      //=> @media (min-width: 375px){...}
    },
    extend: {},
  },
  plugins: [],
};
