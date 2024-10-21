/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1A237E",
        lightNavy: "#3949AB",
        sky: "#BBDEFB",
        sunset: "#FF7043",
      },
      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
        },
        textAppear: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "flip-book": "flip 1s infinite ease-in-out",
        "text-blink": "textAppear 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
