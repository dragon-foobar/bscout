module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/gradients.ts",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      mono: "Ubuntu",
    },
    extend: {
      colors: {
        "dark-accent-1": "#111111",
        "dark-accent-2": "#333333",
        "dark-accent-3": "#444444",
        "dark-accent-5": "#888888",
        "bitcoin-main": "#F2A900",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
  ],
};
