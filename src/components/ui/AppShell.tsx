"use client";

import { useEffect, useState } from "react";
import { Page } from "@patternfly/react-core";
import { AppMasthead } from "@/components/ui/AppMasthead";
import { AppSidebar } from "@/components/ui/AppSidebar";

export function AppShell({
  children,
  config = {
    masthead: {
      toolbarItems: ["notifications", "settings", "theme"],
    },
    navMode: "sidebar",
  },
}: {
  children: React.ReactNode;
  config?: {
    masthead?: { logo?: string; toolbarItems?: string[] };
    theme?: "light" | "dark" | "system";
    navMode?: "sidebar" | "masthead";
  };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Always start with "light" to ensure SSR/client hydration match
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    config.theme ?? "light"
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
      const initial = (config.theme ??
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

  const navMode = config.navMode ?? "sidebar";
  const hasSidebar = navMode === "sidebar";

  return (
    <Page
      masthead={
        <AppMasthead
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={onSidebarToggle}
          logo={config.masthead?.logo}
          toolbarItems={config.masthead?.toolbarItems}
          theme={themeMode}
          onThemeToggle={onThemeToggle}
          navMode={navMode}
        />
      }
      sidebar={hasSidebar ? <AppSidebar isOpen={isSidebarOpen} /> : undefined}
      isManagedSidebar={hasSidebar}
    >
      {children}
    </Page>
  );
}
