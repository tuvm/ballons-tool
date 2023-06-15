/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      overlay: 'rgba(0, 0, 0, 0.8)',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      initial: 'initial',
      inherit: 'inherit',

      background: {
        dark: {
          1: '#172126',
          3: '#1F2C33',
          5: '#1F313B',
        },
        light: {
          1: '#ededed',
          3: '#fafafa',
          5: '#eaeaea',
        },
      },

      primary: {
        lighter: '#efc4df',
        light: '#9d2b73',
        main: '#6F1E51', // Primary / primary200s
        dark: '#220919', // Primary / primary400s
        active: '#6F1E51',
        200: '#6F1E51',
        300: '#50163a',
        400: '#220919',
        500: '#12050d',
        600: '#030102',
      },

      secondary: {
        lighter: '#fafafa',
        light: '#647a87',
        main: '#376580', // Primary / primary300s
        dark: '#082434', // Primary/primary600s
        active: 'rgba(57,194,215,0.1)',
      },

      blue: {
        50: "#f3e5f5",
        100: "#e1bee7",
        200: "#ce93d8",
        300: "#ba68c8",
        400: "#ab47bc",
        500: "#9c27b0",
        600: "#8e24aa",
        700: "#7b1fa2",
        800: "#6a1b9a",
        900: "#4a148c",
      },
    },
  },
  plugins: [],
});
