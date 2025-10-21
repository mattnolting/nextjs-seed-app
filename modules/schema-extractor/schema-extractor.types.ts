// TypeScript type definitions for schema extraction

import * as ts from "typescript";

export interface ComponentSchema {
  schemaObject: SchemaObject; // Framework-agnostic component contract
  componentModel: ComponentModel; // React-specific implementation details
  stateManagement: StateManagement; // State patterns and lifecycle
  metadata: ExtractionMetadata; // Source info, timestamps, validation
}

export interface SchemaObject {
  componentName: string;
  description?: string;
  props: PropDefinition[];
  events: EventDefinition[];
  variants: VariantDefinition[];
  slots: SlotDefinition[];
  accessibility: A11yDefinition;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
  isOptional?: boolean;
  category?: PropCategory;
}

export type PropCategory =
  | "core"
  | "styling"
  | "accessibility"
  | "advanced"
  | "events"
  | "unknown";

export interface EventDefinition {
  name: string;
  signature: string;
  description?: string;
  inherited?: boolean;
}

export interface VariantDefinition {
  name: string;
  values: string[];
  type: "enum" | "union" | "literal";
}

export interface SlotDefinition {
  name: string;
  type: string;
  description?: string;
}

export interface A11yDefinition {
  ariaLabel?: string;
  ariaDisabled?: string;
  role?: string;
  [key: string]: string | undefined;
}

export interface ComponentModel {
  type: "functional" | "class";
  forwardRef: boolean;
  hooks: HookDefinition[];
  refs: RefDefinition[];
  context: ContextDefinition[];
  imports: ImportDefinition[];
  lifecycle?: LifecycleMethod[]; // for class components
}

export interface HookDefinition {
  name: string;
  dependencies?: string[];
  description?: string;
}

export interface RefDefinition {
  name: string;
  type: string;
  description?: string;
}

export interface ContextDefinition {
  name: string;
  provider?: string;
  consumer?: string;
}

export interface ImportDefinition {
  source: string;
  names: string[];
  isDefault?: boolean;
}

export interface LifecycleMethod {
  name: string;
  signature: string;
  description?: string;
}

export interface StateManagement {
  localState: StateDefinition[];
  contextState: ContextStateDefinition[];
  effects: EffectDefinition[];
  derivedState: DerivedStateDefinition[];
}

export interface StateDefinition {
  name: string;
  type: string;
  defaultValue?: any;
  description?: string;
}

export interface ContextStateDefinition {
  name: string;
  type: string;
  provider?: string;
  consumer?: string;
}

export interface EffectDefinition {
  name: string;
  dependencies: string[];
  description?: string;
}

export interface DerivedStateDefinition {
  name: string;
  logic: string;
  dependencies: string[];
  description?: string;
}

export interface ExtractionMetadata {
  sourceFile: string;
  extractedAt: Date;
  version: string;
  validation: ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  path?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  path?: string;
}

export enum ExtractionError {
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  PARSE_ERROR = "PARSE_ERROR",
  TYPE_RESOLUTION_ERROR = "TYPE_RESOLUTION_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

// AST-related types
export interface AST {
  sourceFile: ts.SourceFile;
  program: ts.Program;
  checker: ts.TypeChecker;
}

// Button-specific types for our prototype
export interface ButtonSchema extends ComponentSchema {
  schemaObject: ButtonSchemaObject;
}

export interface ButtonSchemaObject extends SchemaObject {
  componentName: "Button";
  variants: ButtonVariantDefinition[];
}

export interface ButtonVariantDefinition extends VariantDefinition {
  name: "ButtonVariant" | "ButtonSize" | "ButtonType" | "ButtonState";
  values: string[];
}
