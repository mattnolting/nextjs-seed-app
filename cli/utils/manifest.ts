import fs from "fs/promises";
import path from "path";
import type { BuildManifest } from "../types/manifest.js";

const MANIFEST_FILENAME = ".build.json";

/**
 * Find manifest file starting from current directory and going up
 */
async function findManifest(dir: string): Promise<string | null> {
  const manifestPath = path.join(dir, MANIFEST_FILENAME);

  try {
    await fs.access(manifestPath);
    return manifestPath;
  } catch {
    const parentDir = path.dirname(dir);
    // Stop at root to avoid infinite loop
    if (parentDir === dir) {
      return null;
    }
    return findManifest(parentDir);
  }
}

/**
 * Read manifest from file system
 */
export async function readManifest(
  projectRoot?: string
): Promise<BuildManifest | null> {
  const root = projectRoot || process.cwd();
  const manifestPath = await findManifest(root);

  if (!manifestPath) {
    return null;
  }

  try {
    const content = await fs.readFile(manifestPath, "utf-8");
    return JSON.parse(content) as BuildManifest;
  } catch (error) {
    console.error("Error reading manifest:", error);
    return null;
  }
}

/**
 * Write manifest to file system
 */
export async function writeManifest(
  manifest: BuildManifest,
  projectRoot?: string
): Promise<boolean> {
  const root = projectRoot || process.cwd();
  const manifestPath = path.join(root, MANIFEST_FILENAME);

  try {
    // Update lastModified
    manifest.lastModified = new Date().toISOString();

    const content = JSON.stringify(manifest, null, 2);
    await fs.writeFile(manifestPath, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing manifest:", error);
    return false;
  }
}

/**
 * Get path to manifest file
 */
export async function getManifestPath(
  projectRoot?: string
): Promise<string | null> {
  const root = projectRoot || process.cwd();
  return findManifest(root);
}

/**
 * Create initial manifest for Quick Start
 */
export function createInitialManifest(): BuildManifest {
  return {
    version: "1.0.0",
    lastModified: new Date().toISOString(),
    scaffold: {
      path: "src/app",
      layouts: {
        masthead: {
          enabled: true,
          component: undefined,
        },
        sidebar: {
          enabled: true,
          component: undefined,
        },
        main: {
          enabled: true,
        },
      },
    },
    layouts: [],
    components: [],
    routes: [],
  };
}

/**
 * Validate manifest structure
 */
export function validateManifest(manifest: any): boolean {
  if (!manifest || typeof manifest !== "object") {
    return false;
  }

  const required = [
    "version",
    "lastModified",
    "mode",
    "scaffold",
    "layouts",
    "routes",
  ];
  return required.every((field) => field in manifest);
}
