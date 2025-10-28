"use client";

import {
  Page,
  PageSection,
  Split,
  SplitItem,
  Divider,
} from "@patternfly/react-core";

export interface SplitViewLayoutProps {
  /** Left panel content */
  leftPanel: React.ReactNode;
  /** Right panel content */
  rightPanel: React.ReactNode;
  /** Left panel width percentage (default: 50) */
  leftWidth?: number;
  /** Show vertical divider between panels */
  showDivider?: boolean;
  /** Orientation */
  orientation?: "vertical" | "horizontal";
}

/**
 * SplitViewLayout Component
 *
 * A split-view layout with two resizable panels.
 * Useful for master-detail views, editors, etc.
 *
 * @example
 * ```tsx
 * <SplitViewLayout
 *   leftPanel={<ListComponent />}
 *   rightPanel={<DetailComponent />}
 *   leftWidth={40}
 * />
 * ```
 */
export function SplitViewLayout({
  leftPanel,
  rightPanel,
  leftWidth = 50,
  showDivider = true,
  orientation = "vertical",
}: SplitViewLayoutProps) {
  return (
    <Page>
      <PageSection>
        <Split hasGutter={showDivider}>
          <SplitItem style={{ flex: `0 0 ${leftWidth}%` }}>
            {leftPanel}
          </SplitItem>
          {showDivider && <Divider orientation={orientation} />}
          <SplitItem isFilled>{rightPanel}</SplitItem>
        </Split>
      </PageSection>
    </Page>
  );
}
