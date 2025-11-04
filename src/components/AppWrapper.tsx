"use client";

import { AppShell } from "@/components/ui/AppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AppShell
        config={{
          masthead: {
            logo: "/PF-HorizontalLogo-Color.svg",
            toolbarItems: ["notifications","settings","user-menu"],
          },
          navMode: "sidebar",
        }}
      >
        {children}
      </AppShell>
    </ErrorBoundary>
  );
}
