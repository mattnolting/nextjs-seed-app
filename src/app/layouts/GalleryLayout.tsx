"use client";

import {
  Page,
  PageSection,
  Gallery,
  GalleryItem,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "@patternfly/react-core";

export interface GalleryItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface GalleryLayoutProps {
  /** Array of items to display in gallery */
  items: GalleryItemData[];
  /** Number of columns (min width per item) */
  minWidths?: {
    default?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

/**
 * GalleryLayout Component
 *
 * A responsive gallery layout for displaying cards in a grid.
 * Automatically adjusts columns based on screen size.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: "1", title: "Card 1", content: <div>Content</div> },
 *   { id: "2", title: "Card 2", content: <div>Content</div> },
 * ];
 *
 * <GalleryLayout items={items} />
 * ```
 */
export function GalleryLayout({
  minWidths = {
    default: "100%",
    md: "300px",
    lg: "350px",
    xl: "400px",
  },
}: GalleryLayoutProps) {
  const items = [
    { id: "1", title: "Card 1", content: <div>Content</div> },
    { id: "2", title: "Card 2", content: <div>Content</div> },
  ];
  return (
    <Page>
      <PageSection>
        <Gallery hasGutter minWidths={minWidths}>
          {items.map((item) => (
            <GalleryItem key={item.id}>
              <Card isFullHeight>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardBody>{item.content}</CardBody>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>
    </Page>
  );
}
