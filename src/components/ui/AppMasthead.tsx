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
  Nav,
  NavList,
  NavItem,
  PageToggleButton,
  Brand,
} from "@patternfly/react-core";
import pfLogo from "@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import BellIcon from "@patternfly/react-icons/dist/esm/icons/bell-icon";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import MoonIcon from "@patternfly/react-icons/dist/esm/icons/moon-icon";
import SunIcon from "@patternfly/react-icons/dist/esm/icons/sun-icon";
import DesktopIcon from "@patternfly/react-icons/dist/esm/icons/desktop-icon";
import { usePathname, useRouter } from "next/navigation";
import { useRoutes } from "@/lib/navigation/useRoutes";

export function AppMasthead({
  isSidebarOpen,
  onSidebarToggle,
  logo,
  toolbarItems = ["notifications", "settings"],
  theme,
  onThemeToggle,
  navMode = "sidebar",
}: {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  logo?: string;
  toolbarItems?: string[];
  theme?: "light" | "dark" | "system";
  onThemeToggle?: () => void;
  navMode?: "sidebar" | "masthead";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = useRoutes();
  const headerToolbar = (
    <Toolbar id="vertical-toolbar">
      <ToolbarContent>
        {(toolbarItems.includes("notifications") ||
          toolbarItems.includes("settings") ||
          toolbarItems.includes("theme")) && (
          <ToolbarGroup align={{ default: "alignEnd" }}>
            {toolbarItems.includes("notifications") && (
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label="Notifications"
                  icon={<BellIcon />}
                />
              </ToolbarItem>
            )}
            {toolbarItems.includes("settings") && (
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label="Settings"
                  icon={<CogIcon />}
                />
              </ToolbarItem>
            )}
            {toolbarItems.includes("theme") && (
              <ToolbarItem>
                <Button
                  variant="plain"
                  aria-label={
                    theme === "dark"
                      ? "Switch to system theme"
                      : theme === "light"
                      ? "Switch to dark theme"
                      : "Switch to light theme"
                  }
                  icon={
                    theme === "dark" ? (
                      <DesktopIcon />
                    ) : theme === "light" ? (
                      <MoonIcon />
                    ) : (
                      <SunIcon />
                    )
                  }
                  onClick={onThemeToggle}
                />
              </ToolbarItem>
            )}
          </ToolbarGroup>
        )}
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <Masthead>
      <MastheadMain>
        {navMode === "sidebar" && (
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
        )}
        <MastheadBrand>
          <MastheadLogo component="a" href="/">
            <Brand
              src={logo || pfLogo}
              alt="PatternFly"
              heights={{ default: "36px" }}
            />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        {navMode === "masthead" && (
          <Nav
            aria-label="Global"
            variant="horizontal"
            style={{ marginRight: 16 }}
          >
            <NavList>
              {routes
                .filter((r) => !r.hidden)
                .map((item) => (
                  <NavItem
                    key={item.path}
                    isActive={
                      pathname === item.path ||
                      pathname.startsWith(item.path + "/")
                    }
                    preventDefault
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.path);
                    }}
                  >
                    {item.title}
                  </NavItem>
                ))}
            </NavList>
          </Nav>
        )}
        {headerToolbar}
      </MastheadContent>
    </Masthead>
  );
}
