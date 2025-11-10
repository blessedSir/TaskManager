// tailwind.config.js
export default {
  darkMode: "class", // включаем темную тему через класс
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#111827", // bg-gray-900
        },
        text: {
          light: "#1f2937", // text-gray-900
          dark: "#f3f4f6", // text-gray-100
        },
      },
    },
  },
  plugins: [],
};
