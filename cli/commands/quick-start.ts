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
    let config: Awaited<ReturnType<typeof runBootstrapSetup>> | null = null;

    // Always offer configuration walkthrough
    if (!isConfigured) {
      console.log(chalk.yellow("🔍 Checking app configuration...\n"));
      console.log(
        chalk.yellow("I see you don't have your app layout configured.\n")
      );
    } else {
      console.log(chalk.cyan("🔍 App layout detected.\n"));
      console.log(
        chalk.yellow("You can reconfigure your app layout or continue with current settings.\n")
      );
    }

    try {
      const inquirer = await import("inquirer");
      const { configureNow } = await inquirer.default.prompt([
        {
          type: "confirm",
          name: "configureNow",
          message: isConfigured
            ? "Would you like to reconfigure your app layout?"
            : "Would you like to configure it now?",
          default: !isConfigured, // Default to true if not configured, false if already configured
        },
      ]);

      if (configureNow) {
        // Run bootstrap setup
        config = await runBootstrapSetup();
        console.log(
          chalk.cyan(
            "\n📝 Bootstrap configuration captured. Generating layout..."
          )
        );
      } else {
        console.log(chalk.yellow("\nUsing existing configuration..."));
      }
    } catch (error) {
      // Handle user cancellation (Ctrl+C)
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        (error.name === "ExitPromptError" ||
          error.name === "SIGINT" ||
          String(error).includes("SIGINT"))
      ) {
        console.log(chalk.yellow("\n\nOperation cancelled by user."));
        process.exit(0);
      }
      throw error;
    }

    // Generate quick start app (pass config if available)
    await generateQuickStart(projectRoot, config);

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
