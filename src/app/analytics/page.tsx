"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
import { CardView } from "@/components/content-patterns/CardView";
import { PageSection } from "@patternfly/react-core";

export default function Analytics() {
  // Example: choose a content pattern
  const useDashboard = false;

  if (useDashboard) {
    return <DashboardView title="Analytics">test</DashboardView>;
  }

  // Or use CardView
  return (
    <>
      {/* Or plain sections */}
      <PageSection aria-labelledby="section-1">
        <h2 id="section-1">Section 1</h2>
        <CardView
          items={[
            { id: "1", title: "Card 1", content: <div>Content</div> },
            { id: "2", title: "Card 2", content: <div>Content</div> },
          ]}
        />
      </PageSection>
    </>
  );
}
