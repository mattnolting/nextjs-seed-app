# Directory Structure

## Full Project Structure

```
nextjs-seed-app/
├── src/                               # Application source
│   ├── app/                           # Next.js App Router entrypoints
│   │   ├── analytics/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── users/page.tsx
│   │   ├── layout.tsx                 # Root layout (wraps AppShell)
│   │   ├── page.tsx                   # Home route
│   │   ├── globals.css                # Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── AppWrapper.tsx             # Error boundary + AppShell wrapper
│   │   ├── ErrorBoundary.tsx
│   │   ├── ui/
│   │   │   ├── AppShell.tsx           # PatternFly Page scaffold
│   │   │   ├── AppMasthead.tsx
│   │   │   └── AppSidebar.tsx
│   │   └── content-patterns/          # Reusable page-level content views
│   │       ├── CardView.tsx
│   │       ├── DashboardView.tsx
│   │       ├── FormView.tsx
│   │       ├── PrimaryDetailView.tsx
│   │       └── TableView.tsx
│   └── lib/
│       ├── data/
│       │   ├── useAppData.ts
│       │   └── types.ts
│       └── navigation/
│           └── useRoutes.ts
│
├── cli/                               # CLI tooling (Phase 1)
│   ├── commands/
│   │   └── quick-start.ts             # Standalone bootstrap command
│   ├── generators/
│   │   └── quick-start.ts             # Implements scaffold + demo creation
│   ├── utils/
│   │   ├── bootstrap-check.ts
│   │   ├── bootstrap-setup.ts
│   │   └── routes.ts
│   └── tsconfig.json
│
├── docs/                              # Human-authored documentation
├── ai-documentation/                  # AI-oriented guidance
├── public/
│   ├── app-data.json                  # Demo content
│   ├── routes.json                    # Navigation manifest
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
the PatternFly-powered `AppShell`.

### `src/components/`

- `AppWrapper.tsx` and `ErrorBoundary.tsx` own global providers and error
  handling around the shell.
- `components/ui/` contains the chrome elements (`AppShell`, `AppMasthead`,
  `AppSidebar`) that assemble the PatternFly layout.
- `components/content-patterns/` packages reusable page-level views used by the
  demo routes (Card, Dashboard, Form, Primary/Detail, Table).

### `src/lib/`

- `lib/data/` centralizes data loading for demo pages via `useAppData`.
- `lib/navigation/useRoutes.ts` reads `public/routes.json` at runtime to drive
  sidebar navigation.

### `cli/`

Phase 1 ships a single `quick-start` workflow. The command prompts for layout
choices, ensures the AppShell scaffold exists, rebuilds demo pages, and updates
`public/routes.json`. Shared helpers live under `cli/utils/`, and the generator
logic sits in `cli/generators/quick-start.ts`.

### `public/`

Static assets served by Next.js. The quick-start routine maintains
`routes.json`, and `app-data.json` seeds the demo content patterns.
