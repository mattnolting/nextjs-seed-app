# PatternFly Next.js Starter - Project Plan

## 🎯 Project Vision

Create a modern Next.js starter application with PatternFly React components. The project features:

- **Quick Start Mode**: Generate a complete app instantly
- **Manifest-driven architecture**: Single source of truth via `.build.json`
- **Filesystem-based navigation**: Routes discovered automatically
- **Simple, elegant code generation**: Production-ready output

## ✅ Core Technologies

- **Next.js 16** with App Router
- **TypeScript** with strict mode
- **PatternFly v6** React components
- **Turbopack** for development
- **npm** for package management

## 📁 Project Structure

```
nextjs-seed-app/
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── page.tsx        # Root page
│   │   └── [routes]/       # Dynamic routes
│   ├── components/
│   │   ├── layouts/        # Layout components
│   │   └── ui/             # Reusable UI components
│   └── lib/                # Utilities
├── public/                 # Public assets (at root)
│   ├── logo.svg
│   └── routes.json         # Generated navigation data
├── cli/                    # CLI tools
│   ├── generators/         # Code generators
│   ├── templates/          # Template files
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── docs/                   # Documentation
├── ai-documentation/       # AI development guidelines
├── package.json            # Root dependencies
├── tsconfig.json
└── next.config.ts
```

## 🚀 Quick Start Workflow

1. **Run Quick Start**

   ```bash
   npm run cli quick-start
   ```

   Generates:

   - `.build.json` manifest
   - Layout components
   - Page routes
   - `routes.json` navigation
   - Public assets

2. **Start Development**

   ```bash
   npm run dev
   ```

   Working app with navigation

3. **Customize**
   - Edit generated files
   - Add new pages
   - Run CLI commands to add components

## 🔧 Implementation Status

### ✅ Completed

- Manifest system (`.build.json`)
- Route scanner (filesystem-based)
- Quick Start command
- DashboardLayout with dynamic navigation
- Templates for layouts and pages
- Route generation (`routes.json`)

### 🚧 In Progress

- Testing full workflow
- Additional layout templates
- Component generation

### 📝 Planned

- CLI for adding components
- Regeneration commands
- Testing framework

## 🎨 Key Design Decisions

### Manifest-Driven

- `.build.json` is source of truth for generation
- Filesystem is source of truth for runtime
- Manifest informs structure, filesystem determines navigation

### Filesystem-Based Navigation

- Routes scanned from `app` directory
- `routes.json` generated at build time
- Layout reads from static JSON file
- No runtime filesystem access

### Simple & Elegant

- Templates are operational code
- No complex abstraction layers
- Generated code is standard React
- Users can edit anything freely

## 📚 Documentation

- [Quick Start Guide](./QUICK_START_MODE.md)
- [Architecture Overview](./MANIFEST_ARCHITECTURE.md)
- [Design Decisions](./ARCHITECTURE_CLARIFICATION.md)
- [Solution Analysis](./SOLUTION_EVALUATION.md)

## 🛠️ Dependencies

- `next`: 16.0.0
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `@patternfly/react-core`: 6.4.0
- `@patternfly/react-icons`: 6.4.0
- `@patternfly/patternfly`: 6.4.0
- TypeScript, commander, inquirer, tsx, chalk

---

**Last Updated:** 2025-10-28
**Status:** Core implementation complete, in testing phase
