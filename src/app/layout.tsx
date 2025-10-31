import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/ui/AppShell";

export const metadata: Metadata = {
  title: "PatternFly Next.js Starter",
  description:
    "A modern Next.js starter application with PatternFly React components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell
          config={{
            masthead: {
              logo: "/PF-HorizontalLogo-Color.svg",
              toolbarItems: ["notifications", "settings", "theme"],
            },
          }}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
