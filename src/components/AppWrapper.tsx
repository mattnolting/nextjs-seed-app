"use client";

import { ClientAppShell } from "@/components/ui/ClientAppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ClientAppShell
        config={{
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
            enabled: true,
          },
        }}
      >
        {children}
      </ClientAppShell>
    </ErrorBoundary>
  );
}
