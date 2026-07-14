import React from "react";
import MenuClient from "../../components/menu/MenuClient";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const categories = await db.getCategories();
  const items = await db.getMenuItems();

  return <MenuClient initialCategories={categories} initialItems={items} />;
}
