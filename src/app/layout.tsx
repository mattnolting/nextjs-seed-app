import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PatternFly Next.js Starter",
  description: "A modern Next.js starter application with PatternFly React components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
