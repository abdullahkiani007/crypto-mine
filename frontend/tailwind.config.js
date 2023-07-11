/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#020202",
        color: "#fff",
      },
      boxShadow: {
        custom: "-2px 1px 20px -2px rgba(224,224,224,0.75)",
      },
    },
  },
  plugins: [],
};
