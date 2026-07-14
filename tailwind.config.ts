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
        ch1: { bg: "#F6F1EA", text: "#1F1A17", accent: "#B58A45" },
        ch2: { bg: "#ECE5DB", text: "#24201C", accent: "#A97C38" },
        ch3: { bg: "#4A1F28", text: "#F5EEE5", accent: "#C89B4A", secondary: "#D8C6BA", divider: "rgba(200,155,74,0.18)" },
        ch4: { bg: "#3E4638", text: "#F7F3EE", accent: "#B9965A" },
        ch5: { bg: "#171616", text: "#F3EFE8", accent: "#C69A52" },
        contact: { bg: "#F5EFE6", text: "#241E1B", accent: "#B98A43" },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-space-grotesk)"],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
