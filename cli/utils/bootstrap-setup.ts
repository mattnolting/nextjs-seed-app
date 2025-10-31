import inquirer from "inquirer";
import chalk from "chalk";

export interface BootstrapConfig {
  sidebar: {
    enabled: boolean;
    type: "standard" | "grouped" | "expandable";
    defaultOpen: boolean;
  };
  horizontalNav: {
    enabled: boolean;
  };
  masthead: {
    logo: string;
    showToolbar: boolean;
    toolbarItems: string[];
  };
}

/**
 * Run bootstrap setup prompts
 * Asks user about sidebar, horizontal nav, and masthead configuration
 */
export async function runBootstrapSetup(): Promise<BootstrapConfig> {
  console.log(chalk.blue.bold("\n🚀 PatternFly Bootstrap Configuration\n"));

  // 1. Sidebar configuration
  const { needsSidebar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "needsSidebar",
      message: "Does your app need a sidebar?",
      default: true,
    },
  ]);

  let sidebarType: "standard" | "grouped" | "expandable" = "standard";
  let sidebarDefaultOpen = true;

  if (needsSidebar) {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Sidebar Navigation type?",
        choices: [
          { name: "standard (default, v1)", value: "standard" },
          {
            name: "grouped (v2 - coming soon)",
            value: "grouped",
            disabled: true,
          },
          {
            name: "expandable (v2 - coming soon)",
            value: "expandable",
            disabled: true,
          },
        ],
        default: "standard",
      },
    ]);
    sidebarType = type;

    const { defaultOpen } = await inquirer.prompt([
      {
        type: "confirm",
        name: "defaultOpen",
        message: "Default sidebar open?",
        default: true,
      },
    ]);
    sidebarDefaultOpen = defaultOpen;
  }

  // 2. Horizontal navigation
  const { needsHorizontalNav } = await inquirer.prompt([
    {
      type: "confirm",
      name: "needsHorizontalNav",
      message: "Do you need horizontal navigation in page masthead?",
      default: false,
    },
  ]);

  // 3. Masthead configuration
  const { logoPath } = await inquirer.prompt([
    {
      type: "input",
      name: "logoPath",
      message: "Logo path:",
      default: "/logo.svg",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Logo path cannot be empty";
        }
        return true;
      },
    },
  ]);

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
    sidebar: {
      enabled: needsSidebar,
      type: sidebarType,
      defaultOpen: sidebarDefaultOpen,
    },
    horizontalNav: {
      enabled: needsHorizontalNav,
    },
    masthead: {
      logo: logoPath,
      showToolbar,
      toolbarItems,
    },
  };
}
