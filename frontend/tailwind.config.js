/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      backgroundColor: {
        btn: "#950B0B",
      },
      borderRadius: {
        1: "6px",
        50: "50%",
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
      padding: {
        10: "10%",
      },
      margin: {
        "1p": "1px",
        "2p": "2px",
        "4p": "4px",
        "6p": "6px",
        "7p": "7px",
      },
      flex: {
        0.5: "0.5",
      },
    },
  },
  plugins: [],
};
