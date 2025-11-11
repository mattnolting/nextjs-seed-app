import inquirer from "inquirer";
import chalk from "chalk";

export interface BootstrapConfig {
  masthead: {
    showToolbar: boolean;
    toolbarItems: string[];
  };
  includeDemoContent: boolean;
}

/**
 * Run bootstrap setup prompts for optional demo content and masthead toolbar
 * configuration.
 */
export async function runBootstrapSetup(): Promise<BootstrapConfig> {
  console.log(chalk.blue.bold("\n🚀 PatternFly Bootstrap Configuration\n"));

  // 1. Sample content toggle
  const { includeDemoContent } = await inquirer.prompt([
    {
      type: "confirm",
      name: "includeDemoContent",
      message: "Generate sample PatternFly demo pages and data?",
      default: false,
    },
  ]);

  // 2. Masthead configuration (toolbar only)
  const { showToolbar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "showToolbar",
      message: "Show toolbar?",
      default: true,
    },
  ]);

  let toolbarItems: string[] = [];
  if (showToolbar) {
    const { items } = await inquirer.prompt([
      {
        type: "input",
        name: "items",
        message: "Toolbar items (comma-separated):",
        default: "notifications,settings,user-menu",
        filter: (input: string) => {
          return input
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        },
      },
    ]);
    toolbarItems = items;
  }

  console.log(chalk.green("\n✓ Configuration complete!\n"));

  return {
    masthead: {
      showToolbar,
      toolbarItems,
    },
    includeDemoContent,
  };
}
