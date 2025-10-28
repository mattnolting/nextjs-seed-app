"use client";

import { Page, PageSection, Title, Button } from "@patternfly/react-core";

export default function Home() {
  return (
    <Page>
      <PageSection variant="default">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Title headingLevel="h1" size="2xl" style={{ marginBottom: "1rem" }}>
            Welcome to PatternFly + Next.js
          </Title>
          <p style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
            This is a modern Next.js starter application with PatternFly React
            components.
          </p>
          <p style={{ marginBottom: "2rem", fontSize: "1rem", color: "#6a6e73" }}>
            PatternFly is an open source design system built to enable
            consistency and usability across a wide range of applications and
            use cases.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Button
              component="a"
              href="https://www.patternfly.org/get-started/develop"
              target="_blank"
              variant="primary"
            >
              Get Started with PatternFly
            </Button>
            <Button
              component="a"
              href="https://nextjs.org/docs"
              target="_blank"
              variant="secondary"
            >
              Next.js Documentation
            </Button>
          </div>
        </div>
      </PageSection>
    </Page>
  );
}
