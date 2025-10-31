import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { createInitialManifest, writeManifest } from "../utils/manifest.js";
import { generateDashboardLayout } from "../templates/dashboard-layout.js";
import { scanRoutes } from "../utils/routes.js";
import type { BuildManifest } from "../types/manifest.js";

/**
 * Quick Start Generator
 *
 * Generates a complete app with:
 * - 4 layouts (Dashboard, Gallery, Table, SplitView)
 * - 6 pages (/, dashboard, analytics, users, settings, gallery)
 * - .build.json manifest
 * - Public assets structure
 */
export async function runQuickStart(projectRoot: string) {
  console.log(chalk.blue.bold("\n🚀 PatternFly Quick Start\n"));

  try {
    // 1. Create manifest
    console.log(chalk.cyan("Creating .build.json..."));
    const manifest = createInitialManifest();

    // Add initial routes
    manifest.routes = [
      {
        path: "/",
        layout: "DashboardLayout",
        title: "Home",
        priority: 1,
        slots: {},
      },
      {
        path: "/dashboard",
        layout: "DashboardLayout",
        title: "Dashboard",
        priority: 2,
        slots: {},
      },
      {
        path: "/analytics",
        layout: "DashboardLayout",
        title: "Analytics",
        priority: 3,
        slots: {},
      },
      {
        path: "/users",
        layout: "DashboardLayout",
        title: "Users",
        priority: 4,
        slots: {},
      },
      {
        path: "/settings",
        layout: "DashboardLayout",
        title: "Settings",
        priority: 5,
        slots: {},
      },
      {
        path: "/gallery",
        layout: "DashboardLayout",
        title: "Gallery",
        priority: 6,
        slots: {},
      },
    ];

    await writeManifest(manifest, projectRoot);
    console.log(chalk.green("✓ .build.json created\n"));

    // 2. Create directory structure
    console.log(chalk.cyan("Setting up directory structure..."));
    const appDir = path.join(projectRoot, "src", "app");
    const layoutsDir = path.join(projectRoot, "src", "components", "layouts");
    const publicDir = path.join(projectRoot, "public");

    await fs.mkdir(layoutsDir, { recursive: true });
    await fs.mkdir(publicDir, { recursive: true });
    console.log(chalk.green("✓ Directories created\n"));

    // 3. Generate DashboardLayout
    console.log(chalk.cyan("Generating DashboardLayout..."));
    const layoutCode = generateDashboardLayout(manifest);
    await fs.writeFile(
      path.join(layoutsDir, "DashboardLayout.tsx"),
      layoutCode,
      "utf-8"
    );
    console.log(chalk.green("✓ DashboardLayout.tsx created\n"));

    // 4. Generate pages
    console.log(chalk.cyan("Generating pages..."));
    for (const route of manifest.routes) {
      const pageDir = path.join(appDir, route.path === "/" ? "" : route.path);
      await fs.mkdir(pageDir, { recursive: true });

      // All pages use path alias for layouts
      const layoutImport = "@/components/layouts/DashboardLayout";

      const pageCode = `import { DashboardLayout } from "${layoutImport}";

export default function ${route.title}() {
  return (
    <DashboardLayout title="${route.title}">
      <div>
        <h1>${route.title}</h1>
        <p>Welcome to ${route.title}</p>
      </div>
    </DashboardLayout>
  );
}
`;

      await fs.writeFile(path.join(pageDir, "page.tsx"), pageCode, "utf-8");
      console.log(chalk.green(`  ✓ ${route.path}/page.tsx`));
    }
    console.log(chalk.green("\n✓ All pages created\n"));

    // 5. Scan routes and create routes.json (AFTER pages are created)
    console.log(chalk.cyan("Scanning routes and creating navigation..."));
    const scannedRoutes = await scanRoutes(appDir);

    // Filter out root route and only include routes that were actually created
    const manifestRoutes = manifest.routes.map((r) => r.path);
    const navRoutes = scannedRoutes.filter(
      (route) => route.path !== "/" && manifestRoutes.includes(route.path)
    );

    const routesData = {
      routes: navRoutes,
      generated: new Date().toISOString(),
    };

    // Write routes.json to public directory for client access
    await fs.writeFile(
      path.join(publicDir, "routes.json"),
      JSON.stringify(routesData, null, 2),
      "utf-8"
    );
    console.log(
      chalk.green(`✓ routes.json created with ${navRoutes.length} routes\n`)
    );

    // 6. Create basic logo placeholder
    console.log(chalk.cyan("Setting up public assets..."));
    const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0066CC"/>
  <text x="50" y="55" font-family="Arial" font-size="40" fill="white" text-anchor="middle">PF</text>
</svg>`;

    await fs.writeFile(path.join(publicDir, "logo.svg"), svgLogo, "utf-8");
    console.log(chalk.green("✓ logo.svg created\n"));

    // Success!
    console.log(chalk.green.bold("✅ Quick Start Complete!\n"));
    console.log(chalk.yellow("Next steps:"));
    console.log(chalk.white("  1. Run: npm run dev"));
    console.log(chalk.white("  2. Visit: http://localhost:3000"));
    console.log(chalk.white("  3. Start building!\n"));
  } catch (error) {
    console.error(chalk.red("Error during Quick Start:"), error);
    throw error;
  }
}
