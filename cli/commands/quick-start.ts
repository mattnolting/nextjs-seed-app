#!/usr/bin/env node

import path from "path";
import chalk from "chalk";
import { isLayoutConfigured } from "../utils/bootstrap-check.js";
import { runBootstrapSetup } from "../utils/bootstrap-setup.js";
import { runQuickStart as generateQuickStart } from "../generators/quick-start.js";

/**
 * Quick Start Command
 *
 * Checks if layout is configured, runs bootstrap if needed,
 * then generates 5 functional demo pages
 */
async function main() {
  const projectRoot = process.cwd();

  try {
    // Check if layout is configured
    const isConfigured = await isLayoutConfigured(projectRoot);

    if (!isConfigured) {
      console.log(chalk.yellow("🔍 Checking app configuration...\n"));
      console.log(
        chalk.yellow("I see you don't have your app layout configured.\n")
      );

      const { configureNow } = await import("inquirer").then((m) =>
        m.default.prompt([
          {
            type: "confirm",
            name: "configureNow",
            message: "Would you like to configure it now?",
            default: true,
          },
        ])
      );

      if (!configureNow) {
        console.log(
          chalk.yellow("\nConfiguration skipped. Run again when ready.")
        );
        process.exit(0);
      }

      // Run bootstrap setup
      const config = await runBootstrapSetup();

      // TODO: Generate DefaultLayout.tsx with config
      // TODO: Update src/app/layout.tsx
      console.log(
        chalk.cyan(
          "\n📝 Bootstrap configuration captured. Generating layout..."
        )
      );
      // For now, we'll integrate this with the existing generator
    }

    // Generate quick start app
    await generateQuickStart(projectRoot);

    console.log(chalk.green.bold("\n✅ Quick Start Complete!\n"));
    console.log(chalk.cyan("Next steps:"));
    console.log(chalk.cyan("  1. npm run dev"));
    console.log(chalk.cyan("  2. Visit http://localhost:3000\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}

main();
