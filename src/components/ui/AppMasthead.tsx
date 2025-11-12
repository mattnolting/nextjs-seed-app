"use client";

import {
  Masthead,
  MastheadMain,
  MastheadToggle,
  MastheadBrand,
  MastheadLogo,
  MastheadContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Button,
  PageToggleButton,
  Brand,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import BellIcon from "@patternfly/react-icons/dist/esm/icons/bell-icon";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import MoonIcon from "@patternfly/react-icons/dist/esm/icons/moon-icon";
import SunIcon from "@patternfly/react-icons/dist/esm/icons/sun-icon";
import { useRouter } from "next/navigation";

const DEFAULT_LOGO_LIGHT = "/PF-HorizontalLogo-Color.svg";
const DEFAULT_LOGO_DARK = "/PF-HorizontalLogo-Color-reverse.svg";

export function AppMasthead({
  isSidebarOpen,
  onSidebarToggle,
  logo,
  toolbarItems = ["notifications", "settings"],
  theme,
  onThemeToggle,
  showToolbar = true,
}: {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  logo?: string;
  toolbarItems?: string[];
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  showToolbar?: boolean;
}) {
  const router = useRouter();

  const effectiveToolbarItems = toolbarItems ?? [];
  const shouldRenderToolbar = showToolbar && effectiveToolbarItems.length > 0;

  const mastheadToolbar = shouldRenderToolbar && (
    <Toolbar
      suppressHydrationWarning
      id="vertical-toolbar"
      ouiaId="app-masthead-toolbar"
    >
      <ToolbarContent>
        <ToolbarGroup
          align={{ default: "alignEnd" }}
          variant="action-group-plain"
        >
          {effectiveToolbarItems.includes("notifications") && (
            <ToolbarItem>
              <Button
                variant="plain"
                aria-label="Notifications"
                icon={<BellIcon />}
                ouiaId="masthead-notifications-button"
              />
            </ToolbarItem>
          )}
          {effectiveToolbarItems.includes("settings") && (
            <ToolbarItem>
              <Button
                variant="plain"
                aria-label="Settings"
                icon={<CogIcon />}
                onClick={() => router.push("/settings")}
                ouiaId="masthead-settings-button"
              />
            </ToolbarItem>
          )}
          {effectiveToolbarItems.includes("theme") && (
            <ToolbarItem>
              <Button
                variant="plain"
                aria-label={
                  theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
                }
                icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
                onClick={onThemeToggle}
                ouiaId="masthead-theme-toggle-button"
              />
            </ToolbarItem>
          )}
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            id="vertical-nav-toggle"
            ouiaId="masthead-toggle-button"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="/">
            <div className="show-light">
              <Brand
                src={logo ?? DEFAULT_LOGO_LIGHT}
                alt="Patternfly"
                heights={{ default: "36px" }}
              />
            </div>
            <div className="show-dark">
              <Brand
                src={DEFAULT_LOGO_DARK}
                alt="Patternfly"
                heights={{ default: "36px" }}
              />
            </div>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{mastheadToolbar}</MastheadContent>
    </Masthead>
  );
}
