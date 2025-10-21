# NextJS Seed App - Framework-Agnostic Component Generation System

## Vision

An intelligent seed application system that extracts component schemas from existing framework implementations (starting with PatternFly React) and generates framework-specific implementations through templated transformations. Designed for AI integration and future extensibility.

## Core Principles

- **Framework Agnostic**: Component schemas abstracted from implementation details
- **Data-Driven**: AI-friendly structured data representations
- **TypeScript First**: Props are standardized across all frameworks
- **Template-Based**: Separation of schema from rendering logic
- **Extensible**: Easy to add new framework targets

## Project Goals

1. Extract React component essentials into framework-agnostic schemas
2. Build templating system for NextJS component generation
3. Enable future framework support (Svelte, Vue, Angular)
4. Provide CLI and conversational AI interfaces
5. Optional automated workspace setup

## Architecture Overview

### Core Modules (Planned)

```
/modules
  /schema-extractor     # Extract component schemas from React
  /schema-validator     # Validate schema structure
  /template-engine      # Apply schemas to framework templates
  /framework-adapters   # Framework-specific adapters (NextJS, etc.)
  /cli                  # Command-line interface
  /ai-interface         # Conversational AI integration
```

### Data Flow

```
React Component → Schema Extraction → Validation → Template Application → NextJS Component
```

## Technology Stack

- **Language**: TypeScript
- **Target Framework**: Next.js (initial)
- **Component Library**: PatternFly React
- **Testing**: Jest / Vitest
- **CLI**: Commander.js / Yargs (TBD)

## Development Status

🟡 **In Progress** - Foundation establishment phase

### Completed

- [x] Project structure initialized
- [x] Core documentation (WORKFLOW.md, HANDOFF.md, README.md)
- [x] Development process established

### In Progress

- [ ] Schema extraction module design
- [ ] Template system architecture

### Planned

- [ ] Framework adapter system
- [ ] CLI interface
- [ ] AI conversational interface
- [ ] Automated workspace setup

## Getting Started

_(Will be populated as modules are built)_

## Contributing

Follow the workflow defined in [WORKFLOW.md](./WORKFLOW.md)

## Documentation

- [WORKFLOW.md](./WORKFLOW.md) - Development process and standards
- [HANDOFF.md](./HANDOFF.md) - Session-to-session knowledge retention
- Module-specific guides in `/modules/{module-name}/MODULE.GUIDE.md`

## License

_(TBD)_

## Contact

Project maintained by: Michael Nolting
