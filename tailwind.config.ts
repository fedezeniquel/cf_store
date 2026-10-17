import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cf-forest": "#04402A",
        "cf-wine": "#A62447",
        "action-slate": "#71749F",
        gold: "#BFA004",
        silver: "#C2C6C7",
        dark: "#1F2937",
        standard: "#767676",
        "base-white": "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-roboto)", "sans-serif"],
        story: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
