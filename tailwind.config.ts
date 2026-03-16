import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: "#f5f0e8",
        sumi: "#1a1a1a",
        vermillion: "#c0392b",
        gold: "#d4a017",
      },
      fontFamily: {
        serif: ["Noto Serif JP", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
