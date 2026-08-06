import type { Metadata } from "next";
import GroupDiningClient from "@/components/group-dining/GroupDiningClient";

export const metadata: Metadata = {
  title: "Group Dining, Banquets & Celebrations | Maurya Pune",
  description: "Host your family birthdays, anniversary milestones, and corporate celebrations at Maurya Pure Veg Restaurant, Kondhwa, Pune. Accommodating groups from 10 to 150 guests.",
  alternates: {
    canonical: "/group-dining",
  },
  openGraph: {
    title: "Group Dining & Family Celebrations | Maurya Pure Veg Pune",
    description: "Celebrate milestones with lavish pure veg spreads, personalized menus, and attentive service.",
    url: "https://mauryaveg.com/group-dining",
    images: [
      {
        url: "/editorial-table-feast.webp",
        width: 1200,
        height: 630,
        alt: "Group dining feast at Maurya Pune",
      },
    ],
  },
};

export default function GroupDiningPage() {
  return <GroupDiningClient />;
}
