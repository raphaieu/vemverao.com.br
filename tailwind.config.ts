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
        summer: {
          yellow: "#FFD700",
          orange: "#FF8C00",
          blue: "#00BFFF",
          light: "#FFF8DC",
        },
      },
    },
  },
  plugins: [],
};
export default config;

