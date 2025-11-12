# Directory Structure

## Full Project Structure

```
nextjs-seed-app/
├── src/                               # Application source
│   ├── app/                           # Next.js App Router entrypoints
│   │   ├── layout.tsx                 # Root layout (wraps AppShell)
│   │   ├── page.tsx                   # Home route (welcome screen)
│   │   ├── error.tsx                  # Global error boundary (EmptyState)
│   │   ├── analytics/page.tsx         # Generated when demo content is enabled
│   │   ├── dashboard/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── users/page.tsx
│   │   ├── globals.css                # Global styles + comprehensive PatternFly CSS documentation
│   │   └── favicon.ico
│   ├── components/
│   │   ├── AppWrapper.tsx             # Error boundary + AppShell wrapper
│   │   ├── ErrorBoundary.tsx
│   │   ├── ui/
│   │   │   ├── AppShell.tsx           # PatternFly Page scaffold
│   │   │   ├── AppMasthead.tsx
│   │   │   └── AppSidebar.tsx
│   │   └── content-patterns/          # Sample PatternFly page-level views (optional)
│   │       ├── CardView.tsx
│   │       ├── DashboardView.tsx
│   │       ├── FormView.tsx
│   │       ├── PrimaryDetailView.tsx
│   │       └── TableView.tsx
│   └── lib/
│       └── data/
│           ├── seed.ts                # Embedded demo data for samples
│           ├── useAppData.ts
│           └── types.ts
│
├── cli/                               # CLI tooling (Phase 1)
│   ├── commands/
│   │   └── quick-start.ts             # Standalone bootstrap command
│   ├── generators/
│   │   └── quick-start.ts             # Implements scaffold + demo creation
│   ├── utils/
│   │   ├── bootstrap-check.ts
│   │   ├── bootstrap-setup.ts
│   │   └── (shared helpers)
│   └── tsconfig.json
│
├── docs/                              # Human-authored documentation
├── ai-documentation/                  # AI-oriented guidance
├── src/app/routes.json                # Navigation manifest imported by AppWrapper
├── public/
│   └── static assets (logos, etc.)
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Key Directories

### `src/app/`

Next.js App Router routes and layout. Each folder with a `page.tsx` maps to a
route. `layout.tsx` wraps all content with `AppWrapper`, which in turn renders
the PatternFly-powered `AppShell`. The `page.tsx` file ships with a minimal
welcome experience, while `error.tsx` provides a global EmptyState-driven error
boundary. Additional demo routes are generated only when the Quick Start prompt
opts into sample content.

### `src/components/`

- `AppWrapper.tsx` and `ErrorBoundary.tsx` own global providers and error
  handling around the shell.
- `components/ui/` contains the chrome elements (`AppShell`, `AppMasthead`,
  `AppSidebar`) that assemble the PatternFly layout.
- `components/content-patterns/` packages sample page-level views used by the
  demo routes (Card, Dashboard, Form, Primary/Detail, Table). Each file is marked
  as demo-only and can be removed for a leaner seed. All components are self-contained
  and work independently with sensible defaults, fetching their own data from
  `src/lib/data/seed.ts` when props aren't provided.

### `src/lib/`

- `lib/data/` centralizes demo data. `seed.ts` contains the embedded sample
  dataset and `useAppData` exposes it to components.

### `cli/`

Phase 1 ships a single `quick-start` workflow. The command prompts for layout
choices, optionally generates demo pages/data, and updates `src/app/routes.json`.
Shared helpers live under `cli/utils/`, and the generator logic sits in
`cli/generators/quick-start.ts`.

### `public/`

Static assets served by Next.js (logos, icons, etc.).
