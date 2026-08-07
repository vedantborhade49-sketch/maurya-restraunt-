import type { Metadata } from "next";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery & Dining Atmosphere",
  description: "Take a visual tour through Maurya Pure Veg Restaurant in Kondhwa, Pune. Explore our family dining halls, handcrafted culinary creations, and warm ambience.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Visual Gallery & Atmosphere | Maurya Pure Veg Pune",
    description: "Immerse yourself in the culinary artistry, royal ambience, and hospitality of Maurya.",
    url: "https://mauryaveg.in/gallery",
    images: [
      {
        url: "/inside-2.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Restaurant Dining Gallery",
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
