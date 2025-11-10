import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { scanRoutes } from "../utils/routes.js";

import type { BootstrapConfig } from "../utils/bootstrap-setup.js";

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
 * 4. If config provided → Use it to generate AppShell with user preferences
 */
export async function runQuickStart(
  projectRoot: string,
  config?: BootstrapConfig | null
) {
  console.log(chalk.blue.bold("\n🚀 PatternFly Quick Start\n"));

  try {
    const appDir = path.join(projectRoot, "src", "app");
    const layoutPath = path.join(appDir, "layout.tsx");
    const publicDir = path.join(projectRoot, "public");

    // 1. Check current state
    const hasAppShell = await checkAppShell(layoutPath);
    const existingPages = await checkExistingPages(appDir);
    let shouldRegeneratePages = true;

    // 2. Handle existing scaffold
    if (hasAppShell && existingPages.length > 0) {
      try {
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
              "\nKeeping existing pages. Quick-start will only refresh the AppShell configuration.\n"
            )
          );
          shouldRegeneratePages = false;
        }
      } catch (error) {
        // Handle user cancellation (Ctrl+C)
        if (
          error &&
          typeof error === "object" &&
          "name" in error &&
          (error.name === "ExitPromptError" ||
            error.name === "SIGINT" ||
            String(error).includes("SIGINT"))
        ) {
          console.log(chalk.yellow("\n\nOperation cancelled by user."));
          return;
        }
        throw error;
      }
    }

    // 3. Ensure AppShell exists (THE OUTER WRAPPER - rebuilds if missing or config provided)
    if (!hasAppShell || config) {
      console.log(chalk.cyan("Building application scaffold (AppShell)..."));
      await ensureAppShell(layoutPath, projectRoot, config);
      console.log(chalk.green("✓ Application scaffold built\n"));
    } else {
      console.log(
        chalk.green("✓ Using existing application scaffold (AppShell)\n")
      );
    }

    // 4. Generate pages with content patterns (NO DashboardLayout!)
    if (shouldRegeneratePages) {
      // These render INSIDE AppShell's main content area
      console.log(
        chalk.cyan("Generating pages (content only, no nested layouts)...")
      );
      await fs.mkdir(publicDir, { recursive: true });

      const routes = [
        { path: "/", title: "Home", order: 1, pattern: "DashboardView" },
        {
          path: "/analytics",
          title: "Analytics",
          order: 2,
          pattern: "PrimaryDetailView",
        },
        { path: "/users", title: "Users", order: 3, pattern: "TableView" },
        {
          path: "/settings",
          title: "Settings",
          order: 4,
          pattern: "FormView",
        },
        { path: "/gallery", title: "Gallery", order: 5, pattern: "CardView" },
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
    } else {
      console.log(
        chalk.yellow(
          "Skipped page regeneration and routes.json update (existing content preserved).\n"
        )
      );
    }

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
 * Check if AppShell or AppWrapper exists in layout.tsx
 */
async function checkAppShell(layoutPath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(layoutPath, "utf-8");
    return content.includes("AppShell") || content.includes("AppWrapper");
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
  projectRoot: string,
  config?: BootstrapConfig | null
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

  // Determine nav mode based on config
  // Default: sidebar enabled, horizontal nav disabled
  const sidebarEnabled = config?.sidebar?.enabled ?? true;
  const sidebarDefaultOpen = config?.sidebar?.defaultOpen ?? true;
  const horizontalNavEnabled = config?.horizontalNav?.enabled ?? false;
  const navMode = sidebarEnabled ? "sidebar" : "masthead";

  // Build toolbar items from config
  const showToolbar = config?.masthead?.showToolbar ?? true;
  const toolbarItems =
    showToolbar && config?.masthead?.toolbarItems?.length
      ? config.masthead.toolbarItems
      : showToolbar
      ? ["notifications", "settings", "theme"]
      : [];

  // Use config logo or default
  const logoPath = config?.masthead?.logo || "/PF-HorizontalLogo-Color.svg";

  if (!layoutExists || config) {
    // Create or regenerate layout.tsx with AppShell (THE OUTER WRAPPER)
    const layoutCode = `import type { Metadata } from "next";
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
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
`;
    await fs.writeFile(layoutPath, layoutCode, "utf-8");

    // Update AppWrapper with config
    const appWrapperPath = path.join(
      projectRoot,
      "src",
      "components",
      "AppWrapper.tsx"
    );
    const appWrapperDir = path.dirname(appWrapperPath);
    await fs.mkdir(appWrapperDir, { recursive: true });

    const appWrapperCode = `"use client";

import { AppShell } from "@/components/ui/AppShell";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AppShell
        config={{
          masthead: {
            logo: "${logoPath}",
            showToolbar: ${showToolbar ? "true" : "false"},
            toolbarItems: ${JSON.stringify(toolbarItems)},
          },
          navMode: "${navMode}",
          sidebar: {
            enabled: ${sidebarEnabled ? "true" : "false"},
            defaultOpen: ${sidebarDefaultOpen ? "true" : "false"},
          },
          horizontalNav: {
            enabled: ${horizontalNavEnabled ? "true" : "false"},
          },
        }}
      >
        {children}
      </AppShell>
    </ErrorBoundary>
  );
}
`;
    await fs.writeFile(appWrapperPath, appWrapperCode, "utf-8");
    console.log(chalk.green("✓ AppShell configured with your settings"));
  } else {
    // Verify existing layout.tsx has AppShell or AppWrapper
    const content = await fs.readFile(layoutPath, "utf-8");
    if (!content.includes("AppShell") && !content.includes("AppWrapper")) {
      throw new Error(
        "layout.tsx exists but AppShell/AppWrapper is not configured. " +
          "Quick-start rebuilds the application scaffold - please configure AppShell or AppWrapper first."
      );
    }
    // If AppWrapper exists, that's fine - we don't need to regenerate
    console.log(chalk.green("✓ AppShell/AppWrapper already configured"));
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
import { useAppData } from "@/lib/data/useAppData";

export default function ${route.title}() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useTableView = true;

  if (loading) {
    return <TableView columns={[]} rows={[]} title="${route.title}" />;
  }

  if (error) {
    return (
      <TableView
        columns={[]}
        rows={[]}
        title="${route.title}"
      />
    );
  }

  if (useTableView && data?.tableView) {
    return (
      <TableView
        columns={data.tableView.columns || []}
        rows={data.tableView.rows || []}
        title="${route.title}"
      />
    );
  }

  return (
    <TableView columns={[]} rows={[]} title="${route.title}" />
  );
}
`;
  }

  if (route.pattern === "CardView") {
    return `"use client";

import { CardView } from "@/components/content-patterns/CardView";
import { useAppData } from "@/lib/data/useAppData";

export default function ${route.title}() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useCardView = true;

  if (loading) {
    return <CardView items={[]} title="${route.title}" showEmptyState={false} />;
  }

  if (error) {
    return (
      <CardView
        items={[]}
        title="${route.title}"
        description={\`Error loading data: \${error.message}\`}
        showEmptyState={false}
      />
    );
  }

  if (useCardView && data?.cardView) {
    return (
      <CardView
        items={data.cardView.items || []}
        title="${route.title}"
        description="Browse available projects and items"
        filterCategories={data.cardView.filters?.categories}
      />
    );
  }

  return (
    <CardView
      items={[]}
      title="${route.title}"
      description="No data available"
      showEmptyState={false}
    />
  );
}
`;
  }

  if (route.pattern === "DashboardView") {
    return `"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
export default function ${route.title}() {
  return <DashboardView title="${route.title}" />;
}
`;
  }

  if (route.pattern === "PrimaryDetailView") {
    return `"use client";

import { PrimaryDetailView } from "@/components/content-patterns/PrimaryDetailView";
import {
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from "@patternfly/react-core";
import { useAppData } from "@/lib/data/useAppData";

export default function ${route.title}() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const usePrimaryDetailView = true;

  if (loading) {
    return (
      <PrimaryDetailView
        masterItems={[]}
        renderDetail={() => <div>Loading...</div>}
        title="${route.title}"
      />
    );
  }

  if (error) {
    return (
      <PrimaryDetailView
        masterItems={[]}
        renderDetail={() => <div>Error loading data: {error.message}</div>}
        title="${route.title}"
      />
    );
  }

  if (usePrimaryDetailView && data?.primaryDetail) {
    return (
      <PrimaryDetailView
        masterItems={data.primaryDetail.primaryItems || []}
        renderDetail={(item) => {
          return (
            <DescriptionList>
              <DescriptionListGroup>
                <DescriptionListTerm>Title</DescriptionListTerm>
                <DescriptionListDescription>{item.title}</DescriptionListDescription>
              </DescriptionListGroup>
              {item.description && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Description</DescriptionListTerm>
                  <DescriptionListDescription>
                    {item.description}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {item.meta &&
                Object.entries(item.meta).map(([key, value]) => (
                  <DescriptionListGroup key={key}>
                    <DescriptionListTerm>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {String(value)}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
            </DescriptionList>
          );
        }}
        title="${route.title}"
      />
    );
  }

  return (
    <PrimaryDetailView
      masterItems={[]}
      renderDetail={() => <div>No data available</div>}
      title="${route.title}"
    />
  );
}
`;
  }

  if (route.pattern === "FormView") {
    return `"use client";

import { FormView } from "@/components/content-patterns/FormView";
import { useAppData } from "@/lib/data/useAppData";

export default function ${route.title}() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useFormView = true;

  if (loading) {
    return (
      <FormView
        formSchema={[]}
        initialData={{}}
        onSubmit={() => {}}
        title="${route.title}"
        description="Loading..."
      />
    );
  }

  if (error) {
    return (
      <FormView
        formSchema={[]}
        initialData={{}}
        onSubmit={() => {}}
        title="${route.title}"
        description={\`Error loading data: \${error.message}\`}
      />
    );
  }

  if (useFormView && data?.formView) {
    const handleSubmit = (formData: Record<string, any>) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userSettings", JSON.stringify(formData));
      }
    };

    return (
      <FormView
        formSchema={data.formView.fields}
        initialData={{}}
        onSubmit={handleSubmit}
        title="${route.title}"
        description="Manage your settings"
      />
    );
  }

  return (
    <FormView
      formSchema={[]}
      initialData={{}}
      onSubmit={() => {}}
      title="${route.title}"
      description="No data available"
    />
  );
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
