import { extractComponentSchema } from "./schema-extractor";

async function testAlertComponent() {
  console.log("🧪 Testing Alert Component Extraction\n");

  const alertPath =
    "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Alert/Alert.tsx";

  try {
    const schema = await extractComponentSchema(alertPath);

    console.log("=".repeat(60));
    console.log("📊 ALERT EXTRACTION SUMMARY");
    console.log("=".repeat(60));
    console.log(`Component: ${schema.schemaObject.componentName}`);
    console.log(`Props Count: ${schema.schemaObject.props.length}`);
    console.log(`Events Count: ${schema.schemaObject.events.length}`);
    console.log(`Variants Count: ${schema.schemaObject.variants.length}`);
    console.log(`Hooks Count: ${schema.componentModel.hooks.length}`);
    console.log(`State Count: ${schema.stateManagement.localState.length}`);
    console.log(`Effects Count: ${schema.stateManagement.effects.length}`);

    console.log("\n" + "=".repeat(60));
    console.log("🎯 PROPS BY CATEGORY");
    console.log("=".repeat(60));

    // Group props by category
    const propsByCategory = schema.schemaObject.props.reduce((acc, prop) => {
      const category = prop.category || "unknown";
      if (!acc[category]) acc[category] = [];
      acc[category].push(prop.name);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(propsByCategory).forEach(([category, names]) => {
      console.log(`${category.toUpperCase()}: ${names.join(", ")}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("⚡ EVENTS ANALYSIS");
    console.log("=".repeat(60));

    const explicitEvents = schema.schemaObject.events.filter(
      (e) => !e.inherited
    );
    const inheritedEvents = schema.schemaObject.events.filter(
      (e) => e.inherited
    );

    console.log(`Explicit Events: ${explicitEvents.length}`);
    explicitEvents.forEach((event) => {
      console.log(`  ${event.name}: ${event.signature}`);
    });

    console.log(`\nInherited Events: ${inheritedEvents.length}`);
    inheritedEvents.slice(0, 5).forEach((event) => {
      console.log(`  ${event.name}: ${event.signature}`);
    });
    if (inheritedEvents.length > 5) {
      console.log(`  ... and ${inheritedEvents.length - 5} more`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("🔧 STATE MANAGEMENT ANALYSIS");
    console.log("=".repeat(60));

    console.log(`Local State: ${schema.stateManagement.localState.length}`);
    schema.stateManagement.localState.forEach((state) => {
      console.log(`  ${state.name}: ${state.type}`);
    });

    console.log(`\nEffects: ${schema.stateManagement.effects.length}`);
    schema.stateManagement.effects.forEach((effect) => {
      console.log(`  ${effect.name}: [${effect.dependencies.join(", ")}]`);
    });

    console.log(
      `\nDerived State: ${schema.stateManagement.derivedState.length}`
    );
    schema.stateManagement.derivedState.forEach((derived) => {
      console.log(`  ${derived.name}: ${derived.logic}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("🎨 VARIANTS ANALYSIS");
    console.log("=".repeat(60));

    schema.schemaObject.variants.forEach((variant) => {
      console.log(`${variant.name}:`);
      console.log(`  Values: ${variant.values.join(", ")}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("🔍 PATTERNFLY-SPECIFIC PATTERNS");
    console.log("=".repeat(60));

    const ouiaProps = schema.schemaObject.props.filter((p) =>
      p.name.includes("ouia")
    );
    const ariaProps = schema.schemaObject.props.filter((p) =>
      p.name.startsWith("aria")
    );
    const isProps = schema.schemaObject.props.filter((p) =>
      p.name.startsWith("is")
    );
    const timeoutProps = schema.schemaObject.props.filter((p) =>
      p.name.includes("timeout")
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
      `Timeout Props: ${timeoutProps.length} (${timeoutProps
        .map((p) => p.name)
        .join(", ")})`
    );

    console.log("\n" + "=".repeat(60));
    console.log("💡 ALERT-SPECIFIC INSIGHTS");
    console.log("=".repeat(60));

    const insights = [];

    if (schema.stateManagement.effects.length > 0) {
      insights.push("Alert uses useEffect - complex state management detected");
    }

    if (schema.stateManagement.localState.length > 0) {
      insights.push("Alert has local state - useState patterns detected");
    }

    if (timeoutProps.length > 0) {
      insights.push("Alert has timeout functionality - auto-dismiss behavior");
    }

    if (schema.schemaObject.variants.length > 0) {
      insights.push(
        "Alert has variants - success, danger, warning, info patterns"
      );
    }

    if (schema.componentModel.hooks.length > 0) {
      insights.push(
        "Alert uses hooks - needs 'use client' directive in Next.js"
      );
    }

    insights.forEach((insight, i) => {
      console.log(`${i + 1}. ${insight}`);
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ ALERT TEST COMPLETE");
    console.log("=".repeat(60));

    return schema;
  } catch (error) {
    console.error("❌ Alert test failed:", (error as Error).message);
    throw error;
  }
}

// Run the test
testAlertComponent();
