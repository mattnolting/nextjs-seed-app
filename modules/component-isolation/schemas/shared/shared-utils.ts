// Shared utilities for component isolation system

export interface SharedPatternFlyTypes {
  // Common PatternFly types
  OUIAProps: {
    ouiaId?: number | string;
    ouiaSafe?: boolean;
  };

  // Common variant types
  CommonVariants: {
    size: "sm" | "md" | "lg" | "xl";
    variant:
      | "primary"
      | "secondary"
      | "tertiary"
      | "danger"
      | "warning"
      | "info"
      | "success";
  };

  // Common event types
  CommonEvents: {
    onClick: "(event: React.MouseEvent<HTMLElement>) => void";
    onKeyDown: "(event: React.KeyboardEvent<HTMLElement>) => void";
    onFocus: "(event: React.FocusEvent<HTMLElement>) => void";
    onBlur: "(event: React.FocusEvent<HTMLElement>) => void";
  };
}

export interface ComponentDependency {
  componentName: string;
  version: string;
  required: boolean;
  type: "peer" | "dependency" | "devDependency";
}

export interface ComponentMetadata {
  name: string;
  version: string;
  description: string;
  category: "layout" | "form" | "navigation" | "feedback" | "data" | "utility";
  dependencies: ComponentDependency[];
  patterns: {
    ouia: boolean;
    aria: boolean;
    variants: boolean;
    state: boolean;
    effects: boolean;
  };
}

export interface ValidationRule {
  name: string;
  type: "required" | "type" | "pattern" | "custom";
  value?: any;
  message: string;
}

export interface ComponentValidationRules {
  componentName: string;
  rules: ValidationRule[];
  patterns: {
    ouia: string[];
    aria: string[];
    boolean: string[];
  };
}

/**
 * Generate shared PatternFly types
 */
export function generateSharedPatternFlyTypes(): string {
  return `// Shared PatternFly types for component isolation

export interface OUIAProps {
  /** Value to overwrite the randomly generated data-ouia-component-id */
  ouiaId?: number | string;
  /** Set the value of data-ouia-safe */
  ouiaSafe?: boolean;
}

export type PatternFlySize = "sm" | "md" | "lg" | "xl";
export type PatternFlyVariant = "primary" | "secondary" | "tertiary" | "danger" | "warning" | "info" | "success";

export interface PatternFlyCommonProps extends OUIAProps {
  /** Additional classes */
  className?: string;
  /** Content */
  children?: React.ReactNode;
  /** Unique identifier */
  id?: string;
}

export interface PatternFlyCommonEvents {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

export interface PatternFlyCommonState {
  isVisible?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

// Common validation patterns
export const PatternFlyValidationPatterns = {
  ouia: /^ouia[A-Z]/,
  aria: /^aria-/,
  boolean: /^(is|has|can|should|will)[A-Z]/,
  event: /^on[A-Z]/,
} as const;

// Common CSS class patterns
export const PatternFlyCSSPatterns = {
  modifier: (base: string, modifier: string) => \`\${base}--\${modifier}\`,
  element: (base: string, element: string) => \`\${base}__\${element}\`,
  variant: (base: string, variant: string) => \`\${base}--\${variant}\`,
} as const;
`;
}

/**
 * Generate shared validation rules
 */
export function generateSharedValidationRules(): ComponentValidationRules {
  return {
    componentName: "shared",
    rules: [
      {
        name: "ouiaId",
        type: "pattern",
        value: /^(number|string)$/,
        message: "OUIA ID must be a number or string",
      },
      {
        name: "ouiaSafe",
        type: "type",
        value: "boolean",
        message: "OUIA Safe must be a boolean",
      },
      {
        name: "className",
        type: "type",
        value: "string",
        message: "ClassName must be a string",
      },
      {
        name: "children",
        type: "type",
        value: "React.ReactNode",
        message: "Children must be React.ReactNode",
      },
    ],
    patterns: {
      ouia: ["ouiaId", "ouiaSafe"],
      aria: ["aria-label", "aria-describedby", "aria-labelledby"],
      boolean: ["isVisible", "isDisabled", "isLoading"],
    },
  };
}

/**
 * Generate shared template utilities
 */
export function generateSharedTemplateUtils(): string {
  return `// Shared template utilities for component generation

export interface TemplateConfig {
  framework: "nextjs" | "vue" | "svelte";
  componentName: string;
  includeTests: boolean;
  includeStories: boolean;
  includeTypes: boolean;
}

export interface TemplateContext {
  componentName: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    category: string;
    description?: string;
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
}

export function generateImportStatements(context: TemplateContext, framework: string): string {
  switch (framework) {
    case "nextjs":
      return \`import { forwardRef } from "react";
import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/\${context.componentName}/\${context.componentName.toLowerCase()}";\`;

    case "vue":
      return \`<script setup lang="ts">
import { computed, ref } from "vue";\`;

    case "svelte":
      return \`<script lang="ts">
import { onMount } from "svelte";\`;

    default:
      throw new Error(\`Unsupported framework: \${framework}\`);
  }
}

export function generatePropTypes(context: TemplateContext, framework: string): string {
  switch (framework) {
    case "nextjs":
      return \`export interface \${context.componentName}Props {
\${context.props.map(prop => \`  \${prop.name}\${prop.required ? "" : "?"}: \${prop.type};\`).join("\\n")}
}\`;

    case "vue":
      return \`interface Props {
\${context.props.map(prop => \`  \${prop.name}\${prop.required ? "" : "?"}: \${prop.type};\`).join("\\n")}
}\`;

    case "svelte":
      return \`export let \${context.props.map(prop => \`\${prop.name}: \${prop.type}\`).join(", ")};\`;

    default:
      throw new Error(\`Unsupported framework: \${framework}\`);
  }
}

export function generateCSSClasses(context: TemplateContext): string {
  const baseClass = context.componentName.toLowerCase();
  const variantClasses = context.variants.map(variant =>
    \`\${variant.name.toLowerCase()}: \${variant.values.map(value => \`\${baseClass}--\${value}\`).join(" | ")}\`
  ).join("\\n");

  return \`const baseClass = "\${baseClass}";
const variantClasses = {
\${variantClasses}
};\`;
}

export function generateEventHandlers(context: TemplateContext, framework: string): string {
  const explicitEvents = context.events.filter(e => !e.inherited);

  switch (framework) {
    case "nextjs":
      return explicitEvents.map(event =>
        \`  const handle\${event.name.charAt(2).toUpperCase() + event.name.slice(3)} = (event: React.SyntheticEvent) => {\n    \${event.name}?.(event);\n  };\`
      ).join("\\n");

    case "vue":
      return explicitEvents.map(event =>
        \`  const handle\${event.name.charAt(2).toUpperCase() + event.name.slice(3)} = (event: Event) => {\n    emit("\${event.name}", event);\n  };\`
      ).join("\\n");

    case "svelte":
      return explicitEvents.map(event =>
        \`  function handle\${event.name.charAt(2).toUpperCase() + event.name.slice(3)}(event: Event) {\n    \${event.name}?.(event);\n  }\`
      ).join("\\n");

    default:
      throw new Error(\`Unsupported framework: \${framework}\`);
  }
}
`;
}

/**
 * Generate component metadata
 */
export function generateComponentMetadata(
  componentName: string,
  schema: any
): ComponentMetadata {
  const { schemaObject, componentModel, stateManagement } = schema;

  return {
    name: componentName,
    version: "1.0.0",
    description: `PatternFly ${componentName} component`,
    category: determineComponentCategory(componentName, schemaObject),
    dependencies: generateDependencies(componentModel),
    patterns: {
      ouia: schemaObject.props.some((p: any) => p.name.includes("ouia")),
      aria: schemaObject.props.some((p: any) => p.name.startsWith("aria")),
      variants: schemaObject.variants.length > 0,
      state: stateManagement.localState.length > 0,
      effects: stateManagement.effects.length > 0,
    },
  };
}

function determineComponentCategory(
  componentName: string,
  schemaObject: any
): "layout" | "form" | "navigation" | "feedback" | "data" | "utility" {
  const name = componentName.toLowerCase();

  if (
    name.includes("form") ||
    name.includes("input") ||
    name.includes("select")
  ) {
    return "form";
  }
  if (
    name.includes("nav") ||
    name.includes("menu") ||
    name.includes("breadcrumb")
  ) {
    return "navigation";
  }
  if (
    name.includes("alert") ||
    name.includes("notification") ||
    name.includes("toast")
  ) {
    return "feedback";
  }
  if (
    name.includes("table") ||
    name.includes("list") ||
    name.includes("card")
  ) {
    return "data";
  }
  if (
    name.includes("page") ||
    name.includes("layout") ||
    name.includes("container")
  ) {
    return "layout";
  }

  return "utility";
}

function generateDependencies(componentModel: any): ComponentDependency[] {
  const dependencies: ComponentDependency[] = [];

  // Add React dependency
  dependencies.push({
    componentName: "react",
    version: "^18.0.0",
    required: true,
    type: "peer",
  });

  // Add PatternFly dependencies
  dependencies.push({
    componentName: "@patternfly/react-styles",
    version: "^5.0.0",
    required: true,
    type: "dependency",
  });

  // Add TypeScript dependency
  dependencies.push({
    componentName: "@types/react",
    version: "^18.0.0",
    required: true,
    type: "devDependency",
  });

  return dependencies;
}
