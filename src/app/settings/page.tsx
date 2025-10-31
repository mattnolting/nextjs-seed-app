"use client";

import { PageSection, Card, CardBody, Title } from "@patternfly/react-core";

export default function Settings() {
  return (
    <>
      <PageSection>
        <Title
          headingLevel="h1"
          size="2xl"
          style={{ marginBottom: "var(--pf-v5-global--spacer--lg)" }}
        >
          Settings
        </Title>
        <Card>
          <CardBody>
            <p>Settings forms and configuration options go here.</p>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
}
