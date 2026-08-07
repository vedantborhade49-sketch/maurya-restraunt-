import type { Metadata } from "next";
import VisitClient from "@/components/visit/VisitClient";

export const metadata: Metadata = {
  title: "Visit Us & Reserve a Table | Kondhwa, Pune",
  description: "Visit Maurya Pure Veg Restaurant at Shop 5,6 Sun Radiant Commercial Society, Khadi Machine Chowk, Kondhwa, Pune 411048. Open 8:00 AM – 11:30 PM daily. Book your family table in advance or get driving directions.",
  alternates: {
    canonical: "/visit",
  },
  openGraph: {
    title: "Visit Maurya Pure Veg | Khadi Machine Chowk, Kondhwa, Pune",
    description: "Find your way to Pune's timeless pure vegetarian dining hall at Khadi Machine Chowk, Kondhwa. Family dining, banquet space, and satvik cuisine.",
    url: "https://mauryaveg.in/visit",
    images: [
      {
        url: "/outside.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Restaurant Location and Directions",
      },
    ],
  },
};

export default function VisitPage() {
  return <VisitClient />;
}
