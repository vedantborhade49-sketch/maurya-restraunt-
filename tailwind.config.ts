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
        "veg-green": "var(--maurya-leaf)",
        gold: "var(--maurya-brass)",
        "royal-ivory": "var(--maurya-ivory)",
        midnight: "var(--maurya-dark)",
        "soft-ivory": "var(--maurya-ivory)",
        "muted-gold": "var(--maurya-brass)",
        ink: "var(--maurya-dark)",
        ivory: "var(--maurya-ivory)",
        cream: "var(--maurya-ivory)",
        maroon: "var(--maurya-blood)",
        charcoal: "#262626",
        olive: "#6A7A61",
        muted: "#6B6763",
        accent: "rgba(123,30,35,0.08)",
        "maurya-blood": "var(--maurya-blood)",
        "maurya-wine": "var(--maurya-wine)",
        "maurya-dark": "var(--maurya-dark)",
        "maurya-ivory": "var(--maurya-ivory)",
        "maurya-brass": "var(--maurya-brass)",
        "maurya-leaf": "var(--maurya-leaf)",
        "maurya-chilli": "var(--maurya-chilli)",
        ch1: { bg: "var(--maurya-ivory)", text: "var(--maurya-wine)", accent: "var(--maurya-brass)" },
        ch2: { bg: "var(--maurya-ivory)", text: "var(--maurya-wine)", accent: "var(--maurya-brass)" },
        ch3: { bg: "var(--maurya-wine)", text: "var(--maurya-ivory)", accent: "var(--maurya-brass)", secondary: "rgba(243,232,212,0.7)", divider: "rgba(185,133,50,0.18)" },
        ch4: { bg: "#F4F0E8", text: "#3D3530", accent: "#B09272" },
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
