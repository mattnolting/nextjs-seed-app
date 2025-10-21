// Interactive CLI interface for component selection and generation
import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { extractComponentSchema } from "../schema-extractor/schema-extractor";
import { EnhancedTemplateGenerator } from "../template-engine/enhanced-template-generator";
import { ComponentSchema } from "../schema-extractor/schema-extractor.types";

export interface CLIConfig {
  outputDir: string;
  framework: "nextjs" | "vue" | "svelte";
  includeTests: boolean;
  includeStories: boolean;
  includeTypes: boolean;
  includeDocumentation: boolean;
}

export interface ComponentOption {
  name: string;
  description: string;
  category: string;
  sourceFile: string;
  available: boolean;
}

export class PatternFlyCLI {
  private rl: readline.Interface;
  private config: CLIConfig;
  private availableComponents: ComponentOption[] = [];

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.config = {
      outputDir: "./generated-components",
      framework: "nextjs",
      includeTests: true,
      includeStories: true,
      includeTypes: true,
      includeDocumentation: true,
    };

    this.initializeComponents();
  }

  /**
   * Initialize available components
   */
  private initializeComponents(): void {
    this.availableComponents = [
      {
        name: "Button",
        description: "Primary action button with multiple variants",
        category: "Actions",
        sourceFile:
          "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Button/Button.tsx",
        available: true,
      },
      {
        name: "Alert",
        description: "Alert component with dismissible and expandable features",
        category: "Feedback",
        sourceFile:
          "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Alert/Alert.tsx",
        available: true,
      },
      {
        name: "Form",
        description: "Form component with validation and field groups",
        category: "Forms",
        sourceFile:
          "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Form/Form.tsx",
        available: true,
      },
      {
        name: "Modal",
        description:
          "Modal dialog component with backdrop and focus management",
        category: "Overlays",
        sourceFile:
          "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Modal/Modal.tsx",
        available: true,
      },
      {
        name: "Card",
        description: "Card component for displaying content",
        category: "Layout",
        sourceFile:
          "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Card/Card.tsx",
        available: true,
      },
    ];
  }

  /**
   * Start the interactive CLI
   */
  async start(): Promise<void> {
    console.log("🚀 PatternFly Component Generator CLI");
    console.log("=====================================\n");

    try {
      await this.showWelcome();
      await this.configureSettings();
      await this.selectComponents();
      await this.generateComponents();
      await this.showCompletion();
    } catch (error) {
      console.error("❌ Error:", (error as Error).message);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Show welcome message
   */
  private async showWelcome(): Promise<void> {
    console.log("Welcome to the PatternFly Component Generator!");
    console.log(
      "This tool helps you generate Next.js components from PatternFly React.\n"
    );

    console.log("Features:");
    console.log("✅ Component isolation architecture");
    console.log("✅ Enhanced template generation");
    console.log("✅ Comprehensive testing and documentation");
    console.log("✅ Multiple framework support");
    console.log("✅ Interactive component selection\n");

    await this.pause();
  }

  /**
   * Configure generation settings
   */
  private async configureSettings(): Promise<void> {
    console.log("📋 Configuration Settings");
    console.log("========================\n");

    // Framework selection
    console.log("Select framework:");
    console.log("1. Next.js (recommended)");
    console.log("2. Vue");
    console.log("3. Svelte");

    const frameworkChoice = await this.question("Enter choice (1-3): ");
    switch (frameworkChoice.trim()) {
      case "1":
        this.config.framework = "nextjs";
        break;
      case "2":
        this.config.framework = "vue";
        break;
      case "3":
        this.config.framework = "svelte";
        break;
      default:
        this.config.framework = "nextjs";
        console.log("Using Next.js (default)\n");
    }

    // Output directory
    const outputDir = await this.question(
      `Output directory [${this.config.outputDir}]: `
    );
    if (outputDir.trim()) {
      this.config.outputDir = outputDir.trim();
    }

    // Additional options
    console.log("\nAdditional options:");
    const includeTests = await this.question("Include tests? (y/n) [y]: ");
    this.config.includeTests = includeTests.trim().toLowerCase() !== "n";

    const includeStories = await this.question(
      "Include Storybook stories? (y/n) [y]: "
    );
    this.config.includeStories = includeStories.trim().toLowerCase() !== "n";

    const includeTypes = await this.question(
      "Include TypeScript types? (y/n) [y]: "
    );
    this.config.includeTypes = includeTypes.trim().toLowerCase() !== "n";

    const includeDocumentation = await this.question(
      "Include documentation? (y/n) [y]: "
    );
    this.config.includeDocumentation =
      includeDocumentation.trim().toLowerCase() !== "n";

    console.log("\n✅ Configuration complete!\n");
    await this.pause();
  }

  /**
   * Select components to generate
   */
  private async selectComponents(): Promise<void> {
    console.log("🎯 Component Selection");
    console.log("=====================\n");

    console.log("Available components:");
    this.availableComponents.forEach((component, index) => {
      const status = component.available ? "✅" : "❌";
      console.log(
        `${index + 1}. ${status} ${component.name} - ${component.description}`
      );
      console.log(`   Category: ${component.category}`);
    });

    console.log("\nSelection options:");
    console.log("• Enter component numbers (e.g., 1,3,5)");
    console.log("• Enter 'all' for all available components");
    console.log("• Enter 'categories' to select by category");

    const selection = await this.question("\nEnter your selection: ");

    if (selection.trim().toLowerCase() === "all") {
      this.selectedComponents = this.availableComponents.filter(
        (c) => c.available
      );
    } else if (selection.trim().toLowerCase() === "categories") {
      await this.selectByCategory();
    } else {
      await this.selectByNumbers(selection);
    }

    console.log(`\n✅ Selected ${this.selectedComponents.length} components\n`);
    await this.pause();
  }

  private selectedComponents: ComponentOption[] = [];

  /**
   * Select components by category
   */
  private async selectByCategory(): Promise<void> {
    const categories = [
      ...new Set(this.availableComponents.map((c) => c.category)),
    ];

    console.log("\nAvailable categories:");
    categories.forEach((category, index) => {
      const components = this.availableComponents.filter(
        (c) => c.category === category && c.available
      );
      console.log(
        `${index + 1}. ${category} (${components.length} components)`
      );
    });

    const categoryChoice = await this.question("Enter category number: ");
    const categoryIndex = parseInt(categoryChoice.trim()) - 1;

    if (categoryIndex >= 0 && categoryIndex < categories.length) {
      const selectedCategory = categories[categoryIndex];
      this.selectedComponents = this.availableComponents.filter(
        (c) => c.category === selectedCategory && c.available
      );
    }
  }

  /**
   * Select components by numbers
   */
  private async selectByNumbers(selection: string): Promise<void> {
    const numbers = selection.split(",").map((n) => parseInt(n.trim()) - 1);
    this.selectedComponents = numbers
      .filter((index) => index >= 0 && index < this.availableComponents.length)
      .map((index) => this.availableComponents[index])
      .filter((component) => component.available);
  }

  /**
   * Generate selected components
   */
  private async generateComponents(): Promise<void> {
    console.log("🔧 Component Generation");
    console.log("=====================\n");

    if (this.selectedComponents.length === 0) {
      console.log("No components selected. Exiting...");
      return;
    }

    // Create output directory
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.config.outputDir}\n`);
    }

    for (const component of this.selectedComponents) {
      try {
        console.log(`🔧 Generating ${component.name}...`);

        // Extract schema
        const schema = await extractComponentSchema(component.sourceFile);

        // Generate enhanced templates
        const generator = new EnhancedTemplateGenerator(
          {
            framework: this.config.framework,
            componentName: component.name,
            includeTests: this.config.includeTests,
            includeStories: this.config.includeStories,
            includeTypes: this.config.includeTypes,
            includeDocumentation: this.config.includeDocumentation,
            outputDir: this.config.outputDir,
          },
          schema
        );

        await generator.generateAll();

        console.log(`✅ ${component.name} generated successfully\n`);
      } catch (error) {
        console.error(
          `❌ Failed to generate ${component.name}:`,
          (error as Error).message
        );
      }
    }
  }

  /**
   * Show completion message
   */
  private async showCompletion(): Promise<void> {
    console.log("🎉 Generation Complete!");
    console.log("=====================\n");

    console.log("Generated components:");
    this.selectedComponents.forEach((component) => {
      console.log(`✅ ${component.name} - ${component.description}`);
    });

    console.log(`\n📁 Output directory: ${this.config.outputDir}`);
    console.log(`🔧 Framework: ${this.config.framework}`);
    console.log(
      `🧪 Tests: ${this.config.includeTests ? "Included" : "Not included"}`
    );
    console.log(
      `📚 Stories: ${this.config.includeStories ? "Included" : "Not included"}`
    );
    console.log(
      `📝 Types: ${this.config.includeTypes ? "Included" : "Not included"}`
    );
    console.log(
      `📖 Documentation: ${
        this.config.includeDocumentation ? "Included" : "Not included"
      }`
    );

    console.log("\n🚀 Next Steps:");
    console.log("1. Review generated components");
    console.log("2. Install dependencies: npm install");
    console.log("3. Run tests: npm test");
    console.log("4. Start development: npm run dev");
    console.log("5. View Storybook: npm run storybook");

    console.log("\n📚 Documentation:");
    console.log("• Each component includes comprehensive documentation");
    console.log("• Storybook stories for interactive exploration");
    console.log("• TypeScript types for better IDE support");
    console.log("• Unit tests for quality assurance");

    console.log("\n🎯 PatternFly Modernization Initiative:");
    console.log("• Reduced development overhead");
    console.log("• Consistent component implementations");
    console.log("• Framework-agnostic architecture");
    console.log("• Enhanced developer experience");

    console.log("\nThank you for using PatternFly Component Generator! 🚀");
  }

  /**
   * Helper methods
   */
  private question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  private pause(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  /**
   * Show help information
   */
  static showHelp(): void {
    console.log("PatternFly Component Generator CLI");
    console.log("==================================\n");
    console.log("Usage: npm run cli");
    console.log("\nThis interactive CLI helps you:");
    console.log("• Select PatternFly components to generate");
    console.log("• Configure generation settings");
    console.log("• Generate production-ready Next.js components");
    console.log("• Create comprehensive testing and documentation");
    console.log("\nFeatures:");
    console.log("• Component isolation architecture");
    console.log("• Enhanced template generation");
    console.log("• Multiple framework support");
    console.log("• Interactive component selection");
    console.log("• Comprehensive testing and documentation");
  }
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    PatternFlyCLI.showHelp();
    return;
  }

  const cli = new PatternFlyCLI();
  await cli.start();
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}
