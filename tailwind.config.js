/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F9AFD",
        "light-opacity": "rgba(0,0,0,0.5)"
      }
    },
  },
  plugins: [],
};
