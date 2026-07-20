/**
 * MAURYA BRAND DESIGN SYSTEM v1.0
 * Centralized Design Tokens, Color Palette, Typography Scale, and Motion Tokens
 */

export const BRAND_COLORS = {
  wine: "#350709",      // Deep Wine (Primary dark)
  ivory: "#F8F6F1",     // Warm Ivory (Primary background/surface)
  brass: "#B98532",     // Brass Gold (Accent, borders, badges)
  green: "#164C2B",     // Forest Green (Pure Veg indicator)
  charcoal: "#1F1F1F",  // Charcoal Ink (Primary text on light)
  blood: "#8F1115",     // Accent Wine Highlight
} as const;

export const BRAND_FONTS = {
  serif: "var(--font-instrument), var(--font-cormorant), serif",
  sans: "var(--font-manrope), sans-serif",
  mono: "var(--font-manrope), monospace",
} as const;

export const TYPOGRAPHY_SCALE = {
  displayXL: "font-serif text-[12vw] md:text-[8vw] leading-[0.9] tracking-tight text-[#350709]",
  displayL: "font-serif text-[8vw] md:text-[5vw] leading-[0.95] tracking-tight text-[#350709]",
  heading: "font-serif text-3xl md:text-5xl leading-[1.1] text-[#350709]",
  subheading: "font-sans text-lg md:text-xl font-medium tracking-wide text-[#350709]/90",
  body: "font-sans text-sm md:text-base leading-relaxed text-[#1F1F1F]/80",
  caption: "font-serif italic text-xs md:text-sm text-[#B98532]",
  label: "font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-[#B98532]",
} as const;

export const MOTION_TOKENS = {
  easeEditorial: "power3.out",
  easeMask: "power4.out",
  easeDivider: "expo.out",
  durationFast: 0.25,
  durationMedium: 0.6,
  durationSlow: 1.0,
  staggerDelay: 0.08,
} as const;

export const BRAND_COPY = {
  tagline: "THE LIVING TABLE",
  motto: "COME HUNGRY. LEAVE WITH A STORY.",
  emotional: "TABLES WERE NEVER MADE FOR SILENCE.",
  philosophy: "PURE VEG. FULL OF LIFE.",
  since: "Since 1998",
  location: "Kondhwa Khurd, Pune",
  phone: "+91 70307 77051",
  whatsappUrl: "https://wa.me/917030777051",
} as const;

export const BRAND_VOCABULARY = {
  cart: "Your Table",
  addToCart: "Set on the Table",
  checkout: "Confirm Your Table",
  bestseller: "Guest Favourite",
  recommended: "Chef's Choice",
  categories: "Chapters",
  menu: "Dining Journey",
  searchPlaceholder: "What are you craving today?",
  subtotal: "Tonight's Table",
  confirmation: "Table Set & Confirmed",
} as const;
