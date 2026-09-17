import type { Metadata } from "next";
import { PlaceRail } from "@/components/PlaceRail";

export const metadata: Metadata = {
  title: "地点 / Places",
};

export default function PlacesPage() {
  return <PlaceRail />;
}
