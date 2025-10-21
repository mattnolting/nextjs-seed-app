import { extractComponentSchema } from "./schema-extractor";

async function analyzeButtonExtraction() {
  console.log("🔍 Analyzing Button Component Extraction Results\n");

  const buttonPath =
    "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Button/Button.tsx";

  try {
    const schema = await extractComponentSchema(buttonPath);

    console.log("=".repeat(60));
    console.log("📊 EXTRACTION SUMMARY");
    console.log("=".repeat(60));
    console.log(`Component: ${schema.schemaObject.componentName}`);
    console.log(`Props Count: ${schema.schemaObject.props.length}`);
    console.log(`Events Count: ${schema.schemaObject.events.length}`);
    console.log(`Variants Count: ${schema.schemaObject.variants.length}`);
    console.log(`Hooks Count: ${schema.componentModel.hooks.length}`);
    console.log(`Imports Count: ${schema.componentModel.imports.length}`);
    console.log(
      `Validation: ${
        schema.metadata.validation.isValid ? "✅ Valid" : "❌ Invalid"
      }`
    );

    console.log("\n" + "=".repeat(60));
    console.log("🎯 PROPS ANALYSIS");
    console.log("=".repeat(60));

    // Group props by type
    const propTypes = schema.schemaObject.props.reduce((acc, prop) => {
      const type = prop.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(prop.name);
      return acc;
    }, {} as Record<string, string[]>);

    console.log("Props by Type:");
    Object.entries(propTypes).forEach(([type, names]) => {
      console.log(`  ${type}: ${names.join(", ")}`);
    });

    // Required vs Optional
    const required = schema.schemaObject.props.filter((p) => p.required);
    const optional = schema.schemaObject.props.filter((p) => !p.required);
    console.log(`\nRequired Props: ${required.length}`);
    console.log(`Optional Props: ${optional.length}`);

    console.log("\n" + "=".repeat(60));
    console.log("🎨 VARIANTS ANALYSIS");
    console.log("=".repeat(60));

    schema.schemaObject.variants.forEach((variant) => {
      console.log(`${variant.name}:`);
      console.log(`  Values: ${variant.values.join(", ")}`);
      console.log(`  Count: ${variant.values.length}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("⚡ EVENTS ANALYSIS");
    console.log("=".repeat(60));

    schema.schemaObject.events.forEach((event) => {
      console.log(`${event.name}: ${event.signature}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("🔧 COMPONENT MODEL ANALYSIS");
    console.log("=".repeat(60));

    console.log(`Type: ${schema.componentModel.type}`);
    console.log(
      `Forward Ref: ${schema.componentModel.forwardRef ? "Yes" : "No"}`
    );
    console.log(
      `Hooks Used: ${schema.componentModel.hooks.map((h) => h.name).join(", ")}`
    );

    console.log("\nImports:");
    schema.componentModel.imports.forEach((imp) => {
      console.log(`  ${imp.source}: ${imp.names.join(", ")}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("🎯 PATTERNFLY-SPECIFIC PATTERNS");
    console.log("=".repeat(60));

    // Check for PatternFly-specific patterns
    const ouiaProps = schema.schemaObject.props.filter((p) =>
      p.name.includes("ouia")
    );
    const ariaProps = schema.schemaObject.props.filter((p) =>
      p.name.startsWith("aria")
    );
    const isProps = schema.schemaObject.props.filter((p) =>
      p.name.startsWith("is")
    );
    const hasProps = schema.schemaObject.props.filter((p) =>
      p.name.startsWith("has")
    );

    console.log(
      `OUIA Props: ${ouiaProps.length} (${ouiaProps
        .map((p) => p.name)
        .join(", ")})`
    );
    console.log(
      `ARIA Props: ${ariaProps.length} (${ariaProps
        .map((p) => p.name)
        .join(", ")})`
    );
    console.log(
      `Boolean Props (is*): ${isProps.length} (${isProps
        .map((p) => p.name)
        .join(", ")})`
    );
    console.log(
      `Boolean Props (has*): ${hasProps.length} (${hasProps
        .map((p) => p.name)
        .join(", ")})`
    );

    console.log("\n" + "=".repeat(60));
    console.log("🚨 VALIDATION RESULTS");
    console.log("=".repeat(60));

    if (schema.metadata.validation.errors.length > 0) {
      console.log("Errors:");
      schema.metadata.validation.errors.forEach((error) => {
        console.log(`  ❌ ${error.code}: ${error.message}`);
      });
    }

    if (schema.metadata.validation.warnings.length > 0) {
      console.log("Warnings:");
      schema.metadata.validation.warnings.forEach((warning) => {
        console.log(`  ⚠️  ${warning.code}: ${warning.message}`);
      });
    }

    console.log("\n" + "=".repeat(60));
    console.log("💡 INSIGHTS & RECOMMENDATIONS");
    console.log("=".repeat(60));

    // Generate insights
    const insights = [];

    if (schema.schemaObject.props.length > 30) {
      insights.push(
        "Button has many props - consider grouping for Next.js generation"
      );
    }

    if (schema.schemaObject.variants.length > 0) {
      insights.push(
        "Multiple variants detected - good for template generation"
      );
    }

    if (schema.componentModel.forwardRef) {
      insights.push("Uses forwardRef - important for Next.js compatibility");
    }

    if (ouiaProps.length > 0) {
      insights.push(
        "OUIA props detected - PatternFly-specific accessibility pattern"
      );
    }

    if (schema.componentModel.hooks.length > 0) {
      insights.push("Uses hooks - will need 'use client' directive in Next.js");
    }

    insights.forEach((insight, i) => {
      console.log(`${i + 1}. ${insight}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ ANALYSIS COMPLETE");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("❌ Analysis failed:", (error as Error).message);
  }
}

// Run the analysis
analyzeButtonExtraction();
