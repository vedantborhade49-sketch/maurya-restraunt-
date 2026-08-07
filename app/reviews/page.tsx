import type { Metadata } from "next";
import ReviewsClient from "@/components/reviews/ReviewsClient";

export const metadata: Metadata = {
  title: "Guest Reviews & Dining Memories (4.5★)",
  description: "Read genuine dining experiences and reviews from guests at Maurya Pure Veg Restaurant, Khadi Machine Chowk, Kondhwa, Pune. Rated 4.5/5 with 933+ Google Reviews.",
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
