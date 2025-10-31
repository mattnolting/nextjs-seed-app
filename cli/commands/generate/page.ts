import chalk from "chalk";
import path from "path";
import fs from "fs/promises";

export async function generatePageCommand(options: {
  path: string;
  type?: string;
}) {
  console.log(chalk.blue.bold("\n📄 Generating Page\n"));

  const projectRoot = process.cwd();
  const pagePath = options.path.startsWith("/")
    ? options.path.slice(1)
    : options.path;
  const pageDir = path.join(projectRoot, "src", "app", pagePath);

  console.log(chalk.cyan(`Path: /${pagePath}`));
  if (options.type) {
    console.log(chalk.cyan(`Type: ${options.type}\n`));
  }

  try {
    // Create directory
    await fs.mkdir(pageDir, { recursive: true });

    // Generate page.tsx
    const pageCode = generatePageCode(pagePath, options.type);
    await fs.writeFile(path.join(pageDir, "page.tsx"), pageCode, "utf-8");

    console.log(chalk.green(`\n✅ Page generated at /${pagePath}\n`));
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}

function generatePageCode(routePath: string, contentType?: string): string {
  const routeSegments = routePath.split("/");
  const componentName =
    routeSegments[routeSegments.length - 1].charAt(0).toUpperCase() +
    routeSegments[routeSegments.length - 1].slice(1);

  return `import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function ${componentName}() {
  return (
    <DashboardLayout title="${componentName}">
      <div>
        <h1>${componentName}</h1>
        <p>Welcome to ${componentName}</p>
      </div>
    </DashboardLayout>
  );
}
`;
}
