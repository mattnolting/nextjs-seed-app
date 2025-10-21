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
  ButtonSchema,
} from "./schema-extractor.types";

/**
 * Main schema extraction orchestrator
 * Extracts component metadata from PatternFly React components
 */
export async function extractComponentSchema(
  sourcePath: string
): Promise<ComponentSchema> {
  try {
    // Parse TypeScript file into AST
    const ast = await parseTypeScriptFile(sourcePath);

    // Extract schema in three phases
    const schemaObject = extractSchemaObject(ast);
    const componentModel = extractComponentModel(ast);
    const stateManagement = extractStateManagement(ast);

    // Create metadata
    const metadata: ExtractionMetadata = {
      sourceFile: sourcePath,
      extractedAt: new Date(),
      version: "1.0.0",
      validation: validateExtractedSchema({
        schemaObject,
        componentModel,
        stateManagement,
        metadata: {} as ExtractionMetadata, // Will be filled below
      }),
    };

    return {
      schemaObject,
      componentModel,
      stateManagement,
      metadata,
    };
  } catch (error) {
    throw new Error(`Schema extraction failed: ${(error as Error).message}`);
  }
}

/**
 * Parse TypeScript file into AST
 */
export async function parseTypeScriptFile(filePath: string): Promise<AST> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${ExtractionError.FILE_NOT_FOUND}: ${filePath}`);
  }

  const sourceCode = fs.readFileSync(filePath, "utf8");

  // Create TypeScript program
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.React,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
  });

  const sourceFile = program.getSourceFile(filePath);
  if (!sourceFile) {
    throw new Error(
      `${ExtractionError.PARSE_ERROR}: Could not parse ${filePath}`
    );
  }

  const checker = program.getTypeChecker();

  return {
    sourceFile,
    program,
    checker,
  };
}

/**
 * Extract framework-agnostic component contract
 */
export function extractSchemaObject(ast: AST): SchemaObject {
  const { sourceFile, checker } = ast;

  // Find the main component interface
  const componentInterface = findComponentInterface(sourceFile, checker);
  if (!componentInterface) {
    throw new Error("Could not find component interface");
  }

  // Extract component name (remove "Props" suffix)
  const interfaceName = componentInterface.name?.text || "Unknown";
  const componentName = interfaceName.replace(/Props$/, "");

  // Extract props
  const props = extractProps(componentInterface, checker);

  // Extract events (onClick, onKeyPress, etc.)
  const events = extractEvents(componentInterface, checker);

  // Extract variants (enums)
  const variants = extractVariants(sourceFile, checker);

  // Extract accessibility attributes
  const accessibility = extractAccessibility(componentInterface, checker);

  return {
    componentName,
    props,
    events,
    variants,
    slots: [], // TODO: Extract slots in future phases
    accessibility,
  };
}

/**
 * Extract React-specific implementation details
 */
export function extractComponentModel(ast: AST): ComponentModel {
  const { sourceFile, checker } = ast;

  // Determine component type (functional vs class)
  const componentType = determineComponentType(sourceFile);

  // Extract hooks usage
  const hooks = extractHooks(sourceFile, checker);

  // Extract refs
  const refs = extractRefs(sourceFile, checker);

  // Extract context usage
  const context = extractContext(sourceFile, checker);

  // Extract imports
  const imports = extractImports(sourceFile);

  return {
    type: componentType,
    forwardRef: hasForwardRef(sourceFile),
    hooks,
    refs,
    context,
    imports,
  };
}

/**
 * Extract state management patterns
 */
export function extractStateManagement(ast: AST): StateManagement {
  const { sourceFile, checker } = ast;

  // Extract local state (useState)
  const localState = extractLocalState(sourceFile, checker);

  // Extract context state
  const contextState = extractContextState(sourceFile, checker);

  // Extract effects (useEffect)
  const effects = extractEffects(sourceFile, checker);

  // Extract derived state
  const derivedState = extractDerivedState(sourceFile, checker);

  return {
    localState,
    contextState,
    effects,
    derivedState,
  };
}

/**
 * Validate extracted schema
 */
export function validateExtractedSchema(
  schema: ComponentSchema
): ValidationResult {
  const errors: any[] = [];
  const warnings: any[] = [];

  // Basic validation
  if (!schema.schemaObject.componentName) {
    errors.push({
      code: "MISSING_COMPONENT_NAME",
      message: "Component name is required",
    });
  }

  if (schema.schemaObject.props.length === 0) {
    warnings.push({
      code: "NO_PROPS_FOUND",
      message: "No props found in component",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Helper functions for extraction

function findComponentInterface(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): ts.InterfaceDeclaration | null {
  let componentInterface: ts.InterfaceDeclaration | null = null;

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text;
      if (name.endsWith("Props")) {
        componentInterface = node;
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return componentInterface;
}

function extractProps(
  interfaceNode: ts.InterfaceDeclaration,
  checker: ts.TypeChecker
): any[] {
  const props: any[] = [];

  interfaceNode.members.forEach((member) => {
    if (ts.isPropertySignature(member)) {
      const name = member.name?.getText() || "";
      const type = member.type?.getText() || "any";
      const required = !member.questionToken;
      const category = categorizeProp(name, type);

      props.push({
        name,
        type,
        required,
        category,
        description: extractJSDocDescription(member),
      });
    }
  });

  return props;
}

function categorizeProp(name: string, type: string): string {
  // Core props - essential functionality
  if (["children", "className", "id", "key", "ref"].includes(name)) {
    return "core";
  }

  // Styling props
  if (
    name.includes("style") ||
    name.includes("size") ||
    name.includes("variant") ||
    name.includes("color") ||
    name.includes("theme") ||
    name.includes("appearance")
  ) {
    return "styling";
  }

  // Accessibility props
  if (
    name.startsWith("aria-") ||
    name.startsWith("role") ||
    name.startsWith("tabIndex") ||
    name.includes("label") ||
    name.includes("description") ||
    name.includes("ouia")
  ) {
    return "accessibility";
  }

  // Event props
  if (name.startsWith("on") && name.length > 2) {
    return "events";
  }

  // Boolean state props (is*, has*, can*)
  if (name.match(/^(is|has|can|should|will)[A-Z]/)) {
    return "advanced";
  }

  // Advanced/Complex props
  if (
    type.includes("React.ReactNode") ||
    type.includes("React.ElementType") ||
    type.includes("React.ComponentType") ||
    type.includes("Function") ||
    type.includes("Object") ||
    type.includes("Array")
  ) {
    return "advanced";
  }

  // Default to core for simple props
  return "core";
}

function extractEvents(
  interfaceNode: ts.InterfaceDeclaration,
  checker: ts.TypeChecker
): any[] {
  const events: any[] = [];

  // Extract explicit event handlers from interface
  interfaceNode.members.forEach((member) => {
    if (ts.isPropertySignature(member)) {
      const name = member.name?.getText() || "";
      if (name.startsWith("on") && name.length > 2) {
        const type = member.type?.getText() || "any";
        events.push({
          name,
          signature: type,
          description: extractJSDocDescription(member),
        });
      }
    }
  });

  // Extract inherited event handlers from React.HTMLProps
  const inheritedEvents = extractInheritedEvents(interfaceNode, checker);
  events.push(...inheritedEvents);

  return events;
}

function extractInheritedEvents(
  interfaceNode: ts.InterfaceDeclaration,
  checker: ts.TypeChecker
): any[] {
  const events: any[] = [];

  // Common React event handlers that are typically inherited
  const commonEvents = [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLElement>) => void",
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLElement>) => void",
    },
    {
      name: "onKeyUp",
      signature: "(event: React.KeyboardEvent<HTMLElement>) => void",
    },
    {
      name: "onKeyPress",
      signature: "(event: React.KeyboardEvent<HTMLElement>) => void",
    },
    {
      name: "onMouseEnter",
      signature: "(event: React.MouseEvent<HTMLElement>) => void",
    },
    {
      name: "onMouseLeave",
      signature: "(event: React.MouseEvent<HTMLElement>) => void",
    },
    {
      name: "onFocus",
      signature: "(event: React.FocusEvent<HTMLElement>) => void",
    },
    {
      name: "onBlur",
      signature: "(event: React.FocusEvent<HTMLElement>) => void",
    },
    {
      name: "onChange",
      signature: "(event: React.ChangeEvent<HTMLElement>) => void",
    },
    {
      name: "onSubmit",
      signature: "(event: React.FormEvent<HTMLElement>) => void",
    },
    {
      name: "onLoad",
      signature: "(event: React.SyntheticEvent<HTMLElement>) => void",
    },
    {
      name: "onError",
      signature: "(event: React.SyntheticEvent<HTMLElement>) => void",
    },
  ];

  // Check if interface extends React.HTMLProps or similar
  const extendsReactProps = interfaceNode.heritageClauses?.some((clause) =>
    clause.types.some((type) => {
      const typeText = type.getText();
      return (
        typeText.includes("React.HTMLProps") ||
        typeText.includes("React.ButtonHTMLAttributes") ||
        typeText.includes("React.InputHTMLAttributes")
      );
    })
  );

  if (extendsReactProps) {
    // Add common events that are inherited
    events.push(
      ...commonEvents.map((event) => ({
        ...event,
        description: "Inherited from React.HTMLProps",
        inherited: true,
      }))
    );
  }

  return events;
}

function extractVariants(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const variants: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isEnumDeclaration(node)) {
      const name = node.name.text;
      if (
        name.includes("Variant") ||
        name.includes("Size") ||
        name.includes("Type")
      ) {
        const values = node.members.map((member) => {
          if (member.initializer && ts.isStringLiteral(member.initializer)) {
            return member.initializer.text;
          }
          if (ts.isIdentifier(member.name)) {
            return member.name.text;
          }
          return member.name.getText();
        });

        variants.push({
          name,
          values,
          type: "enum",
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return variants;
}

function extractAccessibility(
  interfaceNode: ts.InterfaceDeclaration,
  checker: ts.TypeChecker
): any {
  const accessibility: any = {};

  interfaceNode.members.forEach((member) => {
    if (ts.isPropertySignature(member)) {
      const name = member.name?.getText() || "";
      if (name.startsWith("aria-") || name === "role") {
        accessibility[name] = member.type?.getText() || "string";
      }
    }
  });

  return accessibility;
}

function determineComponentType(
  sourceFile: ts.SourceFile
): "functional" | "class" {
  let isClass = false;

  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
      isClass = true;
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return isClass ? "class" : "functional";
}

function extractHooks(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const hooks: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression)) {
        const hookName = expression.text;
        if (hookName.startsWith("use")) {
          hooks.push({
            name: hookName,
            dependencies: extractHookDependencies(node),
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hooks;
}

function extractHookDependencies(node: ts.CallExpression): string[] {
  const dependencies: string[] = [];

  if (node.arguments.length > 1) {
    const depsNode = node.arguments[1];
    if (ts.isArrayLiteralExpression(depsNode)) {
      depsNode.elements.forEach((element) => {
        if (ts.isIdentifier(element)) {
          dependencies.push(element.text);
        }
      });
    }
  }

  return dependencies;
}

function extractRefs(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const refs: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.text === "useRef") {
        // Extract ref name and type
        const refName = "ref"; // Default, could be improved
        refs.push({
          name: refName,
          type: "React.RefObject<any>",
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return refs;
}

function extractContext(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const context: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isPropertyAccessExpression(node)) {
      const name = node.name.text;
      if (name === "Provider" || name === "Consumer") {
        const contextName = node.expression.getText();
        context.push({
          name: contextName,
          provider: name === "Provider" ? contextName : undefined,
          consumer: name === "Consumer" ? contextName : undefined,
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return context;
}

function extractImports(sourceFile: ts.SourceFile): any[] {
  const imports: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const source = node.moduleSpecifier.getText().replace(/['"]/g, "");
      const names: string[] = [];

      if (node.importClause) {
        if (node.importClause.name) {
          names.push(node.importClause.name.text);
        }
        if (node.importClause.namedBindings) {
          if (ts.isNamedImports(node.importClause.namedBindings)) {
            node.importClause.namedBindings.elements.forEach((element) => {
              names.push(element.name.text);
            });
          }
        }
      }

      imports.push({
        source,
        names,
        isDefault: !!node.importClause?.name,
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return imports;
}

function hasForwardRef(sourceFile: ts.SourceFile): boolean {
  let hasForwardRef = false;

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.text === "forwardRef") {
        hasForwardRef = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hasForwardRef;
}

function extractLocalState(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const localState: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.text === "useState") {
        // Extract state name and type
        const stateName = "state"; // Default, could be improved
        localState.push({
          name: stateName,
          type: "any",
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return localState;
}

function extractContextState(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  // TODO: Implement context state extraction
  return [];
}

function extractEffects(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  const effects: any[] = [];

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.text === "useEffect") {
        const dependencies = extractHookDependencies(node);
        effects.push({
          name: "useEffect",
          dependencies,
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return effects;
}

function extractDerivedState(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
): any[] {
  // TODO: Implement derived state extraction
  return [];
}

function extractJSDocDescription(node: ts.Node): string | undefined {
  const jsDocTags = ts.getJSDocTags(node);
  if (jsDocTags.length > 0) {
    return jsDocTags[0].comment?.toString() || undefined;
  }
  return undefined;
}
