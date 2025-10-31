"use client";

import { CardView } from "@/components/content-patterns/CardView";

export default function Gallery() {
  return (
    <CardView
      items={[
        { id: "1", title: "Gallery Item 1", content: <div>Item 1</div> },
        { id: "2", title: "Gallery Item 2", content: <div>Item 2</div> },
        { id: "3", title: "Gallery Item 3", content: <div>Item 3</div> },
      ]}
    />
  );
}
