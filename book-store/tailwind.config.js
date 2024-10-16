/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1A237E",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
