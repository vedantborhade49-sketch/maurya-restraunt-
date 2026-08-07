import type { Metadata } from "next";
import OrderClient from "@/components/order/OrderClient";

export const metadata: Metadata = {
  title: "Order Online & Direct Delivery | Maurya Pune",
  description: "Order pure vegetarian food directly from Maurya in Kondhwa, Pune. Fast home delivery and fresh takeaways. Free delivery under 3km.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Order Online & WhatsApp Delivery | Maurya Pure Veg Pune",
    description: "Get piping hot thalis, paneer curries, and crispy dosas delivered straight from our kitchen.",
    url: "https://mauryaveg.in/order",
    images: [
      {
        url: "/editorial-food-mains.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Food Delivery and Online Ordering",
      },
    ],
  },
};

export default function OrderPage() {
  return <OrderClient />;
}
