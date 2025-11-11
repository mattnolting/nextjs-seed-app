"use client";

import { useEffect, useState } from "react";
import { AppShell, type AppShellProps } from "./AppShell";

export function ClientAppShell({ children, config }: AppShellProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--pf-t--global--background--color--page--default)",
        }}
      >
        <div
          style={{
            height: "3.5rem",
            borderBottom: "1px solid var(--pf-t--global--border--color--default)",
            background:
              "var(--pf-t--global--background--color--primary--default)",
          }}
          aria-hidden="true"
        />
        <div style={{ flex: 1, display: "flex" }}>
          <div
            style={{
              width: "260px",
              borderRight:
                "1px solid var(--pf-t--global--border--color--default)",
              background:
                "var(--pf-t--global--background--color--secondary--default)",
            }}
            aria-hidden="true"
          />
          <div style={{ flex: 1 }}>{/* SSR placeholder to avoid mismatch */}</div>
        </div>
      </div>
    );
  }

  return <AppShell config={config}>{children}</AppShell>;
}


