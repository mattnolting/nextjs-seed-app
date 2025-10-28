"use client";

import {
  Page,
  Masthead,
  MastheadMain,
  MastheadToggle,
  MastheadBrand,
  MastheadLogo,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageSection,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Nav,
  NavList,
  NavItem,
  Button,
} from "@patternfly/react-core";
import {
  HistoryIcon,
  ChartLineIcon,
  CogIcon,
  BellIcon,
  BarsIcon,
} from "@patternfly/react-icons";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering client-side interactivity after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const headerToolbar = (
    <Toolbar id="vertical-toolbar">
      <ToolbarContent>
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Notifications"
            icon={<BellIcon />}
          ></Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Settings"
            icon={<CogIcon />}
          ></Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            id="vertical-nav-toggle"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>
            <img
              src="https://www.patternfly.org/assets/images/pf_logo.svg"
              alt="PatternFly Logo"
            />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const sidebar = showSidebar ? (
    <PageSidebar isSidebarOpen={isSidebarOpen} id="vertical-sidebar">
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
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>{children}</PageSection>
    </Page>
  );
}
