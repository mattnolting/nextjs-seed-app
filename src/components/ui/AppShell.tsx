"use client";

import { useEffect, useState } from "react";
import { Page } from "@patternfly/react-core";
import { AppMasthead } from "@/components/ui/AppMasthead";
import { AppSidebar } from "@/components/ui/AppSidebar";

export interface NavItem {
  path: string;
  title: string;
  group?: string;
}

export interface AppShellConfig {
  masthead?: {
    logo?: string;
    toolbarItems?: string[];
    showToolbar?: boolean;
  };
  theme?: "light" | "dark";
  navMode?: "sidebar" | "masthead";
  sidebar?: {
    enabled?: boolean;
    defaultOpen?: boolean;
  };
  horizontalNav?: {
    enabled?: boolean;
  };
  navItems?: NavItem[];
}

export interface AppShellProps {
  children: React.ReactNode;
  config?: AppShellConfig;
}

const defaultConfig: AppShellConfig = {
  masthead: {
    toolbarItems: ["notifications", "settings", "theme"],
    showToolbar: true,
  },
  sidebar: {
    enabled: true,
    defaultOpen: true,
  },
  horizontalNav: {
    enabled: true,
  },
  navMode: "sidebar",
  navItems: [
    {
      path: "/",
      title: "Home",
    },
  ],
};

export function AppShell({ children, config }: AppShellProps) {
  const resolvedConfig = config ?? defaultConfig;

  const navMode =
    resolvedConfig.navMode ??
    (resolvedConfig.sidebar?.enabled === false ? "masthead" : "sidebar");

  const sidebarEnabled =
    resolvedConfig.sidebar?.enabled ?? navMode === "sidebar";
  const sidebarDefaultOpen = resolvedConfig.sidebar?.defaultOpen ?? true;
  const hasSidebar = sidebarEnabled && navMode === "sidebar";

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    hasSidebar ? sidebarDefaultOpen : false
  );

  const defaultTheme = resolvedConfig.theme ?? "light";
  const [themeMode, setThemeMode] = useState<"light" | "dark">(defaultTheme);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let nextTheme: "light" | "dark" | null = null;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      nextTheme = stored;
    } else if (!resolvedConfig.theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      nextTheme = prefersDark ? "dark" : "light";
    }

    if (!nextTheme || nextTheme === defaultTheme) {
      return;
    }

    const timeout = window.setTimeout(() => setThemeMode(nextTheme!), 0);
    return () => window.clearTimeout(timeout);
  }, [defaultTheme, resolvedConfig.theme]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const html = document.documentElement;
    html.classList.remove("pf-v6-theme-light", "pf-v6-theme-dark");
    html.classList.add(`pf-v6-theme-${themeMode}`);
    html.setAttribute("data-pf-theme", themeMode);
    try {
      localStorage.setItem("theme", themeMode);
    } catch {}
  }, [themeMode]);

  const onSidebarToggle = () => setIsSidebarOpen((v) => !v);
  const onThemeToggle = () =>
    setThemeMode((current) => (current === "light" ? "dark" : "light"));

  const showToolbar = resolvedConfig.masthead?.showToolbar ?? true;
  let toolbarItems =
    showToolbar && resolvedConfig.masthead?.toolbarItems?.length
      ? [...resolvedConfig.masthead.toolbarItems]
      : showToolbar
      ? ["notifications", "settings", "theme"]
      : [];
  if (showToolbar && !toolbarItems.includes("theme")) {
    toolbarItems = [...toolbarItems, "theme"];
  }

  const navItems = resolvedConfig.navItems ?? defaultConfig.navItems ?? [];

  const effectiveSidebarOpen = hasSidebar ? isSidebarOpen : false;

  return (
    <Page
      masthead={
        <AppMasthead
          isSidebarOpen={effectiveSidebarOpen}
          onSidebarToggle={onSidebarToggle}
          logo={resolvedConfig.masthead?.logo}
          toolbarItems={toolbarItems}
          theme={themeMode}
          onThemeToggle={onThemeToggle}
          showToolbar={showToolbar}
        />
      }
      sidebar={
        hasSidebar ? (
          <AppSidebar isOpen={effectiveSidebarOpen} items={navItems} />
        ) : undefined
      }
      isManagedSidebar={hasSidebar}
    >
      {children}
    </Page>
  );
}
