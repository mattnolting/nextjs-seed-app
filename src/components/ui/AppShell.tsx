"use client";

import { useEffect, useState } from "react";
import { Page } from "@patternfly/react-core";
import { AppMasthead } from "@/components/ui/AppMasthead";
import { AppSidebar } from "@/components/ui/AppSidebar";

export interface AppShellConfig {
  masthead?: {
    logo?: string;
    toolbarItems?: string[];
    showToolbar?: boolean;
  };
  theme?: "light" | "dark" | "system";
  navMode?: "sidebar" | "masthead";
  sidebar?: {
    enabled?: boolean;
    defaultOpen?: boolean;
  };
  horizontalNav?: {
    enabled?: boolean;
  };
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

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    hasSidebar ? sidebarDefaultOpen : false
  );

  useEffect(() => {
    setIsSidebarOpen(hasSidebar ? sidebarDefaultOpen : false);
  }, [hasSidebar, sidebarDefaultOpen]);

  // Always start with "light" to ensure SSR/client hydration match
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    resolvedConfig.theme ?? "light"
  );
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Initialize theme from config/localStorage or prefers-color-scheme after mount
  // This ensures SSR/client render match on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | "system"
        | null;
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = (resolvedConfig.theme ??
        saved ??
        (prefersDark ? "dark" : "light")) as "light" | "dark" | "system";
      if (initial !== themeMode) {
        setThemeMode(initial);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve system theme and listen for changes when in system mode
  useEffect(() => {
    const mql =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    const compute = () => {
      if (themeMode === "system") {
        const dark = mql ? mql.matches : false;
        setResolvedTheme(dark ? "dark" : "light");
      } else {
        setResolvedTheme(themeMode);
      }
    };
    compute();
    if (mql && themeMode === "system") {
      const handler = () => compute();
      if (mql.addEventListener) {
        mql.addEventListener("change", handler);
      } else if (mql.addListener) {
        mql.addListener(handler);
      }
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", handler);
        } else if (mql.removeListener) {
          mql.removeListener(handler);
        }
      };
    }
  }, [themeMode]);

  // Apply resolved theme to <html> and persist chosen mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      // Remove existing theme classes
      html.classList.remove("pf-v6-theme-light", "pf-v6-theme-dark");
      // Add the correct theme class
      html.classList.add(`pf-v6-theme-${resolvedTheme}`);
      // Also set data attribute for PatternFly
      html.setAttribute("data-pf-theme", resolvedTheme);
      try {
        localStorage.setItem("theme", themeMode);
      } catch {}
    }
  }, [resolvedTheme, themeMode]);

  const onSidebarToggle = () => setIsSidebarOpen((v) => !v);
  const onThemeToggle = () =>
    setThemeMode((t) =>
      t === "light" ? "dark" : t === "dark" ? "system" : "light"
    );

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

  const showHorizontalNav =
    resolvedConfig.horizontalNav?.enabled ?? navMode === "masthead";

  return (
    <Page
      masthead={
        <AppMasthead
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={onSidebarToggle}
          logo={resolvedConfig.masthead?.logo}
          toolbarItems={toolbarItems}
          theme={themeMode}
          onThemeToggle={onThemeToggle}
          navMode={navMode}
          showToolbar={showToolbar}
          showHorizontalNav={showHorizontalNav}
        />
      }
      sidebar={hasSidebar ? <AppSidebar isOpen={isSidebarOpen} /> : undefined}
      isManagedSidebar={hasSidebar}
    >
      {children}
    </Page>
  );
}
