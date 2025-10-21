// Component-specific schema extractor
import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import {
  ComponentSchema,
  SchemaObject,
  ComponentModel,
  StateManagement,
  ExtractionMetadata,
  ValidationResult,
  ExtractionError,
  AST,
} from "../schema-extractor/schema-extractor.types";
import { extractComponentSchema } from "../schema-extractor/schema-extractor";

export interface ComponentSchemaFile {
  componentName: string;
  schema: ComponentSchema;
  metadata: {
    extractedAt: Date;
    sourceFile: string;
    version: string;
  };
}

export interface ComponentSchemaConfig {
  outputDir: string;
  componentName: string;
  sourceFile: string;
  includeTemplates?: boolean;
  frameworks?: string[];
}

/**
 * Extract and save component schema to isolated files
 */
export async function extractAndSaveComponentSchema(
  config: ComponentSchemaConfig
): Promise<ComponentSchemaFile> {
  const { componentName, sourceFile, outputDir } = config;

  // Extract schema
  const schema = await extractComponentSchema(sourceFile);

  // Create component directory
  const componentDir = path.join(outputDir, componentName);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Save schema file
  const schemaFile: ComponentSchemaFile = {
    componentName,
    schema,
    metadata: {
      extractedAt: new Date(),
      sourceFile,
      version: "1.0.0",
    },
  };

  const schemaPath = path.join(
    componentDir,
    `${componentName.toLowerCase()}.schema.json`
  );
  fs.writeFileSync(schemaPath, JSON.stringify(schemaFile, null, 2));

  // Save TypeScript types
  const typesPath = path.join(
    componentDir,
    `${componentName.toLowerCase()}.types.ts`
  );
  const typesContent = generateComponentTypes(componentName, schema);
  fs.writeFileSync(typesPath, typesContent);

  // Save validation rules
  const validationPath = path.join(
    componentDir,
    `${componentName.toLowerCase()}.validation.json`
  );
  const validationRules = generateValidationRules(schema);
  fs.writeFileSync(validationPath, JSON.stringify(validationRules, null, 2));

  // Generate templates if requested
  if (config.includeTemplates) {
    await generateTemplates(
      componentDir,
      componentName,
      schema,
      config.frameworks || ["nextjs"]
    );
  }

  console.log(`✅ Component schema saved: ${componentName}`);
  console.log(`   Schema: ${schemaPath}`);
  console.log(`   Types: ${typesPath}`);
  console.log(`   Validation: ${validationPath}`);

  return schemaFile;
}

/**
 * Generate TypeScript types for component
 */
function generateComponentTypes(
  componentName: string,
  schema: ComponentSchema
): string {
  const { schemaObject, componentModel } = schema;

  let typesContent = `// Generated TypeScript types for ${componentName} component\n\n`;

  // Generate prop types
  typesContent += `export interface ${componentName}Props {\n`;
  schemaObject.props.forEach((prop) => {
    const optional = prop.required ? "" : "?";
    const comment = prop.description ? `  /** ${prop.description} */\n` : "";
    typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
  });
  typesContent += `}\n\n`;

  // Generate variant types
  schemaObject.variants.forEach((variant) => {
    typesContent += `export type ${variant.name} = ${variant.values
      .map((v) => `"${v}"`)
      .join(" | ")};\n`;
  });

  if (schemaObject.variants.length > 0) {
    typesContent += `\n`;
  }

  // Generate event types
  if (schemaObject.events.length > 0) {
    typesContent += `export interface ${componentName}Events {\n`;
    schemaObject.events.forEach((event) => {
      typesContent += `  ${event.name}: ${event.signature};\n`;
    });
    typesContent += `}\n\n`;
  }

  // Generate component model types
  typesContent += `export interface ${componentName}Model {\n`;
  typesContent += `  type: "${componentModel.type}";\n`;
  typesContent += `  forwardRef: ${componentModel.forwardRef};\n`;
  typesContent += `  hooks: string[];\n`;
  typesContent += `  imports: Array<{ source: string; names: string[] }>;\n`;
  typesContent += `}\n\n`;

  // Generate state management types
  if (
    schema.stateManagement.localState.length > 0 ||
    schema.stateManagement.effects.length > 0
  ) {
    typesContent += `export interface ${componentName}State {\n`;
    schema.stateManagement.localState.forEach((state) => {
      typesContent += `  ${state.name}: ${state.type};\n`;
    });
    typesContent += `}\n\n`;
  }

  return typesContent;
}

/**
 * Generate validation rules for component
 */
function generateValidationRules(schema: ComponentSchema): any {
  const { schemaObject } = schema;

  return {
    componentName: schemaObject.componentName,
    rules: {
      props: schemaObject.props.map((prop) => ({
        name: prop.name,
        required: prop.required,
        type: prop.type,
        category: prop.category,
        validation: {
          required: prop.required,
          type: prop.type,
        },
      })),
      variants: schemaObject.variants.map((variant) => ({
        name: variant.name,
        values: variant.values,
        type: variant.type,
      })),
      events: schemaObject.events.map((event) => ({
        name: event.name,
        signature: event.signature,
        inherited: event.inherited,
      })),
    },
    patterns: {
      ouia: schemaObject.props
        .filter((p) => p.name.includes("ouia"))
        .map((p) => p.name),
      aria: schemaObject.props
        .filter((p) => p.name.startsWith("aria"))
        .map((p) => p.name),
      boolean: schemaObject.props
        .filter((p) => p.name.match(/^(is|has|can|should|will)[A-Z]/))
        .map((p) => p.name),
    },
  };
}

/**
 * Generate templates for different frameworks
 */
async function generateTemplates(
  componentDir: string,
  componentName: string,
  schema: ComponentSchema,
  frameworks: string[]
): Promise<void> {
  const templatesDir = path.join(componentDir, "templates");
  if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir, { recursive: true });
  }

  for (const framework of frameworks) {
    const templateContent = generateFrameworkTemplate(
      componentName,
      schema,
      framework
    );
    const templatePath = path.join(
      templatesDir,
      `${componentName.toLowerCase()}.${framework}`
    );
    fs.writeFileSync(templatePath, templateContent);
  }
}

/**
 * Generate framework-specific template
 */
function generateFrameworkTemplate(
  componentName: string,
  schema: ComponentSchema,
  framework: string
): string {
  const { schemaObject, componentModel } = schema;

  switch (framework) {
    case "nextjs":
      return generateNextJSTemplate(componentName, schema);
    case "vue":
      return generateVueTemplate(componentName, schema);
    case "svelte":
      return generateSvelteTemplate(componentName, schema);
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
}

/**
 * Generate Next.js template
 */
function generateNextJSTemplate(
  componentName: string,
  schema: ComponentSchema
): string {
  const { schemaObject, componentModel } = schema;

  let template = `"use client";\n\n`;

  // Add imports
  template += `import { forwardRef } from "react";\n`;
  template += `import { css } from "@patternfly/react-styles";\n`;
  template += `import styles from "@patternfly/react-styles/css/components/${componentName}/${componentName.toLowerCase()}";\n`;

  if (componentModel.hooks.length > 0) {
    template += `import { ${componentModel.hooks
      .map((h) => h.name)
      .join(", ")} } from "../../helpers";\n`;
  }

  template += `\n`;

  // Add types
  template += `export interface ${componentName}Props {\n`;
  schemaObject.props.forEach((prop) => {
    const optional = prop.required ? "" : "?";
    const comment = prop.description ? `  /** ${prop.description} */\n` : "";
    template += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
  });
  template += `}\n\n`;

  // Add component
  template += `export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(({\n`;
  template += `  ${schemaObject.props.map((p) => p.name).join(",\n  ")},\n`;
  template += `  ...props\n`;
  template += `}, ref) => {\n`;

  // Add hooks
  if (componentModel.hooks.length > 0) {
    template += `\n  // Hooks\n`;
    componentModel.hooks.forEach((hook) => {
      template += `  const ${hook.name} = ${hook.name}();\n`;
    });
  }

  // Add state
  if (schema.stateManagement.localState.length > 0) {
    template += `\n  // State\n`;
    schema.stateManagement.localState.forEach((state) => {
      template += `  const [${state.name}, set${
        state.name.charAt(0).toUpperCase() + state.name.slice(1)
      }] = useState<${state.type}>();\n`;
    });
  }

  // Add effects
  if (schema.stateManagement.effects.length > 0) {
    template += `\n  // Effects\n`;
    schema.stateManagement.effects.forEach((effect) => {
      template += `  useEffect(() => {\n`;
      template += `    // ${effect.name} logic\n`;
      template += `  }, [${effect.dependencies.join(", ")}]);\n`;
    });
  }

  // Add return
  template += `\n  return (\n`;
  template += `    <div\n`;
  template += `      ref={ref}\n`;
  template += `      className={css(\n`;
  template += `        styles.${componentName.toLowerCase()},\n`;
  template += `        className\n`;
  template += `      )}\n`;
  template += `      {...props}\n`;
  template += `    >\n`;
  template += `      {children}\n`;
  template += `    </div>\n`;
  template += `  );\n`;
  template += `});\n\n`;
  template += `${componentName}.displayName = "${componentName}";\n`;

  return template;
}

/**
 * Generate Vue template
 */
function generateVueTemplate(
  componentName: string,
  schema: ComponentSchema
): string {
  // Placeholder for Vue template generation
  return `<!-- Vue template for ${componentName} -->\n<template>\n  <div class="${componentName.toLowerCase()}">\n    <slot />\n  </div>\n</template>\n\n<script setup lang="ts">\n// Vue component logic for ${componentName}\n</script>`;
}

/**
 * Generate Svelte template
 */
function generateSvelteTemplate(
  componentName: string,
  schema: ComponentSchema
): string {
  // Placeholder for Svelte template generation
  return `<!-- Svelte template for ${componentName} -->\n<div class="${componentName.toLowerCase()}">\n  <slot />\n</div>\n\n<script lang="ts">\n// Svelte component logic for ${componentName}\n</script>`;
}
