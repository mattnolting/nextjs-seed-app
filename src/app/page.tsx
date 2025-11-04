"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
import { Card, CardBody } from "@patternfly/react-core";

export default function Home() {
  return (
    <DashboardView title="Home">
      <Card>
        <CardBody>Welcome to Home</CardBody>
      </Card>
    </DashboardView>
  );
}
