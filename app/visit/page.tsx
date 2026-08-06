import type { Metadata } from "next";
import VisitClient from "@/components/visit/VisitClient";

export const metadata: Metadata = {
  title: "Visit Us & Reserve a Table | Kondhwa, Pune",
  description: "Visit Maurya Pure Veg Restaurant at Tilekar Nagar, Kondhwa Khurd, Pune (Near ISKCON Temple). Open 11:00 AM – 11:00 PM daily. Book your family table in advance or get driving directions.",
  alternates: {
    canonical: "/visit",
  },
  openGraph: {
    title: "Visit Maurya Pure Veg | Kondhwa Khurd, Pune",
    description: "Find your way to Pune's timeless pure vegetarian dining hall. Valet parking, AC family dining, and satvik cuisine.",
    url: "https://mauryaveg.com/visit",
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
