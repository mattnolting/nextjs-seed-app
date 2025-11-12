"use client";

import {
  Button,
  Content,
  PageSection,
  Title,
} from "@patternfly/react-core";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";

export default function Home() {
  return (
    <PageSection isWidthLimited aria-labelledby="welcome-title">
      <Content>
        <Title id="welcome-title" headingLevel="h1">
          Welcome to the PatternFly Next.js Starter
        </Title>
        <p>
          You’re looking at the minimal shell. Use the sidebar to navigate, run
          the Quick Start CLI to scaffold demo content, or begin adding your own
          routes inside the `src/app/` directory.
        </p>
        <Button
          component="a"
          variant="link"
          icon={<ArrowRightIcon />}
          iconPosition="right"
          href="https://www.patternfly.org"
          target="_blank"
          rel="noreferrer"
        >
          Explore PatternFly documentation
        </Button>
      </Content>
    </PageSection>
  );
}
