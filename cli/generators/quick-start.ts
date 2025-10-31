import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { scanRoutes } from "../utils/routes.js";

/**
 * Quick Start Generator
 *
 * REBUILDS the application scaffold, not inserts a nested app.
 *
 * Architecture:
 * - AppShell (in layout.tsx) = The OUTER WRAPPER (masthead + sidebar + Page)
 * - Pages (page.tsx) = Content patterns ONLY (DashboardView, TableView, etc.)
 * - NO DashboardLayout = Prevents nesting
 *
 * Behavior:
 * 1. If AppShell exists → Use it, generate pages with content patterns
 * 2. If AppShell missing → Generate AppShell first, then pages
 * 3. If pages exist → Prompt before overwriting
 */
export async function runQuickStart(projectRoot: string) {
  console.log(chalk.blue.bold("\n🚀 PatternFly Quick Start\n"));

  try {
    const appDir = path.join(projectRoot, "src", "app");
    const layoutPath = path.join(appDir, "layout.tsx");
    const publicDir = path.join(projectRoot, "public");

    // 1. Check current state
    const hasAppShell = await checkAppShell(layoutPath);
    const existingPages = await checkExistingPages(appDir);

    // 2. Handle existing scaffold
    if (hasAppShell && existingPages.length > 0) {
      const inquirer = await import("inquirer");
      const { overwrite } = await inquirer.default.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message:
            "I see you have a configured project. Would you like to rebuild the application? This will overwrite existing pages.",
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(
          chalk.yellow(
            "\nQuick-start cancelled. Your project remains unchanged.\n"
          )
        );
        return;
      }
    }

    // 3. Ensure AppShell exists (THE OUTER WRAPPER - rebuilds if missing)
    if (!hasAppShell) {
      console.log(chalk.cyan("Building application scaffold (AppShell)..."));
      await ensureAppShell(layoutPath, projectRoot);
      console.log(chalk.green("✓ Application scaffold built\n"));
    } else {
      console.log(
        chalk.green("✓ Using existing application scaffold (AppShell)\n")
      );
    }

    // 4. Generate pages with content patterns (NO DashboardLayout!)
    // These render INSIDE AppShell's main content area
    console.log(
      chalk.cyan("Generating pages (content only, no nested layouts)...")
    );
    await fs.mkdir(publicDir, { recursive: true });

    const routes = [
      { path: "/", title: "Home", order: 1, pattern: "DashboardView" },
      {
        path: "/dashboard",
        title: "Dashboard",
        order: 2,
        pattern: "DashboardDemoView",
      },
      {
        path: "/analytics",
        title: "Analytics",
        order: 3,
        pattern: "DashboardView",
      },
      { path: "/users", title: "Users", order: 4, pattern: "TableView" },
      {
        path: "/settings",
        title: "Settings",
        order: 5,
        pattern: "DashboardView",
      },
      { path: "/gallery", title: "Gallery", order: 6, pattern: "CardView" },
    ];

    for (const route of routes) {
      const pageDir = path.join(appDir, route.path === "/" ? "" : route.path);
      await fs.mkdir(pageDir, { recursive: true });

      const pageCode = generatePageCode(route);
      await fs.writeFile(path.join(pageDir, "page.tsx"), pageCode, "utf-8");
      console.log(chalk.green(`  ✓ ${route.path}/page.tsx`));
    }
    console.log(chalk.green("\n✓ All pages created\n"));

    // 5. Create routes.json for navigation
    console.log(chalk.cyan("Creating navigation..."));
    const scannedRoutes = await scanRoutes(appDir);
    const routesData = {
      routes: routes.map((route) => {
        const scanned = scannedRoutes.find((r) => r.path === route.path);
        return {
          path: route.path,
          title: route.title,
          order: route.order,
          ...(scanned || {}),
        };
      }),
      lastSynced: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(publicDir, "routes.json"),
      JSON.stringify(routesData, null, 2),
      "utf-8"
    );
    console.log(
      chalk.green(
        `✓ routes.json created with ${routesData.routes.length} routes\n`
      )
    );

    // Success!
    console.log(chalk.green.bold("✅ Quick Start Complete!\n"));
    console.log(chalk.yellow("Application scaffold rebuilt and ready."));
    console.log(chalk.yellow("Next steps:"));
    console.log(chalk.white("  1. Run: npm run dev"));
    console.log(chalk.white("  2. Visit: http://localhost:3000"));
    console.log(chalk.white("  3. Start building!\n"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red("Error during Quick Start:"), message);
    throw error;
  }
}

/**
 * Check if AppShell exists in layout.tsx
 */
async function checkAppShell(layoutPath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(layoutPath, "utf-8");
    return content.includes("AppShell");
  } catch {
    return false;
  }
}

/**
 * Check if pages already exist
 */
async function checkExistingPages(appDir: string): Promise<string[]> {
  const existingPages: string[] = [];
  const routes = [
    "/",
    "/dashboard",
    "/analytics",
    "/users",
    "/settings",
    "/gallery",
  ];

  for (const route of routes) {
    const pagePath = path.join(
      appDir,
      route === "/" ? "page.tsx" : `${route}/page.tsx`
    );
    try {
      await fs.access(pagePath);
      existingPages.push(route);
    } catch {
      // Page doesn't exist
    }
  }

  return existingPages;
}

/**
 * Generate AppShell in layout.tsx (THE OUTER WRAPPER)
 * This is the application scaffold that wraps everything.
 */
async function ensureAppShell(
  layoutPath: string,
  projectRoot: string
): Promise<void> {
  const uiDir = path.join(projectRoot, "src", "components", "ui");
  await fs.mkdir(uiDir, { recursive: true });

  // Check if layout.tsx exists
  let layoutExists = false;
  try {
    await fs.access(layoutPath);
    layoutExists = true;
  } catch {
    // layout.tsx doesn't exist
  }

  if (!layoutExists) {
    // Create layout.tsx with AppShell (THE OUTER WRAPPER)
    const layoutCode = `import type { Metadata } from "next";
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
`;
    await fs.writeFile(layoutPath, layoutCode, "utf-8");
  } else {
    // Verify existing layout.tsx has AppShell
    const content = await fs.readFile(layoutPath, "utf-8");
    if (!content.includes("AppShell")) {
      throw new Error(
        "layout.tsx exists but AppShell is not configured. " +
          "Quick-start rebuilds the application scaffold - please configure AppShell first."
      );
    }
  }
}

/**
 * Generate page code using content patterns ONLY (NO DashboardLayout!)
 * These render inside AppShell's main content area.
 */
function generatePageCode(route: {
  path: string;
  title: string;
  pattern: string;
}): string {
  if (route.pattern === "TableView") {
    return `"use client";

import { TableView } from "@/components/content-patterns/TableView";

// Mock data for demo
const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  cells: [
    \`User \${i + 1}\`,
    \`user\${i + 1}@example.com\`,
    \`Role \${i % 3 === 0 ? "Admin" : i % 3 === 1 ? "User" : "Guest"}\`,
  ],
}));

export default function ${route.title}() {
  return (
    <TableView columns={["Name", "Email", "Role"]} rows={mockUsers} />
  );
}
`;
  }

  if (route.pattern === "CardView") {
    return `"use client";

import { CardView, type CardItem } from "@/components/content-patterns/CardView";

const demoItems: CardItem[] = [
  { id: "1", title: "Card 1", description: "Card description 1" },
  { id: "2", title: "Card 2", description: "Card description 2" },
  { id: "3", title: "Card 3", description: "Card description 3" },
  { id: "4", title: "Card 4", description: "Card description 4" },
  { id: "5", title: "Card 5", description: "Card description 5" },
];

export default function ${route.title}() {
  return <CardView items={demoItems} />;
}
`;
  }

  if (route.pattern === "DashboardDemoView") {
    return `"use client";

import { DashboardDemoView } from "@/components/content-patterns/DashboardDemoView";

export default function ${route.title}() {
  return <DashboardDemoView />;
}
`;
  }

  // Default: DashboardView
  return `"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
import { Card, CardBody } from "@patternfly/react-core";

export default function ${route.title}() {
  return (
    <DashboardView title="${route.title}">
      <Card>
        <CardBody>Welcome to ${route.title}</CardBody>
      </Card>
    </DashboardView>
  );
}
`;
}
