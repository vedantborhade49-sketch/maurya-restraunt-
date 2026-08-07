import type { Metadata } from "next";
import ReviewsClient from "@/components/reviews/ReviewsClient";

export const metadata: Metadata = {
  title: "Guest Reviews & Dining Memories (4.8★)",
  description: "Read real dining experiences and reviews from families and guests at Maurya Pure Veg Restaurant, Kondhwa, Pune. Rated 4.8/5 across 3,200+ visits.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Guest Reviews & Ratings | Maurya Pure Veg Pune",
    description: "Discover what guests love about our food, hospitality, and pure vegetarian dining ambience.",
    url: "https://mauryaveg.in/reviews",
    images: [
      {
        url: "/inside-1.webp",
        width: 1200,
        height: 630,
        alt: "Guest dining experiences at Maurya Pure Veg",
      },
    ],
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
