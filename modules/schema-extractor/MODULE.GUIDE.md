# Schema Extractor Module Guide

## Purpose and Goals

The Schema Extractor module is the foundational component of the PatternFly Next.js Starter Generator. It extracts component metadata from PatternFly React components and transforms it into structured schemas that can be used to generate Next.js implementations.

**Primary Goal**: Extract Button component metadata from PatternFly React and create a framework-agnostic schema that enables Next.js starter generation.

**Strategic Alignment**: This module directly serves PatternFly's modernization initiative by providing the tooling foundation for official Next.js starter applications.

## API Surface Area

### Core Functions

```typescript
// Main extraction orchestrator
extractComponentSchema(sourcePath: string): Promise<ComponentSchema>

// Individual extraction phases
extractSchemaObject(componentAST: AST): SchemaObject
extractComponentModel(componentAST: AST): ComponentModel
extractStateManagement(componentAST: AST): StateManagement

// Utility functions
parseTypeScriptFile(filePath: string): Promise<AST>
validateExtractedSchema(schema: ComponentSchema): ValidationResult
```

### Input/Output Contracts

**Input**:

- PatternFly React component file path (e.g., `/path/to/Button.tsx`)
- TypeScript source code with proper type definitions

**Output**:

```typescript
interface ComponentSchema {
  schemaObject: SchemaObject; // Framework-agnostic component contract
  componentModel: ComponentModel; // React-specific implementation details
  stateManagement: StateManagement; // State patterns and lifecycle
  metadata: ExtractionMetadata; // Source info, timestamps, validation
}
```

## Integration Points

### Dependencies

- **TypeScript Compiler API** - AST parsing and type extraction
- **PatternFly React** - Source component library
- **Next.js** - Target framework for generation

### Dependents

- **Template Engine** - Consumes schemas to generate Next.js components
- **CLI Interface** - Orchestrates extraction workflow
- **Validation Module** - Validates extracted schemas

## Examples and Use Cases

### Primary Use Case: Button Component Extraction

```typescript
// Extract Button component schema
const buttonSchema = await extractComponentSchema(
  "/patternfly-react/src/components/Button/Button.tsx"
);

// Result includes:
// - Props interface (ButtonProps)
// - Variant enums (ButtonVariant, ButtonSize, ButtonType)
// - Event handlers (onClick, onKeyPress)
// - React patterns (forwardRef, hooks usage)
// - State management (loading states, disabled states)
```

### Expected Output Structure

```typescript
{
  schemaObject: {
    componentName: "Button",
    props: [
      { name: "variant", type: "ButtonVariant", required: false, defaultValue: "primary" },
      { name: "size", type: "ButtonSize", required: false, defaultValue: "default" },
      { name: "isDisabled", type: "boolean", required: false, defaultValue: false },
      // ... all ButtonProps
    ],
    events: [
      { name: "onClick", signature: "(event: React.MouseEvent<HTMLButtonElement>) => void" },
      { name: "onKeyPress", signature: "(event: React.KeyboardEvent<HTMLButtonElement>) => void" }
    ],
    variants: [
      { name: "ButtonVariant", values: ["primary", "secondary", "tertiary", "danger", "warning", "link", "plain", "control", "stateful"] },
      { name: "ButtonSize", values: ["default", "sm", "lg"] },
      { name: "ButtonType", values: ["button", "submit", "reset"] }
    ],
    accessibility: {
      ariaLabel: "aria-label",
      ariaDisabled: "aria-disabled",
      role: "role"
    }
  },
  componentModel: {
    type: "functional",
    forwardRef: true,
    hooks: ["useOUIAProps"],
    imports: [
      { source: "react", names: ["forwardRef"] },
      { source: "@patternfly/react-styles", names: ["css"] },
      { source: "@patternfly/react-styles/css/components/Button/button", names: ["default as styles"] }
    ]
  },
  stateManagement: {
    localState: [], // Button is stateless
    effects: [],    // No useEffect in Button
    derivedState: [
      { name: "shouldRenderAriaDisabled", logic: "isAriaDisabled || (!isButtonElement && isDisabled)" }
    ]
  }
}
```

## Usage Patterns

### Basic Extraction

```typescript
import { extractComponentSchema } from "./schema-extractor";

const schema = await extractComponentSchema("./Button.tsx");
console.log(schema.schemaObject.componentName); // "Button"
```

### Validation Integration

```typescript
import {
  extractComponentSchema,
  validateExtractedSchema,
} from "./schema-extractor";

const schema = await extractComponentSchema("./Button.tsx");
const validation = validateExtractedSchema(schema);

if (!validation.isValid) {
  console.error("Schema validation failed:", validation.errors);
}
```

### Error Handling

```typescript
try {
  const schema = await extractComponentSchema("./Button.tsx");
} catch (error) {
  if (error.code === "FILE_NOT_FOUND") {
    console.error("Component file not found");
  } else if (error.code === "PARSE_ERROR") {
    console.error("TypeScript parsing failed:", error.details);
  }
}
```

## Known Limitations

### Phase 1 Limitations (Button Focus)

- **Single Component**: Only extracts Button component initially
- **No Composition**: Doesn't handle compound components (Button + ButtonIcon)
- **Limited Context**: Doesn't extract React Context usage patterns
- **No Lifecycle**: Focuses on functional components only

### Technical Limitations

- **TypeScript Only**: Requires TypeScript source files
- **PatternFly Specific**: Optimized for PatternFly React patterns
- **Static Analysis**: Cannot extract runtime behavior
- **Import Resolution**: Limited import path resolution

## Future Extensions

### Phase 2: Expanded Component Support

- Alert component (state management, effects)
- Form components (compound patterns)
- Modal component (class components, lifecycle)

### Phase 3: Advanced Features

- Compound component extraction
- Context pattern recognition
- Custom hook detection
- CSS-in-JS pattern extraction

## Testing Strategy

### Unit Tests

- **AST Parsing**: Test TypeScript file parsing
- **Schema Extraction**: Test individual extraction phases
- **Validation**: Test schema validation logic
- **Error Handling**: Test error conditions

### Integration Tests

- **End-to-End**: Full Button component extraction
- **PatternFly Integration**: Test with actual PatternFly components
- **Next.js Generation**: Test schema → Next.js component flow

### Test Data

- **Button.tsx**: Primary test component
- **Mock Components**: Simplified test cases
- **Error Cases**: Malformed TypeScript, missing types

## Performance Considerations

### Optimization Targets

- **Parse Time**: < 100ms for Button component
- **Memory Usage**: < 50MB for extraction process
- **Schema Size**: < 10KB for Button schema

### Caching Strategy

- **AST Caching**: Cache parsed ASTs for unchanged files
- **Schema Caching**: Cache extracted schemas
- **Type Cache**: Cache resolved TypeScript types

## Error Handling

### Error Types

```typescript
enum ExtractionError {
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  PARSE_ERROR = "PARSE_ERROR",
  TYPE_RESOLUTION_ERROR = "TYPE_RESOLUTION_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}
```

### Error Recovery

- **Graceful Degradation**: Extract partial schema on errors
- **Detailed Logging**: Log extraction steps for debugging
- **User-Friendly Messages**: Clear error messages for CLI users

## Dependencies and Requirements

### Runtime Dependencies

- `typescript` - TypeScript compiler API
- `@types/node` - Node.js type definitions

### Development Dependencies

- `jest` - Testing framework
- `@types/jest` - Jest type definitions
- `ts-node` - TypeScript execution

### System Requirements

- Node.js 18+
- TypeScript 5.0+
- Access to PatternFly React source code
