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

🟡 **Foundation Complete** - Core architecture implemented, Next.js app pending

### Completed Foundation

- [x] Schema extraction from PatternFly React components
- [x] Component isolation architecture
- [x] Enhanced template generation for Next.js
- [x] Interactive CLI interface
- [x] Comprehensive testing and documentation
- [x] TypeScript type definitions
- [x] Storybook integration
- [x] Component categorization and validation

### Next Steps (In Progress)

- [ ] **Functional Next.js App**: Complete Next.js application with App Router
- [ ] **Layout Scaffolding**: Component injection system and layout templates
- [ ] **Component Integration**: Seamless integration of generated components
- [ ] **Build System**: Production build configuration and optimization
- [ ] **Deployment Ready**: Production deployment configuration

### Roadmap to Production

#### Phase 1: Next.js Application Foundation

- [ ] **Next.js App Setup**: App Router configuration and basic structure
- [ ] **PatternFly Integration**: CSS and styling system integration
- [ ] **Component Library**: Generated components as importable library
- [ ] **Basic Routing**: Page structure and navigation

#### Phase 2: Layout Scaffolding System

- [ ] **Layout Templates**: Page layout templates with component injection points
- [ ] **Component Injection**: Dynamic component loading and rendering
- [ ] **Layout Variants**: Different layout patterns (dashboard, content, etc.)
- [ ] **Responsive Design**: Mobile-first responsive layout system

#### Phase 3: Production Features

- [ ] **Build Optimization**: Production build configuration
- [ ] **Performance**: Code splitting and optimization
- [ ] **Deployment**: Vercel/Netlify deployment configuration
- [ ] **Documentation**: Complete user documentation and examples

## Getting Started

> **Note**: This project is currently in the foundation phase. The component generation system is complete, but the Next.js application and layout scaffolding are still in development.

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

### Current Usage (Component Generation Only)

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

### Coming Soon

- **Next.js Application**: Complete Next.js app with App Router
- **Layout Scaffolding**: Component injection system
- **Production Build**: Optimized build configuration
- **Deployment**: Production deployment setup

## PatternFly Modernization Initiative

This project directly supports PatternFly's modernization initiative by providing:

- **Reduced Development Overhead**: Automated component generation vs manual implementation
- **Consistent Implementations**: Standardized Next.js component structure
- **Official Next.js Support**: Production-ready Next.js starter components
- **Enhanced Developer Experience**: Interactive CLI and comprehensive documentation
- **Framework Flexibility**: Extensible architecture for future framework support

## Contributing

Follow the workflow defined in [WORKFLOW.md](./docs/WORKFLOW.md)

## Documentation

- [WORKFLOW.md](./docs/WORKFLOW.md) - Development process and standards
- [HANDOFF.md](./docs/HANDOFF.md) - Session-to-session knowledge retention
- Module-specific guides in `/docs/modules/{module-name}/`

## License

_(TBD)_

## Contact

Project maintained by: Matthew Nolting
