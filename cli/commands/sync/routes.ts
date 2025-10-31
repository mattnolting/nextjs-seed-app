import chalk from "chalk";
import path from "path";
import fs from "fs/promises";
import { scanRoutes } from "../../utils/routes.js";

export async function syncRoutesCommand() {
  console.log(chalk.blue.bold("\n🔄 Syncing Routes\n"));

  try {
    const projectRoot = process.cwd();
    const appDir = path.join(projectRoot, "src", "app");

    // Scan filesystem for routes
    console.log(chalk.cyan("Scanning filesystem for routes..."));
    const discoveredRoutes = await scanRoutes(appDir);

    // Read existing routes.json if it exists
    const routesJsonPath = path.join(projectRoot, "public", "routes.json");
    let existingRoutes: any[] = [];
    try {
      const existing = await fs.readFile(routesJsonPath, "utf-8");
      const parsed = JSON.parse(existing);
      existingRoutes = Array.isArray(parsed?.routes) ? parsed.routes : [];
    } catch {
      // File doesn't exist or invalid JSON; start fresh
    }

    // Preserve existing order by default; append new in discovery order
    const discoveredByPath = new Map(discoveredRoutes.map((r) => [r.path, r]));

    // Keep only routes that still exist, preserving order
    const keptExisting = existingRoutes
      .filter((r) => discoveredByPath.has(r.path))
      .map((existing) => {
        const discovered = discoveredByPath.get(existing.path)!;
        // Existing metadata takes precedence; fill missing fields from discovery
        return { ...discovered, ...existing };
      });

    // Append new discovered routes not present in existing
    const existingPaths = new Set(existingRoutes.map((r) => r.path));
    const newOnes = discoveredRoutes
      .filter((r) => !existingPaths.has(r.path))
      .map((r) => ({ ...r }));

    const mergedRoutes = [...keptExisting, ...newOnes];

    // Seed order for routes missing explicit order/priority using current appearance
    mergedRoutes.forEach((r, idx) => {
      const hasExplicit =
        typeof r.order === "number" || typeof r.priority === "number";
      if (!hasExplicit) {
        r.order = idx + 1;
      }
    });
    const removedCount = existingRoutes.length - keptExisting.length;
    const addedCount = newOnes.length;

    // Ensure navigation directory exists
    const navDir = path.join(projectRoot, "src", "lib", "navigation");
    await fs.mkdir(navDir, { recursive: true });

    // Write routes.json
    const routesJson = {
      routes: mergedRoutes,
      lastSynced: new Date().toISOString(),
    };

    await fs.writeFile(
      routesJsonPath,
      JSON.stringify(routesJson, null, 2),
      "utf-8"
    );

    console.log(
      chalk.green(
        `\n✅ Synced ${mergedRoutes.length} routes -> public/routes.json` +
          (addedCount ? chalk.gray(`  (+${addedCount} added)`) : "") +
          (removedCount ? chalk.gray(`  (-${removedCount} removed)`) : "") +
          "\n"
      )
    );
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}
