"use client";

import { CardView, type CardItem } from "@/components/content-patterns/CardView";

const demoItems: CardItem[] = [
  { id: "1", title: "Card 1", description: "Card description 1" },
  { id: "2", title: "Card 2", description: "Card description 2" },
  { id: "3", title: "Card 3", description: "Card description 3" },
  { id: "4", title: "Card 4", description: "Card description 4" },
  { id: "5", title: "Card 5", description: "Card description 5" },
];

export default function Gallery() {
  return <CardView items={demoItems} />;
}
