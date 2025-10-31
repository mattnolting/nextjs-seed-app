import type { BuildManifest } from "../types/manifest.js";

interface RouteConfig {
  path: string;
  layout: string;
  title: string;
}

/**
 * Generate a page component
 */
export function generatePage(config: RouteConfig): string {
  const { layout, title } = config;
  const pascalCase = (str: string) =>
    str
      .split("/")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join("");

  const componentName = pascalCase(config.path) || "Page";

  return `import { ${layout} } from "@/components/layouts/${layout}";

export default function ${componentName}() {
  return (
    <${layout} title="${title}">
      <div>
        <h1>${title}</h1>
        <p>Welcome to ${title}</p>
      </div>
    </${layout}>
  );
}
`;
}
