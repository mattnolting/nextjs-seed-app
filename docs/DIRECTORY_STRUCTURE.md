# Directory Structure

## Full Project Structure

```
nextjs-seed-app/
├── 📁 src/                           # Application source code
│   ├── 📁 app/                       # Next.js App Router routes
│   │   ├── 📁 analytics/
│   │   │   └── page.tsx
│   │   ├── 📁 dashboard/
│   │   │   └── page.tsx
│   │   ├── 📁 gallery/
│   │   │   └── page.tsx
│   │   ├── 📁 settings/
│   │   │   └── page.tsx
│   │   ├── 📁 users/
│   │   │   └── page.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   ├── 📁 components/
│   │   ├── 📁 ui/                    # App chrome
│   │   │   ├── AppShell.tsx
│   │   │   ├── AppMasthead.tsx
│   │   │   └── AppSidebar.tsx
│   │   └── 📁 content-patterns/      # Pre-built page content (optional)
│   │       ├── DashboardView.tsx
│   │       ├── DashboardDemoView.tsx  # Full dashboard with charts
│   │       ├── CardView.tsx
│   │       ├── TableView.tsx
│   │       ├── SplitViewView.tsx
│   │       └── GalleryView.tsx
│   └── 📁 lib/
│       └── 📁 navigation/            # Navigation utilities
│           └── useRoutes.ts          # Client hook for public/routes.json
│
├── 📁 cli/                            # CLI tooling
│   ├── 📁 commands/                   # Command handlers
│   │   ├── 📁 config/                 # Configuration commands
│   │   │   ├── layout.ts
│   │   │   └── navigation.ts
│   │   ├── 📁 generate/               # Generation commands
│   │   │   ├── component.ts
│   │   │   ├── layout.ts
│   │   │   └── page.ts
│   │   ├── 📁 sync/                   # Sync commands
│   │   │   └── routes.ts
│   │   └── quick-start.ts             # Quick start command
│   ├── 📁 generators/                 # Code generators (legacy)
│   │   ├── layout-generator.ts
│   │   └── quick-start.ts
│   ├── 📁 prompts/                    # Interactive prompts
│   │   └── layout-prompts.ts
│   ├── 📁 templates/                  # Code templates
│   │   └── page.ts
│   ├── 📁 types/                       # TypeScript types
│   │   └── manifest.ts
│   ├── 📁 utils/                       # Shared utilities
│   │   ├── bootstrap-check.ts         # Check bootstrap state
│   │   ├── bootstrap-setup.ts         # Bootstrap prompts
│   │   └── routes.ts                  # Route scanning
│   ├── index.ts                       # Main CLI router
│   └── tsconfig.json
│
├── 📁 docs/                           # Project documentation
│   ├── ARCHITECTURE.md                # Complete architecture doc
│   ├── CLI_ARCHITECTURE.md            # CLI command patterns
│   ├── PROJECT_PLAN.md                # Project roadmap
│   ├── QUICK_START_MODE.md            # Quick start guide
│   ├── ROUTES.md                      # Routes schema & ordering
│   └── README.md                      # Docs index
│
├── 📁 ai-documentation/                # AI development guidelines
│   ├── COMPONENT_RULES.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── LAYOUT_PATTERNS.md
│   └── PROBLEM_STATEMENT.md
│
├── 📁 public/                         # Static assets
│   ├── PF-HorizontalLogo-Color.svg
│   ├── routes.json                    # Generated navigation
│   └── [other assets]
│
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
└── README.md                          # Project README
```

## Key Directories

### `src/app/`

Next.js App Router routes. Each subdirectory with a `page.tsx` becomes a route.

### `src/components/ui/`

App chrome and structural UI:

- `AppShell.tsx` - PF Page + masthead + sidebar wrapper
- `AppMasthead.tsx`, `AppSidebar.tsx`

### `src/components/content-patterns/`

Pre-built content views used within pages (optional):

- `DashboardView.tsx` - Simple gallery-based dashboard
- `DashboardDemoView.tsx` - Full-featured dashboard with PatternFly charts
- `CardView.tsx` - Card gallery layout
- `TableView.tsx` - Data table with toolbar, search, pagination, bulk actions
- `SplitViewView.tsx` - Two-panel split layout
- `GalleryView.tsx` - Responsive gallery layout

### `src/lib/navigation/`

Navigation hook and metadata source:

- `useRoutes.ts` - loads `public/routes.json` on the client

### `cli/commands/`

CLI command handlers organized by action:

- `quick-start.ts` - Bootstrap entire app
- `generate/` - Generate components, layouts, pages
- `sync/` - Sync routes from filesystem
- `config/` - Configure layout and navigation

### `cli/utils/`

Shared utilities:

- `bootstrap-check.ts` - Check bootstrap state
- `bootstrap-setup.ts` - Bootstrap prompts
- `routes.ts` - Filesystem route scanning
