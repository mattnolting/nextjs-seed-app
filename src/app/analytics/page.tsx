"use client";

import { PrimaryDetailView } from "@/components/content-patterns/PrimaryDetailView";
import {
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from "@patternfly/react-core";
import { useAppData } from "@/lib/data/useAppData";

export default function Analytics() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const usePrimaryDetailView = true;

  if (loading) {
    return (
      <PrimaryDetailView
        masterItems={[]}
        renderDetail={() => <div>Loading...</div>}
        title="Analytics"
      />
    );
  }

  if (error) {
    return (
      <PrimaryDetailView
        masterItems={[]}
        renderDetail={() => <div>Error loading data: {error.message}</div>}
        title="Analytics"
      />
    );
  }

  if (usePrimaryDetailView && data?.primaryDetail) {
    return (
      <PrimaryDetailView
        masterItems={data.primaryDetail.primaryItems || []}
        renderDetail={(item) => {
          // Custom render function for detail view using PatternFly DescriptionList
          return (
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Title</DescriptionListTerm>
                <DescriptionListDescription>
                  {item.title}
                </DescriptionListDescription>
              </DescriptionListGroup>
              {item.description && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Description</DescriptionListTerm>
                  <DescriptionListDescription>
                    {item.description}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {item.meta &&
                Object.entries(item.meta).map(([key, value]) => (
                  <DescriptionListGroup key={key}>
                    <DescriptionListTerm>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {String(value)}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
            </DescriptionList>
          );
        }}
        title="Analytics"
        masterTitle="Analytics Items"
        detailTitle="Analytics Details"
        emptyStateMessage="Select an analytics item to view details"
      />
    );
  }

  return (
    <PrimaryDetailView
      masterItems={[]}
      renderDetail={() => <div>No data available</div>}
      title="Analytics"
    />
  );
}
