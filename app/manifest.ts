import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maurya Pure Veg Restaurant Pune",
    short_name: "Maurya Veg",
    description: "Ultra-luxurious Pure Vegetarian dining, North Indian, South Indian, Maharashtrian & Chinese delicacies in Kondhwa, Pune.",
    start_url: "/",
    display: "standalone",
    background_color: "#161413",
    theme_color: "#161413",
    icons: [
      {
        src: "/morya-logo.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/morya-logo.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
