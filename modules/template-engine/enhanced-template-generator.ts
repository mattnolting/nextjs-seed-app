// Enhanced template engine for component generation
import * as fs from "fs";
import * as path from "path";
import { ComponentSchema } from "../schema-extractor/schema-extractor.types";

export interface TemplateConfig {
  framework: "nextjs" | "vue" | "svelte";
  componentName: string;
  includeTests: boolean;
  includeStories: boolean;
  includeTypes: boolean;
  includeDocumentation: boolean;
  outputDir: string;
}

export interface TemplateContext {
  componentName: string;
  componentNameLower: string;
  componentNameKebab: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    category?: string;
    description?: string;
    defaultValue?: any;
  }>;
  events: Array<{
    name: string;
    signature: string;
    inherited?: boolean;
  }>;
  variants: Array<{
    name: string;
    values: string[];
    type: string;
  }>;
  hooks: string[];
  state: Array<{
    name: string;
    type: string;
  }>;
  effects: Array<{
    name: string;
    dependencies: string[];
  }>;
  imports: Array<{
    source: string;
    names: string[];
    isDefault?: boolean;
  }>;
  patterns: {
    ouia: string[];
    aria: string[];
    boolean: string[];
  };
}

/**
 * Enhanced template generator
 */
export class EnhancedTemplateGenerator {
  private config: TemplateConfig;
  private context: TemplateContext;

  constructor(config: TemplateConfig, schema: ComponentSchema) {
    this.config = config;
    this.context = this.buildTemplateContext(schema);
  }

  /**
   * Generate all templates for the component
   */
  async generateAll(): Promise<void> {
    const { componentName, outputDir } = this.config;
    const componentDir = path.join(outputDir, componentName);

    // Generate main component file
    await this.generateComponent();

    // Generate additional files based on config
    if (this.config.includeTypes) {
      await this.generateTypes();
    }

    if (this.config.includeTests) {
      await this.generateTests();
    }

    if (this.config.includeStories) {
      await this.generateStories();
    }

    if (this.config.includeDocumentation) {
      await this.generateDocumentation();
    }

    // Generate framework-specific files
    await this.generateFrameworkFiles();
  }

  /**
   * Generate the main component file
   */
  private async generateComponent(): Promise<void> {
    const { framework } = this.config;
    const content = this.generateFrameworkTemplate(framework);
    await this.writeFile(
      `${this.context.componentNameLower}.${this.getFileExtension(framework)}`,
      content
    );
  }

  /**
   * Generate TypeScript types file
   */
  private async generateTypes(): Promise<void> {
    const content = this.generateTypesContent();
    await this.writeFile(
      `${this.context.componentNameLower}.types.ts`,
      content
    );
  }

  /**
   * Generate test file
   */
  private async generateTests(): Promise<void> {
    const content = this.generateTestContent();
    await this.writeFile(
      `${this.context.componentNameLower}.test.tsx`,
      content
    );
  }

  /**
   * Generate Storybook stories
   */
  private async generateStories(): Promise<void> {
    const content = this.generateStoriesContent();
    await this.writeFile(
      `${this.context.componentNameLower}.stories.tsx`,
      content
    );
  }

  /**
   * Generate documentation
   */
  private async generateDocumentation(): Promise<void> {
    const content = this.generateDocumentationContent();
    await this.writeFile(`${this.context.componentNameLower}.md`, content);
  }

  /**
   * Generate framework-specific files
   */
  private async generateFrameworkFiles(): Promise<void> {
    const { framework } = this.config;

    switch (framework) {
      case "nextjs":
        await this.generateNextJSFiles();
        break;
      case "vue":
        await this.generateVueFiles();
        break;
      case "svelte":
        await this.generateSvelteFiles();
        break;
    }
  }

  /**
   * Generate Next.js specific files
   */
  private async generateNextJSFiles(): Promise<void> {
    // Generate Next.js specific configuration
    const nextConfig = this.generateNextJSConfig();
    await this.writeFile("next.config.js", nextConfig);

    // Generate CSS module if needed
    const cssContent = this.generateCSSModule();
    await this.writeFile(
      `${this.context.componentNameLower}.module.css`,
      cssContent
    );
  }

  /**
   * Generate Vue specific files
   */
  private async generateVueFiles(): Promise<void> {
    // Generate Vue specific files
    const vueConfig = this.generateVueConfig();
    await this.writeFile("vue.config.js", vueConfig);
  }

  /**
   * Generate Svelte specific files
   */
  private async generateSvelteFiles(): Promise<void> {
    // Generate Svelte specific files
    const svelteConfig = this.generateSvelteConfig();
    await this.writeFile("svelte.config.js", svelteConfig);
  }

  /**
   * Generate enhanced Next.js template
   */
  private generateNextJSTemplate(): string {
    const {
      componentName,
      componentNameLower,
      props,
      variants,
      hooks,
      state,
      effects,
      patterns,
    } = this.context;

    let template = `"use client";

import { forwardRef, useState, useEffect } from "react";
import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/${componentName}/${componentNameLower}";
`;

    // Add conditional imports
    if (hooks.length > 0) {
      template += `import { ${hooks.join(", ")} } from "../../helpers";\n`;
    }

    if (patterns.ouia.length > 0) {
      template += `import { useOUIAProps, OUIAProps } from "../../helpers/OUIA";\n`;
    }

    template += `\n`;

    // Generate prop types with better organization
    template += this.generateEnhancedPropTypes();

    // Generate variant types
    if (variants.length > 0) {
      template += `\n`;
      variants.forEach((variant) => {
        template += `export type ${variant.name} = ${variant.values
          .map((v) => `"${v}"`)
          .join(" | ")};\n`;
      });
    }

    // Generate component
    template += `\n`;
    template += this.generateEnhancedComponent();

    return template;
  }

  /**
   * Generate enhanced prop types with better organization
   */
  private generateEnhancedPropTypes(): string {
    const { componentName, props } = this.context;

    // Group props by category
    const propsByCategory = props.reduce((acc, prop) => {
      const category = prop.category || "other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(prop);
      return acc;
    }, {} as Record<string, typeof props>);

    let typesContent = `export interface ${componentName}Props {\n`;

    // Core props first
    if (propsByCategory.core) {
      typesContent += `  // Core props\n`;
      propsByCategory.core.forEach((prop) => {
        const optional = prop.required ? "" : "?";
        const comment = prop.description
          ? `  /** ${prop.description} */\n`
          : "";
        typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
      });
    }

    // Styling props
    if (propsByCategory.styling) {
      typesContent += `\n  // Styling props\n`;
      propsByCategory.styling.forEach((prop) => {
        const optional = prop.required ? "" : "?";
        const comment = prop.description
          ? `  /** ${prop.description} */\n`
          : "";
        typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
      });
    }

    // Accessibility props
    if (propsByCategory.accessibility) {
      typesContent += `\n  // Accessibility props\n`;
      propsByCategory.accessibility.forEach((prop) => {
        const optional = prop.required ? "" : "?";
        const comment = prop.description
          ? `  /** ${prop.description} */\n`
          : "";
        typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
      });
    }

    // Advanced props
    if (propsByCategory.advanced) {
      typesContent += `\n  // Advanced props\n`;
      propsByCategory.advanced.forEach((prop) => {
        const optional = prop.required ? "" : "?";
        const comment = prop.description
          ? `  /** ${prop.description} */\n`
          : "";
        typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
      });
    }

    // Event props
    if (propsByCategory.events) {
      typesContent += `\n  // Event props\n`;
      propsByCategory.events.forEach((prop) => {
        const optional = prop.required ? "" : "?";
        const comment = prop.description
          ? `  /** ${prop.description} */\n`
          : "";
        typesContent += `${comment}  ${prop.name}${optional}: ${prop.type};\n`;
      });
    }

    typesContent += `}\n`;

    return typesContent;
  }

  /**
   * Generate enhanced component with better structure
   */
  private generateEnhancedComponent(): string {
    const {
      componentName,
      componentNameLower,
      props,
      variants,
      hooks,
      state,
      effects,
      patterns,
    } = this.context;

    let component = `export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(({\n`;

    // Organize props by category for better readability
    const coreProps = props.filter((p) => p.category === "core");
    const stylingProps = props.filter((p) => p.category === "styling");
    const accessibilityProps = props.filter(
      (p) => p.category === "accessibility"
    );
    const advancedProps = props.filter((p) => p.category === "advanced");
    const eventProps = props.filter((p) => p.category === "events");

    // Add props with better organization
    if (coreProps.length > 0) {
      component += `  // Core props\n`;
      coreProps.forEach((prop) => {
        component += `  ${prop.name},\n`;
      });
    }

    if (stylingProps.length > 0) {
      component += `  // Styling props\n`;
      stylingProps.forEach((prop) => {
        component += `  ${prop.name},\n`;
      });
    }

    if (accessibilityProps.length > 0) {
      component += `  // Accessibility props\n`;
      accessibilityProps.forEach((prop) => {
        component += `  ${prop.name},\n`;
      });
    }

    if (advancedProps.length > 0) {
      component += `  // Advanced props\n`;
      advancedProps.forEach((prop) => {
        component += `  ${prop.name},\n`;
      });
    }

    if (eventProps.length > 0) {
      component += `  // Event props\n`;
      eventProps.forEach((prop) => {
        component += `  ${prop.name},\n`;
      });
    }

    component += `  ...props\n`;
    component += `}, ref) => {\n`;

    // Add OUIA props if present
    if (patterns.ouia.length > 0) {
      component += `\n  // OUIA props for accessibility\n`;
      component += `  const ouiaProps = useOUIAProps("${componentName}", ouiaId, ouiaSafe);\n`;
    }

    // Add hooks
    if (hooks.length > 0) {
      component += `\n  // Custom hooks\n`;
      hooks.forEach((hook) => {
        component += `  const ${hook} = ${hook}();\n`;
      });
    }

    // Add state management
    if (state.length > 0) {
      component += `\n  // State management\n`;
      state.forEach((stateItem) => {
        component += `  const [${stateItem.name}, set${
          stateItem.name.charAt(0).toUpperCase() + stateItem.name.slice(1)
        }] = useState<${stateItem.type}>();\n`;
      });
    }

    // Add effects
    if (effects.length > 0) {
      component += `\n  // Effects\n`;
      effects.forEach((effect) => {
        component += `  useEffect(() => {\n`;
        component += `    // ${effect.name} logic\n`;
        component += `  }, [${effect.dependencies.join(", ")}]);\n`;
      });
    }

    // Generate CSS classes
    component += `\n  // CSS classes\n`;
    component += `  const cssClasses = css(\n`;
    component += `    styles.${componentNameLower},\n`;

    // Add variant classes
    variants.forEach((variant) => {
      const variantProp = props.find(
        (p) => p.name === variant.name.toLowerCase().replace("variant", "")
      );
      if (variantProp) {
        component += `    ${variantProp.name} && styles.modifiers.${variantProp.name},\n`;
      }
    });

    // Add boolean modifier classes
    patterns.boolean.forEach((propName) => {
      component += `    ${propName} && styles.modifiers.${propName
        .replace(/^is|^has|^can|^should|^will/, "")
        .toLowerCase()},\n`;
    });

    component += `    className\n`;
    component += `  );\n`;

    // Generate return statement
    component += `\n  return (\n`;
    component += `    <div\n`;
    component += `      ref={ref}\n`;
    component += `      className={cssClasses}\n`;
    component += `      {...ouiaProps}\n`;
    component += `      {...props}\n`;
    component += `    >\n`;
    component += `      {children}\n`;
    component += `    </div>\n`;
    component += `  );\n`;
    component += `});\n\n`;
    component += `${componentName}.displayName = "${componentName}";\n`;

    return component;
  }

  /**
   * Generate test content
   */
  private generateTestContent(): string {
    const { componentName, componentNameLower, props, variants } = this.context;

    let testContent = `import { render, screen } from "@testing-library/react";
import { ${componentName} } from "./${componentNameLower}";

describe("${componentName}", () => {
  it("renders without crashing", () => {
    render(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<${componentName} className="custom-class">Test</${componentName}>);
    expect(screen.getByText("Test")).toHaveClass("custom-class");
  });
`;

    // Add variant tests
    variants.forEach((variant) => {
      const variantProp = props.find(
        (p) => p.name === variant.name.toLowerCase().replace("variant", "")
      );
      if (variantProp) {
        variant.values.forEach((value) => {
          testContent += `\n  it("renders with ${variantProp.name} variant '${value}'", () => {\n`;
          testContent += `    render(<${componentName} ${variantProp.name}="${value}">Test</${componentName}>);\n`;
          testContent += `    expect(screen.getByText("Test")).toHaveClass("pf-v6-c-${componentNameLower}--${value}");\n`;
          testContent += `  });\n`;
        });
      }
    });

    testContent += `});\n`;

    return testContent;
  }

  /**
   * Generate Storybook stories
   */
  private generateStoriesContent(): string {
    const { componentName, componentNameLower, props, variants } = this.context;

    let storiesContent = `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentNameLower}";

const meta: Meta<typeof ${componentName}> = {
  title: "PatternFly/${componentName}",
  component: ${componentName},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
`;

    // Add argTypes for props
    props.forEach((prop) => {
      storiesContent += `    ${prop.name}: {\n`;
      storiesContent += `      control: { type: "${this.getControlType(
        prop.type
      )}" },\n`;
      if (prop.description) {
        storiesContent += `      description: "${prop.description}",\n`;
      }
      storiesContent += `    },\n`;
    });

    storiesContent += `  },\n`;
    storiesContent += `};\n\n`;
    storiesContent += `export default meta;\n`;
    storiesContent += `type Story = StoryObj<typeof meta>;\n\n`;

    // Default story
    storiesContent += `export const Default: Story = {\n`;
    storiesContent += `  args: {\n`;
    storiesContent += `    children: "Default ${componentName}",\n`;
    storiesContent += `  },\n`;
    storiesContent += `};\n\n`;

    // Variant stories
    variants.forEach((variant) => {
      const variantProp = props.find(
        (p) => p.name === variant.name.toLowerCase().replace("variant", "")
      );
      if (variantProp) {
        variant.values.forEach((value) => {
          storiesContent += `export const ${
            value.charAt(0).toUpperCase() + value.slice(1)
          }: Story = {\n`;
          storiesContent += `  args: {\n`;
          storiesContent += `    children: "${
            value.charAt(0).toUpperCase() + value.slice(1)
          } ${componentName}",\n`;
          storiesContent += `    ${variantProp.name}: "${value}",\n`;
          storiesContent += `  },\n`;
          storiesContent += `};\n\n`;
        });
      }
    });

    return storiesContent;
  }

  /**
   * Generate documentation content
   */
  private generateDocumentationContent(): string {
    const { componentName, props, variants, events } = this.context;

    let docContent = `# ${componentName} Component\n\n`;
    docContent += `A PatternFly ${componentName} component for Next.js applications.\n\n`;

    // Props documentation
    docContent += `## Props\n\n`;
    docContent += `| Name | Type | Required | Description |\n`;
    docContent += `|------|------|----------|-------------|\n`;

    props.forEach((prop) => {
      docContent += `| ${prop.name} | ${prop.type} | ${
        prop.required ? "Yes" : "No"
      } | ${prop.description || "No description"} |\n`;
    });

    // Variants documentation
    if (variants.length > 0) {
      docContent += `\n## Variants\n\n`;
      variants.forEach((variant) => {
        docContent += `### ${variant.name}\n\n`;
        docContent += `Available values: ${variant.values.join(", ")}\n\n`;
      });
    }

    // Events documentation
    if (events.length > 0) {
      docContent += `\n## Events\n\n`;
      docContent += `| Name | Signature | Description |\n`;
      docContent += `|------|-----------|-------------|\n`;

      events.forEach((event) => {
        docContent += `| ${event.name} | ${event.signature} | ${
          event.inherited ? "Inherited from React.HTMLProps" : "Custom event"
        } |\n`;
      });
    }

    // Usage examples
    docContent += `\n## Usage Examples\n\n`;
    docContent += `\`\`\`tsx\n`;
    docContent += `import { ${componentName} } from "./${componentName.toLowerCase()}";\n\n`;
    docContent += `function MyComponent() {\n`;
    docContent += `  return (\n`;
    docContent += `    <${componentName}>\n`;
    docContent += `      Hello World\n`;
    docContent += `    </${componentName}>\n`;
    docContent += `  );\n`;
    docContent += `}\n`;
    docContent += `\`\`\`\n`;

    return docContent;
  }

  /**
   * Helper methods
   */
  private buildTemplateContext(schema: ComponentSchema): TemplateContext {
    const { schemaObject, componentModel, stateManagement } = schema;
    const componentName = schemaObject.componentName;
    const componentNameLower = componentName.toLowerCase();
    const componentNameKebab = componentName
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .substring(1);

    return {
      componentName,
      componentNameLower,
      componentNameKebab,
      props: schemaObject.props,
      events: schemaObject.events,
      variants: schemaObject.variants,
      hooks: componentModel.hooks.map((h) => h.name),
      state: stateManagement.localState,
      effects: stateManagement.effects,
      imports: componentModel.imports,
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

  private generateFrameworkTemplate(framework: string): string {
    switch (framework) {
      case "nextjs":
        return this.generateNextJSTemplate();
      case "vue":
        return this.generateVueTemplate();
      case "svelte":
        return this.generateSvelteTemplate();
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }
  }

  private generateVueTemplate(): string {
    const { componentName, componentNameLower } = this.context;
    return `<!-- Vue template for ${componentName} -->
<template>
  <div class="${componentNameLower}">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Vue component logic for ${componentName}
</script>`;
  }

  private generateSvelteTemplate(): string {
    const { componentName, componentNameLower } = this.context;
    return `<!-- Svelte template for ${componentName} -->
<div class="${componentNameLower}">
  <slot />
</div>

<script lang="ts">
// Svelte component logic for ${componentName}
</script>`;
  }

  private getFileExtension(framework: string): string {
    switch (framework) {
      case "nextjs":
        return "tsx";
      case "vue":
        return "vue";
      case "svelte":
        return "svelte";
      default:
        return "tsx";
    }
  }

  private getControlType(type: string): string {
    if (type.includes("boolean")) return "boolean";
    if (type.includes("string")) return "text";
    if (type.includes("number")) return "number";
    if (type.includes("React.ReactNode")) return "text";
    return "text";
  }

  private generateTypesContent(): string {
    return this.generateEnhancedPropTypes();
  }

  private generateNextJSConfig(): string {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // PatternFly CSS support
  webpack: (config) => {
    config.module.rules.push({
      test: /\\.css$/,
      use: ["style-loader", "css-loader"],
    });
    return config;
  },
};

module.exports = nextConfig;`;
  }

  private generateVueConfig(): string {
    return `module.exports = {
  // Vue configuration for PatternFly components
};`;
  }

  private generateSvelteConfig(): string {
    return `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  // Svelte configuration for PatternFly components
};`;
  }

  private generateCSSModule(): string {
    const { componentNameLower } = this.context;
    return `.${componentNameLower} {
  /* PatternFly ${componentNameLower} styles */
}`;
  }

  private async writeFile(filename: string, content: string): Promise<void> {
    const { componentName, outputDir } = this.config;
    const componentDir = path.join(outputDir, componentName);
    const filePath = path.join(componentDir, filename);

    // Ensure directory exists
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${filename}`);
  }
}
