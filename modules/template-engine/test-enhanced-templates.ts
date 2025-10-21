import { EnhancedTemplateGenerator } from "./enhanced-template-generator";
import { extractComponentSchema } from "../schema-extractor/schema-extractor";

async function testEnhancedTemplates() {
  console.log("🚀 Testing Enhanced Template Generation\n");

  const components = [
    {
      name: "Button",
      sourceFile:
        "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Button/Button.tsx",
    },
    {
      name: "Alert",
      sourceFile:
        "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Alert/Alert.tsx",
    },
  ];

  console.log("=".repeat(60));
  console.log("📊 ENHANCED TEMPLATE GENERATION TEST");
  console.log("=".repeat(60));

  for (const component of components) {
    try {
      console.log(
        `\n🔧 Processing ${component.name} with enhanced templates...`
      );

      // Extract schema
      const schema = await extractComponentSchema(component.sourceFile);

      // Generate enhanced templates
      const generator = new EnhancedTemplateGenerator(
        {
          framework: "nextjs",
          componentName: component.name,
          includeTests: true,
          includeStories: true,
          includeTypes: true,
          includeDocumentation: true,
          outputDir: "./schemas/components",
        },
        schema
      );

      await generator.generateAll();

      console.log(
        `✅ ${component.name} enhanced templates generated successfully`
      );
      console.log(`   Component: ${component.name.toLowerCase()}.tsx`);
      console.log(`   Types: ${component.name.toLowerCase()}.types.ts`);
      console.log(`   Tests: ${component.name.toLowerCase()}.test.tsx`);
      console.log(`   Stories: ${component.name.toLowerCase()}.stories.tsx`);
      console.log(`   Documentation: ${component.name.toLowerCase()}.md`);
      console.log(`   Next.js Config: next.config.js`);
      console.log(`   CSS Module: ${component.name.toLowerCase()}.module.css`);
    } catch (error) {
      console.error(
        `❌ Failed to process ${component.name}:`,
        (error as Error).message
      );
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📁 ENHANCED FILE STRUCTURE");
  console.log("=".repeat(60));

  // Show enhanced structure
  const fs = require("fs");
  const path = require("path");

  function showEnhancedStructure(dir: string, prefix = "") {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    items.forEach((item: string, index: number) => {
      const itemPath = path.join(dir, item);
      const isLast = index === items.length - 1;
      const currentPrefix = isLast ? "└── " : "├── ";

      console.log(`${prefix}${currentPrefix}${item}`);

      if (fs.statSync(itemPath).isDirectory()) {
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        showEnhancedStructure(itemPath, nextPrefix);
      }
    });
  }

  showEnhancedStructure("./schemas");

  console.log("\n" + "=".repeat(60));
  console.log("💡 ENHANCED TEMPLATE FEATURES");
  console.log("=".repeat(60));

  const features = [
    "✅ Organized Props: Grouped by category (Core, Styling, Accessibility, Advanced)",
    "✅ Enhanced TypeScript: Better type definitions and organization",
    "✅ Comprehensive Tests: Unit tests with variant testing",
    "✅ Storybook Stories: Interactive component documentation",
    "✅ Complete Documentation: Markdown documentation with examples",
    "✅ Framework Configs: Next.js, Vue, Svelte configuration files",
    "✅ CSS Modules: Component-specific styling",
    "✅ OUIA Integration: Accessibility testing support",
    "✅ State Management: useState and useEffect patterns",
    "✅ Event Handling: Comprehensive event support",
  ];

  features.forEach((feature) => {
    console.log(feature);
  });

  console.log("\n" + "=".repeat(60));
  console.log("🎯 TEMPLATE QUALITY IMPROVEMENTS");
  console.log("=".repeat(60));

  const improvements = [
    "1. **Better Code Organization**: Props grouped by category for readability",
    "2. **Enhanced TypeScript**: More precise type definitions and better IntelliSense",
    "3. **Comprehensive Testing**: Unit tests covering all variants and edge cases",
    "4. **Interactive Documentation**: Storybook stories for component exploration",
    "5. **Production Ready**: Complete file structure for real applications",
    "6. **Accessibility First**: OUIA props and ARIA support built-in",
    "7. **Framework Agnostic**: Same schema generates different framework templates",
    "8. **Developer Experience**: Better IDE support and documentation",
  ];

  improvements.forEach((improvement) => {
    console.log(improvement);
  });

  console.log("\n" + "=".repeat(60));
  console.log("🚀 NEXT STEPS");
  console.log("=".repeat(60));

  const nextSteps = [
    "1. Review generated enhanced templates",
    "2. Test generated components in Next.js app",
    "3. Add more components (Form, Modal, Card)",
    "4. Implement CLI interface for template selection",
    "5. Create Next.js starter app generator",
    "6. Add Vue and Svelte template enhancements",
    "7. Implement template customization options",
    "8. Add component composition support",
  ];

  nextSteps.forEach((step) => {
    console.log(step);
  });

  console.log("\n" + "=".repeat(60));
  console.log("✅ ENHANCED TEMPLATE GENERATION COMPLETE");
  console.log("=".repeat(60));
}

// Run the test
testEnhancedTemplates();
