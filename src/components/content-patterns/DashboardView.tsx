"use client";

import { ReactNode } from "react";
import {
  PageSection,
  Gallery,
  GalleryItem,
  Card,
  CardBody,
  Title,
} from "@patternfly/react-core";

export interface DashboardViewProps {
  title?: string;
  children?: ReactNode;
}

export function DashboardView({
  title = "Dashboard",
  children,
}: DashboardViewProps) {
  return (
    <>
      {title && (
        <PageSection>
          <Title
            headingLevel="h1"
            size="2xl"
            style={{ marginBottom: "var(--pf-v5-global--spacer--lg)" }}
          >
            {title}
          </Title>
        </PageSection>
      )}
      <PageSection>
        <Gallery hasGutter>
          {children ? (
            Array.isArray(children) ? (
              children.map((child, idx) => (
                <GalleryItem key={idx}>{child}</GalleryItem>
              ))
            ) : (
              <GalleryItem>{children}</GalleryItem>
            )
          ) : (
            <>
              <GalleryItem>
                <Card>
                  <CardBody>Metric 1</CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardBody>Metric 2</CardBody>
                </Card>
              </GalleryItem>
              <GalleryItem>
                <Card>
                  <CardBody>Metric 3</CardBody>
                </Card>
              </GalleryItem>
            </>
          )}
        </Gallery>
      </PageSection>
    </>
  );
}
