import type { Metadata } from "next";
import OurStoryClient from "@/components/story/OurStoryClient";

export const metadata: Metadata = {
  title: "Our Heritage & Pure Vegetarian Philosophy",
  description: "Discover the heritage of Maurya Pure Veg Restaurant in Kondhwa, Pune. 35+ years of pure vegetarian culinary dedication, farm-fresh ingredients, and multi-generational hospitality.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "Our Story & Satvik Heritage | Maurya Pure Veg Pune",
    description: "Every table has a story. Discover how Maurya brings together traditional Indian culinary wisdom and warm family hospitality.",
    url: "https://mauryaveg.com/our-story",
    images: [
      {
        url: "/editorial-living-table.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Living Table and Heritage Philosophy",
      },
    ],
  },
};

export default function OurStoryPage() {
  return <OurStoryClient />;
}
