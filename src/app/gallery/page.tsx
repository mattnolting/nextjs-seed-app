"use client";

import { CardView } from "@/components/content-patterns/CardView";
import { useAppData } from "@/lib/data/useAppData";

export default function Gallery() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useCardView = true;

  if (loading) {
    return <CardView items={[]} title="Gallery" showEmptyState={false} />;
  }

  if (error) {
    return (
      <CardView
        items={[]}
        title="Gallery"
        description={`Error loading data: ${error.message}`}
        showEmptyState={false}
      />
    );
  }

  if (useCardView && data?.cardView) {
    return (
      <CardView
        items={data.cardView.items || []}
        title="Gallery"
        description="Browse available projects and items"
        filterCategories={data.cardView.filters?.categories}
      />
    );
  }

  return (
    <CardView
      items={[]}
      title="Gallery"
      description="No data available"
      showEmptyState={false}
    />
  );
}
