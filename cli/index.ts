#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("patternfly-cli")
  .description("CLI for generating PatternFly Next.js components and layouts")
  .version("1.0.0");

// Generate subcommand
program
  .command("generate")
  .alias("g")
  .description("Generate a new component, layout, or page")
  .argument("[target]", "Target to generate (layout, component, page)")
  .argument("[name]", "Name or path for the target")
  .option("-v, --verbose", "Walk through component props interactively")
  .option(
    "-t, --type <type>",
    "Content layout type (dashboard, gallery, table)"
  )
  .action(async (target, name, options) => {
    if (!target) {
      // Interactive mode - show options
      console.log("Generate options:");
      console.log("  npm run generate layout");
      console.log("  npm run generate component <name>");
      console.log("  npm run generate page <path>");
      process.exit(0);
    }

    switch (target) {
      case "layout":
        const layoutModule = await import("./commands/generate/layout.js");
        await layoutModule.generateLayoutCommand({ name });
        break;
      case "component":
        if (!name) {
          console.error("Component name is required");
          process.exit(1);
        }
        const componentModule = await import(
          "./commands/generate/component.js"
        );
        await componentModule.generateComponentCommand({
          name,
          verbose: options.verbose,
        });
        break;
      case "page":
        if (!name) {
          console.error("Page path is required");
          process.exit(1);
        }
        const pageModule = await import("./commands/generate/page.js");
        await pageModule.generatePageCommand({
          path: name,
          type: options.type,
        });
        break;
      default:
        console.error(`Unknown target: ${target}`);
        console.log("Available targets: layout, component, page");
        process.exit(1);
    }
  });

// Sync subcommand
program
  .command("sync")
  .description("Sync routes from filesystem")
  .argument("[target]", "Target to sync (routes)")
  .action(async (target) => {
    if (!target || target === "routes") {
      const routesModule = await import("./commands/sync/routes.js");
      await routesModule.syncRoutesCommand();
    } else {
      console.error(`Unknown sync target: ${target}`);
      console.log("Available targets: routes");
      process.exit(1);
    }
  });

// Config subcommand
program
  .command("config")
  .description("Configure app layout or navigation")
  .argument("[target]", "Target to configure (layout, navigation)")
  .action(async (target) => {
    if (!target) {
      console.log("Config options:");
      console.log("  npm run config layout");
      console.log("  npm run config navigation");
      process.exit(0);
    }

    switch (target) {
      case "layout":
        const layoutConfigModule = await import("./commands/config/layout.js");
        await layoutConfigModule.configLayoutCommand();
        break;
      case "navigation":
        const navConfigModule = await import("./commands/config/navigation.js");
        await navConfigModule.configNavigationCommand();
        break;
      default:
        console.error(`Unknown config target: ${target}`);
        console.log("Available targets: layout, navigation");
        process.exit(1);
    }
  });

program.parse();
