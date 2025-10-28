"use client";

import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageSection,
  Nav,
  NavList,
  NavItem,
} from "@patternfly/react-core";
import { HistoryIcon, ChartLineIcon, CogIcon } from "@patternfly/react-icons";
import { useState, useEffect } from "react";

export interface DashboardLayoutProps {
  /** Main content to render in the dashboard */
  children: React.ReactNode;
  /** Page title displayed in header */
  title?: string;
  /** Show or hide sidebar navigation */
  showSidebar?: boolean;
}

/**
 * DashboardLayout Component
 *
 * A responsive dashboard layout with header, sidebar navigation, and main content area.
 * Built with PatternFly components for consistency and accessibility.
 *
 * @example
 * ```tsx
 * <DashboardLayout title="My Dashboard">
 *   <YourContent />
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  children,
  title = "Dashboard",
  showSidebar = true,
}: DashboardLayoutProps) {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering client-side interactivity after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const header = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>{title}</MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const sidebar = showSidebar ? (
    <PageSidebar>
      <PageSidebarBody>
        <Nav suppressHydrationWarning>
          <NavList>
            <NavItem
              itemId="dashboard"
              isActive={mounted && activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
              suppressHydrationWarning
            >
              <HistoryIcon /> Dashboard
            </NavItem>
            <NavItem
              itemId="analytics"
              isActive={mounted && activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
              suppressHydrationWarning
            >
              <ChartLineIcon /> Analytics
            </NavItem>
            <NavItem
              itemId="settings"
              isActive={mounted && activeItem === "settings"}
              onClick={() => setActiveItem("settings")}
              suppressHydrationWarning
            >
              <CogIcon /> Settings
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  ) : null;

  return (
    <>
      {header}
      <Page>
        {sidebar}
        <PageSection>{children}</PageSection>
      </Page>
    </>
  );
}
