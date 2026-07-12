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
        ink: "#0A0A0A",
        ivory: "#F8F5F0",
        cream: "#F4EFE8",
        maroon: "#6F1D1B",
        gold: "#C49A48",
        charcoal: "#262626",
        olive: "#6A7A61",
        muted: "#6B6763",
        accent: "rgba(123,30,35,0.08)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
