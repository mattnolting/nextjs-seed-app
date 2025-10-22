# Documentation Index

This directory contains all project documentation organized by category.

## Core Documentation

- **[WORKFLOW.md](./WORKFLOW.md)** - Development process and standards
- **[HANDOFF.md](./HANDOFF.md)** - Session-to-session knowledge retention

## Module Documentation

### Schema Extractor

- **[MODULE.GUIDE.md](./modules/schema-extractor/MODULE.GUIDE.md)** - Schema extractor specifications and usage
- **[ANALYSIS.md](./modules/schema-extractor/ANALYSIS.md)** - Analysis of Button component extraction results
- **[ORGANIZATION_ANALYSIS.md](./modules/schema-extractor/ORGANIZATION_ANALYSIS.md)** - Analysis of monolithic vs isolated schema organization

### Template Engine

- **[MODULE.GUIDE.md](./modules/template-engine/MODULE.GUIDE.md)** - Enhanced template generation specifications

### Component Isolation

- **[MODULE.GUIDE.md](./modules/component-isolation/MODULE.GUIDE.md)** - Component isolation architecture guide

### CLI Interface

- **[MODULE.GUIDE.md](./modules/cli/MODULE.GUIDE.md)** - Interactive CLI interface documentation

## Architecture Overview

```
/docs/
├── WORKFLOW.md                    # Development process
├── HANDOFF.md                     # Session continuity
└── /modules/                      # Module-specific documentation
    ├── /schema-extractor/         # Schema extraction docs
    ├── /template-engine/         # Template generation docs
    ├── /component-isolation/      # Component isolation docs
    └── /cli/                      # CLI interface docs
```

## Documentation Standards

- **Module Guides**: Each module has a `MODULE.GUIDE.md` with specifications
- **Analysis Documents**: Detailed analysis of implementation results
- **Architecture Docs**: System design and organization decisions
- **Usage Examples**: Code examples and integration patterns

## Contributing to Documentation

1. Follow the workflow defined in [WORKFLOW.md](./WORKFLOW.md)
2. Update relevant module documentation when making changes
3. Maintain session continuity in [HANDOFF.md](./HANDOFF.md)
4. Document architectural decisions and analysis results
