import fs from "fs/promises";
import path from "path";

interface Route {
  path: string;
  title: string;
  order?: number;
  priority?: number;
  hidden?: boolean;
  icon?: string;
  group?: string;
  description?: string;
}

/**
 * Scan filesystem for Next.js routes
 * Looks for page.tsx files in app directory
 */
export async function scanRoutes(appDir: string): Promise<Route[]> {
  try {
    const routes: Route[] = [];
    await scanDirectory(appDir, appDir, routes);

    // Preserve discovery order; final nav ordering is driven by routes.json
    return routes;
  } catch (error) {
    console.error("Error scanning routes:", error);
    return [];
  }
}

/**
 * Recursive directory scanner
 */
async function scanDirectory(
  baseDir: string,
  currentDir: string,
  routes: Route[]
): Promise<void> {
  try {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      // Skip private folders (start with _) - components/layouts is outside app/
      if (entry.name.startsWith("_")) {
        continue;
      }

      // Skip other non-route directories
      if (entry.isDirectory() && entry.name.startsWith("_")) {
        continue;
      }

      if (entry.isFile() && entry.name === "page.tsx") {
        const relativePath = path.relative(baseDir, currentDir);
        const routePath = relativePath === "." ? "/" : `/${relativePath}`;

        // Generate title from path
        const title = generateTitle(routePath);

        routes.push({
          path: routePath,
          title,
        });
      } else if (entry.isDirectory()) {
        await scanDirectory(baseDir, fullPath, routes);
      }
    }
  } catch (error) {
    // Silently ignore directories we can't read
    return;
  }
}

/**
 * Generate readable title from route path
 */
function generateTitle(routePath: string): string {
  if (routePath === "/") {
    return "Home";
  }

  // Remove leading slash and convert to title case
  const segments = routePath.split("/").filter(Boolean);
  return segments
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

/**
 * [STUB] Future: Extract metadata from page files
 * Could read frontmatter or special comments for:
 * - priority
 * - icon
 * - hidden flag
 * - etc.
 */
function extractMetadata(filePath: string): Partial<Route> {
  // TODO: Implement frontmatter extraction
  return {};
}
