import { extractAndSaveComponentSchema } from "../component-schema-extractor";

async function testComponentIsolation() {
  console.log("🧪 Testing Component Isolation Architecture\n");

  const configs = [
    {
      outputDir: "./schemas",
      componentName: "Button",
      sourceFile:
        "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Button/Button.tsx",
      includeTemplates: true,
      frameworks: ["nextjs", "vue", "svelte"],
    },
    {
      outputDir: "./schemas",
      componentName: "Alert",
      sourceFile:
        "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Alert/Alert.tsx",
      includeTemplates: true,
      frameworks: ["nextjs", "vue", "svelte"],
    },
  ];

  console.log("=".repeat(60));
  console.log("📊 COMPONENT ISOLATION TEST");
  console.log("=".repeat(60));

  for (const config of configs) {
    try {
      console.log(`\n🔧 Processing ${config.componentName}...`);

      const schemaFile = await extractAndSaveComponentSchema(config);

      console.log(`✅ ${config.componentName} processed successfully`);
      console.log(`   Props: ${schemaFile.schema.schemaObject.props.length}`);
      console.log(`   Events: ${schemaFile.schema.schemaObject.events.length}`);
      console.log(
        `   Variants: ${schemaFile.schema.schemaObject.variants.length}`
      );
      console.log(`   Hooks: ${schemaFile.schema.componentModel.hooks.length}`);
      console.log(
        `   State: ${schemaFile.schema.stateManagement.localState.length}`
      );
      console.log(
        `   Effects: ${schemaFile.schema.stateManagement.effects.length}`
      );

      // Show prop categories
      const propsByCategory = schemaFile.schema.schemaObject.props.reduce(
        (acc, prop) => {
          const category = prop.category || "unknown";
          if (!acc[category]) acc[category] = [];
          acc[category].push(prop.name);
          return acc;
        },
        {} as Record<string, string[]>
      );

      console.log(`   Prop Categories:`);
      Object.entries(propsByCategory).forEach(([category, names]) => {
        console.log(`     ${category}: ${names.length} props`);
      });
    } catch (error) {
      console.error(
        `❌ Failed to process ${config.componentName}:`,
        (error as Error).message
      );
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📁 GENERATED FILE STRUCTURE");
  console.log("=".repeat(60));

  // Show generated structure
  const fs = require("fs");
  const path = require("path");

  function showDirectoryStructure(dir: string, prefix = "") {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    items.forEach((item: string, index: number) => {
      const itemPath = path.join(dir, item);
      const isLast = index === items.length - 1;
      const currentPrefix = isLast ? "└── " : "├── ";

      console.log(`${prefix}${currentPrefix}${item}`);

      if (fs.statSync(itemPath).isDirectory()) {
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        showDirectoryStructure(itemPath, nextPrefix);
      }
    });
  }

  showDirectoryStructure("./schemas");

  console.log("\n" + "=".repeat(60));
  console.log("💡 BENEFITS OF COMPONENT ISOLATION");
  console.log("=".repeat(60));

  const benefits = [
    "✅ Modularity: Each component is self-contained",
    "✅ Framework Flexibility: Same schema, different templates",
    "✅ Team Collaboration: Independent component development",
    "✅ Selective Generation: Include only needed components",
    "✅ Versioning: Version components independently",
    "✅ Testing: Test each component schema in isolation",
    "✅ PatternFly Alignment: Mirrors PatternFly's architecture",
  ];

  benefits.forEach((benefit) => {
    console.log(benefit);
  });

  console.log("\n" + "=".repeat(60));
  console.log("🚀 NEXT STEPS");
  console.log("=".repeat(60));

  const nextSteps = [
    "1. Review generated schema files",
    "2. Test generated templates",
    "3. Add more components (Form, Modal)",
    "4. Implement template engine",
    "5. Create CLI interface",
    "6. Build Next.js starter generator",
  ];

  nextSteps.forEach((step) => {
    console.log(step);
  });

  console.log("\n" + "=".repeat(60));
  console.log("✅ COMPONENT ISOLATION TEST COMPLETE");
  console.log("=".repeat(60));
}

// Run the test
testComponentIsolation();
