import fs from "fs/promises";
import path from "path";

/**
 * Check if DefaultLayout exists
 * Returns true if layout is configured, false otherwise
 */
export async function isLayoutConfigured(
  projectRoot: string
): Promise<boolean> {
  try {
    const layoutPath = path.join(
      projectRoot,
      "src",
      "components",
      "layouts",
      "DefaultLayout.tsx"
    );
    await fs.access(layoutPath);
    return true;
  } catch {
    return false;
  }
}
