import type { Metadata } from "next";
import { AppWrapper } from "@/components/AppWrapper";
import "./globals.css";
import "@patternfly/patternfly/patternfly-base.css";
import "@patternfly/patternfly/patternfly-charts.css";

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
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
