import inquirer from "inquirer";
import chalk from "chalk";
import * as fs from "fs/promises";
import path from "path";
import { generateLayoutCode } from "../generators/layout-generator.js";

const LAYOUT_TYPES = [
  {
    name: "Dashboard (Header + Sidebar + Content)",
    value: "dashboard",
    description: "A dashboard layout with header, sidebar navigation, and main content area",
  },
  {
    name: "Gallery (Grid of Cards)",
    value: "gallery",
    description: "A responsive gallery layout for displaying cards in a grid",
  },
  {
    name: "Table (Data Table with Search/Pagination)",
    value: "table",
    description: "A data table layout with optional search and pagination",
  },
  {
    name: "Split View (Two-Panel Layout)",
    value: "split-view",
    description: "A split-view layout with two resizable panels",
  },
];

interface LayoutAnswers {
  layoutType: string;
  componentName: string;
  includeExample: boolean;
  generatePage: boolean;
  routePath?: string;
}

export async function generateLayout(options: any) {
  try {
    // Load the template for the selected layout type
    const answers: LayoutAnswers = await inquirer.prompt([
      {
        type: "list",
        name: "layoutType",
        message: "Select a layout type:",
        choices: LAYOUT_TYPES.map((type) => ({
          name: `${type.name}\n${chalk.gray(`  ${type.description}`)}`,
          value: type.value,
        })),
      },
      {
        type: "input",
        name: "componentName",
        message: "Component name:",
        default: (answers: any) => {
          const type = answers.layoutType || "";
          return type.charAt(0).toUpperCase() + type.slice(1).replace(/-./g, (x: string) => x[1].toUpperCase()) + "Layout";
        },
        validate: (input: string) => {
          if (!input.trim()) {
            return "Component name cannot be empty";
          }
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return "Component name must be PascalCase";
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "includeExample",
        message: "Include example content?",
        default: true,
      },
      {
        type: "confirm",
        name: "generatePage",
        message: "Generate route page?",
        default: false,
      },
      {
        type: "input",
        name: "routePath",
        message: "Route path:",
        default: (answers: any) => {
          const type = answers.layoutType;
          return `/${type.replace(/-/g, "/")}`;
        },
        when: (answers: any) => answers.generatePage,
        validate: (input: string) => {
          if (!input.startsWith("/")) {
            return "Route path must start with /";
          }
          return true;
        },
      },
    ]);

    // Generate the component code
    const componentCode = await generateLayoutCode(
      answers.layoutType,
      answers.componentName,
      answers.includeExample
    );

    // Determine file paths (from project root, not cli directory)
    const projectRoot = path.resolve(process.cwd(), "..");
    const layoutsDir = path.join(projectRoot, "src", "app", "layouts");
    await fs.mkdir(layoutsDir, { recursive: true });
    
    const componentFilePath = path.join(layoutsDir, `${answers.componentName}.tsx`);

    // Check if file exists
    try {
      await fs.access(componentFilePath);
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: chalk.yellow(`File ${componentFilePath} already exists. Overwrite?`),
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.red("✗ Generation cancelled"));
        return;
      }
    } catch {
      // File doesn't exist, proceed
    }

    // Write component file
    await fs.writeFile(componentFilePath, componentCode);
    console.log(chalk.green(`✓ Generated: ${componentFilePath}`));

    // Generate page if requested
    if (answers.generatePage && answers.routePath) {
      const pageCode = generatePageCode(answers.componentName, answers.layoutType, answers.includeExample);
      const appDir = path.join(projectRoot, "src", "app", answers.routePath);
      await fs.mkdir(appDir, { recursive: true });
      
      const pageFilePath = path.join(appDir, "page.tsx");
      await fs.writeFile(pageFilePath, pageCode);
      console.log(chalk.green(`✓ Generated: ${pageFilePath}`));
    }

    console.log(chalk.green.bold("\n✓ All files created successfully!\n"));
    
    if (answers.generatePage) {
      console.log("Next steps:");
      console.log(`  1. Run: ${chalk.cyan("npm run dev")}`);
      console.log(`  2. Visit: ${chalk.cyan(`http://localhost:3000${answers.routePath}`)}`);
    }
  } catch (error: any) {
    console.error(chalk.red(`✗ Error: ${error.message}`));
    process.exit(1);
  }
}

function generatePageCode(componentName: string, layoutType: string, includeExample: boolean): string {
  const exampleContent = includeExample ? getExampleContent(layoutType) : `<p>Your content here</p>`;

  return `import { ${componentName} } from "../layouts/${componentName}";

export default function Page() {
  return (
    <${componentName}>
      ${exampleContent}
    </${componentName}>
  );
}
`;
}

function getExampleContent(layoutType: string): string {
  switch (layoutType) {
    case "dashboard":
      return `<div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
      </div>`;
    case "gallery":
      return `<>Gallery content</>`;
    case "table":
      return `<>Table content</>`;
    case "split-view":
      return `<>Split view content</>`;
    default:
      return `<p>Example content</p>`;
  }
}

