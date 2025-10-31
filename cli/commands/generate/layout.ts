import chalk from "chalk";
import { isLayoutConfigured } from "../../utils/bootstrap-check.js";
import { runBootstrapSetup } from "../../utils/bootstrap-setup.js";
// Import existing layout generator
import { generateLayout } from "../../prompts/layout-prompts.js";

export async function generateLayoutCommand(options: { name?: string }) {
  const projectRoot = process.cwd();

  try {
    console.log(chalk.blue.bold("\n📐 Generating Layout Component\n"));

    // Check if layout is configured
    const isConfigured = await isLayoutConfigured(projectRoot);

    if (!isConfigured) {
      console.log(chalk.yellow("🔍 Checking app configuration...\n"));
      const config = await runBootstrapSetup();
      // TODO: Generate DefaultLayout first, then proceed with custom layout
    }

    // Use existing layout generator
    await generateLayout(options);

    console.log(chalk.green("\n✅ Layout generated successfully!\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error);
    process.exit(1);
  }
}
