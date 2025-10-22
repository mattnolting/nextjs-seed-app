# PatternFly Next.js Starter Generator

## Vision

An intelligent component generation system that extracts PatternFly React component schemas and generates production-ready Next.js implementations. Built with a framework-agnostic architecture that enables future extensibility while focusing on Next.js integration for PatternFly's modernization initiative.

## Core Principles

- **Next.js Focused**: Optimized for Next.js development with modern React patterns
- **PatternFly Aligned**: Direct integration with PatternFly React component library
- **Schema-Driven**: Component schemas abstracted from implementation details
- **TypeScript First**: Type-safe component generation with comprehensive type definitions
- **Template-Based**: Separation of schema from rendering logic for maintainability
- **Extensible Architecture**: Framework-agnostic design enables future expansion

## Project Goals

1. Extract PatternFly React component schemas into structured metadata
2. Generate production-ready Next.js components with enhanced templates
3. Provide comprehensive testing, documentation, and Storybook integration
4. Enable interactive CLI for component selection and generation
5. Support PatternFly's modernization initiative with official Next.js tooling
6. Maintain extensible architecture for potential future framework support

## Architecture Overview

### Core Modules

```
/modules
  /schema-extractor     # Extract PatternFly component schemas
  /template-engine      # Enhanced Next.js template generation
  /component-isolation  # Component-specific schema organization
  /cli                  # Interactive command-line interface
```

### Data Flow

```
PatternFly React → Schema Extraction → Component Isolation → Enhanced Templates → Next.js Components
```

## Technology Stack

- **Language**: TypeScript
- **Target Framework**: Next.js with App Router
- **Component Library**: PatternFly React
- **Testing**: Jest with React Testing Library
- **Documentation**: Storybook with interactive stories
- **CLI**: Interactive command-line interface
- **Architecture**: Component isolation with framework-agnostic schemas

## Development Status

🟢 **Production Ready** - Core functionality implemented

### Completed

- [x] Schema extraction from PatternFly React components
- [x] Component isolation architecture
- [x] Enhanced template generation for Next.js
- [x] Interactive CLI interface
- [x] Comprehensive testing and documentation
- [x] TypeScript type definitions
- [x] Storybook integration
- [x] Component categorization and validation

### Features

- **Schema Extraction**: Parse PatternFly React components into structured metadata
- **Component Isolation**: Self-contained component schemas with templates
- **Enhanced Templates**: Production-ready Next.js components with:
  - Organized prop interfaces (Core, Styling, Accessibility, Advanced)
  - Comprehensive unit tests
  - Interactive Storybook stories
  - Complete documentation
  - TypeScript type definitions
- **Interactive CLI**: User-friendly component selection and generation
- **Framework Agnostic**: Extensible architecture for future framework support

## Getting Started

### Prerequisites

- Node.js 18+
- Access to PatternFly React source code
- TypeScript knowledge

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nextjs-seed-app

# Install dependencies
npm install

# Run tests
npm test
```

### Usage

#### Interactive CLI

```bash
# Start the interactive CLI
npm run cli

# Follow the prompts to:
# 1. Select framework (Next.js)
# 2. Choose components (Button, Alert, Form, etc.)
# 3. Configure generation options
# 4. Generate production-ready components
```

#### Programmatic Usage

```typescript
import { extractComponentSchema } from "./modules/schema-extractor/schema-extractor";
import { EnhancedTemplateGenerator } from "./modules/template-engine/enhanced-template-generator";

// Extract schema from PatternFly component
const schema = await extractComponentSchema("/path/to/Button.tsx");

// Generate Next.js component
const generator = new EnhancedTemplateGenerator(
  {
    framework: "nextjs",
    componentName: "Button",
    includeTests: true,
    includeStories: true,
    includeTypes: true,
    includeDocumentation: true,
    outputDir: "./components",
  },
  schema
);

await generator.generateAll();
```

### Generated Output

Each component generates a complete file structure:

```
/components/Button/
├── button.tsx              # Next.js component
├── button.types.ts         # TypeScript definitions
├── button.test.tsx         # Unit tests
├── button.stories.tsx      # Storybook stories
├── button.md              # Documentation
├── button.module.css      # CSS module
└── next.config.js         # Next.js configuration
```

## PatternFly Modernization Initiative

This project directly supports PatternFly's modernization initiative by providing:

- **Reduced Development Overhead**: Automated component generation vs manual implementation
- **Consistent Implementations**: Standardized Next.js component structure
- **Official Next.js Support**: Production-ready Next.js starter components
- **Enhanced Developer Experience**: Interactive CLI and comprehensive documentation
- **Framework Flexibility**: Extensible architecture for future framework support

## Contributing

Follow the workflow defined in [WORKFLOW.md](./WORKFLOW.md)

## Documentation

- [WORKFLOW.md](./WORKFLOW.md) - Development process and standards
- [HANDOFF.md](./HANDOFF.md) - Session-to-session knowledge retention
- Module-specific guides in `/modules/{module-name}/MODULE.GUIDE.md`

## License

_(TBD)_

## Contact

Project maintained by: Matthew Nolting
