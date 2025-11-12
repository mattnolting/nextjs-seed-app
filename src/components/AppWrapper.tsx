"use client";

import routes from "@/app/routes.json";
import { AppShell } from "@/components/ui/AppShell";
import type { NavItem } from "@/components/ui/AppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const navItems = routes as NavItem[];

  return (
    <ErrorBoundary>
      <AppShell
        config={{
          navItems,
          masthead: {
            logo: "/PF-HorizontalLogo-Color.svg",
            showToolbar: true,
            toolbarItems: ["notifications", "settings", "user-menu"],
          },
          navMode: "sidebar",
          sidebar: {
            enabled: true,
            defaultOpen: true,
          },
          horizontalNav: {
            enabled: false,
          },
        }}
      >
        {children}
      </AppShell>
    </ErrorBoundary>
  );
}
