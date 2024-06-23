import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          100: "#ade8f4",
          200: "#48cae4",
          300: "#0096c7",
          400: "#0077b6",
          700: "#03045e",
        },
        secondaryGreen: {
          100: "#BFD8BD",
          200: "#98C9A3",
          300: "#77BFA3",
        },
        error: "#e63946",
        success: "#55a630",
        cancel: "#adb5bd",
      },
      screens: {},
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
