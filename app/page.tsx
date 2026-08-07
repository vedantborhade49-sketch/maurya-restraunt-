import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Maurya | Pure Vegetarian Restaurant in Kondhwa, Pune",
  description: "Welcome to Maurya, Pune's iconic pure vegetarian destination near ISKCON Temple, Kondhwa. Enjoy North Indian curries, Maharashtrian delights, Mysore dosas, and family feasts. Reserve a table or order online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maurya | Pure Vegetarian Restaurant in Kondhwa, Pune",
    description: "Welcome to Maurya, Pune's iconic pure vegetarian destination. Savor heritage pure veg recipes.",
    url: "https://mauryaveg.in",
    siteName: "Maurya Pure Veg Restaurant",
    images: [
      {
        url: "/outside.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Pure Veg Restaurant Entrance Kondhwa Pune",
      },
    ],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
