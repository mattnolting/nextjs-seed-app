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
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    "light"
  );
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => setMounted(true), []);

  // Initialize theme from config/localStorage or prefers-color-scheme
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("theme")) as "light" | "dark" | "system" | null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = (config.theme ??
      saved ??
      (prefersDark ? "dark" : "light")) as "light" | "dark" | "system";
    setThemeMode(initial);
  }, [config.theme]);

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
      mql.addEventListener
        ? mql.addEventListener("change", handler)
        : mql.addListener(handler as any);
      return () => {
        mql.removeEventListener
          ? mql.removeEventListener("change", handler)
          : mql.removeListener(handler as any);
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
