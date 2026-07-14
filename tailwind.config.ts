import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        crimson: "#A50F12",
        wine: "#52090B",
        "veg-green": "#0B4A24",
        gold: "#C38A22",
        "royal-ivory": "#F7F0E3",
        midnight: "#0D0B09",
        "soft-ivory": "#FFF9EF",
        "muted-gold": "#8E692D",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
