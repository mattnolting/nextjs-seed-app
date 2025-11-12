import type { Metadata } from "next";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
