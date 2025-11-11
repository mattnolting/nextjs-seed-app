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
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import BellIcon from "@patternfly/react-icons/dist/esm/icons/bell-icon";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import MoonIcon from "@patternfly/react-icons/dist/esm/icons/moon-icon";
import SunIcon from "@patternfly/react-icons/dist/esm/icons/sun-icon";
import DesktopIcon from "@patternfly/react-icons/dist/esm/icons/desktop-icon";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRoutes } from "@/lib/navigation/useRoutes";

const DEFAULT_LOGO_LIGHT = "/PF-HorizontalLogo-Color.svg";
const DEFAULT_LOGO_DARK = "/PF-HorizontalLogo-Color-reverse.svg";

export function AppMasthead({
  isSidebarOpen,
  onSidebarToggle,
  logo,
  toolbarItems = ["notifications", "settings"],
  theme,
  onThemeToggle,
  navMode = "sidebar",
  showToolbar = true,
  showHorizontalNav = false,
}: {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
  logo?: string;
  toolbarItems?: string[];
  theme?: "light" | "dark" | "system";
  onThemeToggle?: () => void;
  navMode?: "sidebar" | "masthead";
  showToolbar?: boolean;
  showHorizontalNav?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = useRoutes();
  const [isHydrated, setIsHydrated] = useState(false);

  // Use rAF to defer hydration-sensitive updates so the server/CSR output stays
  // aligned and avoids React 19 double-render warnings in Strict Mode.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsHydrated(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const effectiveToolbarItems = toolbarItems ?? [];
  const shouldRenderToolbar = showToolbar && effectiveToolbarItems.length > 0;

  const shouldRenderHorizontalNav =
    isHydrated && (showHorizontalNav || navMode === "masthead");
  const hasToolbarContent = shouldRenderHorizontalNav || shouldRenderToolbar;

  const mastheadToolbar = hasToolbarContent && (
    <Toolbar
      id="vertical-toolbar"
      className={shouldRenderHorizontalNav ? "pf-m-static" : undefined}
      ouiaId="app-masthead-toolbar"
    >
      <ToolbarContent>
        {shouldRenderHorizontalNav && (
          <ToolbarItem isOverflowContainer>
            <Nav aria-label="Global" variant="horizontal">
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
          </ToolbarItem>
        )}

        {shouldRenderToolbar && (
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
                />
              </ToolbarItem>
            )}
            {effectiveToolbarItems.includes("theme") && (
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
