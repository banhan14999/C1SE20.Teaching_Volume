/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      backgroundColor: {
        btn: "#950B0B",
      },
      borderRadius: {
        1: "6px",
        50:"50%",
      },
      height: {
        400: "400px",
      },
      width: {
        450: "450px",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadowColor: {
        red: "#9409A0",
      },
      padding:{
        10: "10%"
      },margin:{
        "1p":"1px",
        "2p":"2px",
        "4p":"4px",
        "6p":"6px",
        "7p":"7px"
      },
      flex:{
        0.5:"0.5"
      }
      
    },
  },
  plugins: [],
};
