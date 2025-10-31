"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
import { Card, CardBody } from "@patternfly/react-core";

export default function Home() {
  return (
    <DashboardView title="Home">
      <Card>
        <CardBody>Welcome to the PatternFly Next.js Starter</CardBody>
      </Card>
      <Card>
        <CardBody>Use content-patterns to build pages quickly</CardBody>
      </Card>
    </DashboardView>
  );
}
