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
        background: "var(--maurya-dark)",
        foreground: "var(--foreground)",
        crimson: "var(--maurya-blood)",
        wine: "var(--maurya-wine)",
        burgundy: "#B71C1C",
        maroon: "#C62828",
        terracotta: "#9A5C3B",
        "veg-green": "var(--maurya-leaf)",
        gold: "var(--maurya-brass)",
        "royal-ivory": "var(--maurya-ivory)",
        midnight: "#161413",
        "soft-ivory": "var(--maurya-ivory)",
        "muted-gold": "var(--maurya-brass)",
        ink: "#161413",
        ivory: "var(--maurya-ivory)",
        cream: "var(--maurya-ivory)",
        charcoal: "#161413",
        olive: "#6A7A61",
        muted: "#6B6763",
        accent: "rgba(154,92,59,0.12)",
        "maurya-blood": "var(--maurya-blood)",
        "maurya-wine": "var(--maurya-wine)",
        "maurya-burgundy": "#B71C1C",
        "maurya-maroon": "#C62828",
        "maurya-terracotta": "#9A5C3B",
        "maurya-dark": "var(--maurya-dark)",
        "maurya-ivory": "var(--maurya-ivory)",
        "maurya-brass": "var(--maurya-brass)",
        "maurya-leaf": "var(--maurya-leaf)",
        "maurya-chilli": "var(--maurya-chilli)",
        ch1: { bg: "var(--maurya-ivory)", text: "var(--maurya-wine)", accent: "var(--maurya-brass)" },
        ch2: { bg: "var(--maurya-ivory)", text: "var(--maurya-wine)", accent: "var(--maurya-brass)" },
        ch3: { bg: "var(--maurya-wine)", text: "var(--maurya-ivory)", accent: "var(--maurya-brass)", secondary: "rgba(248,245,239,0.7)", divider: "rgba(154,92,59,0.2)" },
        ch4: { bg: "#F8F5EF", text: "#272322", accent: "#9A5C3B" },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
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
