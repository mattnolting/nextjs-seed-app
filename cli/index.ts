#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { generateLayout } from "./prompts/layout-prompts.js";

const program = new Command();

program
  .name("patternfly-cli")
  .description("CLI for generating PatternFly Next.js components and layouts")
  .version("1.0.0");

program
  .command("generate")
  .alias("g")
  .description("Generate a new component or layout")
  .option("-t, --type <type>", "Component type (layout, component)")
  .option("-n, --name <name>", "Component name")
  .action(async (options) => {
    console.log(chalk.blue.bold("🎨 PatternFly CLI Generator\n"));
    await generateLayout(options);
  });

program
  .command("layout")
  .description("Generate a layout component")
  .option("-n, --name <name>", "Layout name")
  .action(async (options) => {
    console.log(chalk.blue.bold("📐 Generating Layout Component\n"));
    await generateLayout(options);
  });

program.parse();

// If no command provided, start interactive mode
if (!process.argv.slice(2).length) {
  console.log(chalk.blue.bold("🎨 PatternFly CLI Generator\n"));
  generateLayout({});
}
