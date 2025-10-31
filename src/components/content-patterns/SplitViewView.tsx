"use client";

import { PageSection, Split, SplitItem, Divider } from "@patternfly/react-core";

export interface SplitViewViewProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftWidth?: number;
  showDivider?: boolean;
  orientation?: "vertical" | "horizontal";
}

export function SplitViewView({
  leftPanel,
  rightPanel,
  leftWidth = 50,
  showDivider = true,
  orientation = "vertical",
}: SplitViewViewProps) {
  return (
    <PageSection>
      <Split hasGutter={showDivider}>
        <SplitItem style={{ flex: `0 0 ${leftWidth}%` }}>{leftPanel}</SplitItem>
        {showDivider && <Divider orientation={{ default: orientation }} />}
        <SplitItem isFilled>{rightPanel}</SplitItem>
      </Split>
    </PageSection>
  );
}
