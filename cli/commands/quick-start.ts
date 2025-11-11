#!/usr/bin/env node

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

    // Always offer configuration walkthrough for reconfiguration
    console.log(
      chalk.blue.bold("\n🔧 PatternFly Quick Start - Reconfiguration\n")
    );
    console.log(
      chalk.yellow(
        "This will reconfigure your application based on your preferences.\n"
      )
    );

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

      if (!configureNow) {
        console.log(chalk.yellow("\nUsing existing configuration..."));
        console.log(
          chalk.green.bold(
            "\n✅ Quick Start skipped – no changes were applied.\n"
          )
        );
        return;
      }

      // Run bootstrap setup
      config = await runBootstrapSetup();
      console.log(
        chalk.cyan(
          "\n📝 Bootstrap configuration captured. Generating layout..."
        )
      );
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
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}

main();
