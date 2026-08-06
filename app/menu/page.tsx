import React from "react";
import type { Metadata } from "next";
import MenuClient from "../../components/menu/MenuClient";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pure Vegetarian Menu & Chef Specialties",
  description: "Browse Maurya's complete pure vegetarian menu in Kondhwa, Pune. Fresh Paneer Butter Masala, Special Pav Bhaji, Mysore Masala Dosa, Dal Makhani, Veg Biryani, and family thalis.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Pure Vegetarian Menu | Maurya Pure Veg Kondhwa Pune",
    description: "Explore 100+ authentic pure vegetarian dishes, North Indian gravies, South Indian tiffin, and Maharashtrian specialties.",
    url: "https://mauryaveg.com/menu",
    images: [
      {
        url: "/editorial-table-feast.webp",
        width: 1200,
        height: 630,
        alt: "Maurya Pure Veg Menu and Culinary Delights",
      },
    ],
  },
};

export default async function MenuPage() {
  const categories = await db.getCategories();
  const items = await db.getMenuItems();

  return <MenuClient initialCategories={categories} initialItems={items} />;
}
