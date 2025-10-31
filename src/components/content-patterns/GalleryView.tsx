"use client";

import { ReactNode } from "react";
import {
  PageSection,
  Gallery,
  GalleryItem,
  Title,
} from "@patternfly/react-core";

export interface GalleryViewProps {
  children?: ReactNode;
  title?: string;
}

export function GalleryView({ children, title = "Gallery" }: GalleryViewProps) {
  return (
    <PageSection>
      {title && (
        <Title
          headingLevel="h1"
          size="2xl"
          style={{ marginBottom: "var(--pf-v5-global--spacer--lg)" }}
        >
          {title}
        </Title>
      )}
      <Gallery hasGutter>
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <GalleryItem key={index}>{child}</GalleryItem>
          ))
        ) : (
          <GalleryItem>{children}</GalleryItem>
        )}
      </Gallery>
    </PageSection>
  );
}
