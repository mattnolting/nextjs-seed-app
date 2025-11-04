import fs from "fs/promises";
import path from "path";

/**
 * Check if AppShell is configured in layout.tsx
 * Returns true if layout is configured, false otherwise
 */
export async function isLayoutConfigured(
  projectRoot: string
): Promise<boolean> {
  try {
    const layoutPath = path.join(projectRoot, "src", "app", "layout.tsx");
    const content = await fs.readFile(layoutPath, "utf-8");
    // Check if AppShell or AppWrapper is present (either is valid)
    return content.includes("AppShell") || content.includes("AppWrapper");
  } catch {
    return false;
  }
}
