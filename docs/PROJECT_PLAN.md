# PatternFly Next.js Starter – Project Plan

## 🎯 Project Vision

Deliver a modern PatternFly starter built on Next.js 16 that showcases:

- **AppShell-first layout**: A responsive masthead + sidebar experience powered
  by PatternFly `Page`
- **Reusable content patterns**: Drop-in dashboards, tables, cards, primary/detail,
  and form experiences
- **Manifest-driven navigation**: `public/routes.json` augments file-based routes
  with titles and ordering
- **Single-step bootstrap**: A quick-start workflow that rebuilds the demo and
  captures layout preferences

## ✅ Core Technologies

- **Next.js 16** (App Router + Turbopack)
- **TypeScript** with strict mode
- **PatternFly v6** React components
- **Vitest** + Testing Library for smoke coverage
- **npm** for package management

## 📁 Project Structure (Phase 1)

```
nextjs-seed-app/
├── src/
│   ├── app/                      # Next.js routes + root layout
│   ├── components/
│   │   ├── ui/                   # AppShell, masthead, sidebar
│   │   └── content-patterns/     # Page-level demo views
│   └── lib/
│       ├── data/                 # Demo data loader + types
│       └── navigation/           # routes.json consumer
├── cli/
│   ├── commands/quick-start.ts   # Interactive bootstrap command
│   ├── generators/quick-start.ts # Scaffold + demo generator
│   └── utils/                    # Shared bootstrap helpers
├── public/
│   ├── app-data.json             # Demo data backing content patterns
│   └── routes.json               # Navigation manifest (auto-managed)
├── docs/                         # Human-authored documentation
├── ai-documentation/             # AI guidance for contributors
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Quick Start Workflow

1. **Install & bootstrap**

   ```bash
   npm install
   npm run quick-start
   ```

   Output:
   - Ensures `AppShell` scaffold is present
   - Rebuilds demo routes (dashboard, analytics, users, settings, gallery)
   - Refreshes `public/routes.json` and `public/app-data.json` as needed

2. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 to explore the PatternFly experience.

3. **Customize**
   - Update `src/components/ui/` for chrome tweaks
   - Extend or replace content patterns under `components/content-patterns/`
   - Edit `routes.json` to adjust navigation ordering/titles

## 🔧 Implementation Status

### ✅ Completed

- PatternFly-powered AppShell (`AppWrapper`, `AppShell`, masthead, sidebar)
- Five demo content patterns with data hooks
- Quick-start CLI (interactive bootstrap + demo regeneration)
- Navigation manifest (`public/routes.json`) + client hook (`useRoutes`)
- Smoke tests validating the demo pages mount successfully

### 🚧 In Progress

- Phase 2 content pattern enhancements (validation, richer tooling)
- Additional documentation polish and developer personas

### 📝 Planned

- Reintroduce granular CLI commands (generate/sync/config) with improved UX
- Optional feature toggles for chart/data density
- Broader automated test coverage

## 🎨 Key Design Decisions

- **Manifest augmentation**: File-based routing remains canonical; `routes.json`
  adds human-friendly labels and ordering metadata.
- **Data-driven demos**: `app-data.json` powers table, card, and form views so
  teams can swap in their own sources quickly.
- **Minimal API surface**: Phase 1 exposes only `npm run quick-start` to avoid
  stale commands while the generator architecture is redesigned.
- **Composable content**: Each content pattern is a regular React component that
  can be imported directly into product routes.

## 📚 Documentation

- [Project README](../README.md) – High-level overview
- [Quick Start Guide](./QUICK_START_MODE.md) – Detailed bootstrap workflow
- [Architecture](./ARCHITECTURE.md) – System layers and rationale
- [Directory Structure](./DIRECTORY_STRUCTURE.md) – Source tree breakdown
- [Routes Manifest](./ROUTES.md) – Navigation schema and maintenance tips

## 🛠️ Dependencies

- `next`: 16.0.0
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `@patternfly/react-core`: 6.4.0
- `@patternfly/react-icons`: 6.4.0
- `@patternfly/patternfly`: 6.4.0
- TypeScript, inquirer, tsx, chalk

---

**Last Updated:** 2025-11-10  
**Status:** Phase 1 polish, Phase 2 planning underway
