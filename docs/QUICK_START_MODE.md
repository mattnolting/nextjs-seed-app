# Quick Start Mode

> **Note:** Quick Start is **optional**. The application is fully functional out of the box with sensible defaults. Use this command only if you want to reconfigure the app layout.

## Command

```bash
npm run quick-start
```

## What It Does

Reconfigures your application layout with:

- App chrome: `AppShell`, `AppMasthead`, `AppSidebar` (with theme toggle already wired)
- Always regenerates a minimal `page.tsx` (welcome content) and global `error.tsx` (EmptyState)
- Optional sample content patterns: `DashboardView`, `CardView`, `TableView`, `PrimaryDetailView`, `FormView`
- Optional demo pages: `/dashboard`, `/analytics`, `/users`, `/settings`, `/gallery`
- Navigation manifest: updates `src/app/routes.json` to match the generated routes
- Build manifest: writes `.build.json` so teams can audit which layouts and content patterns were scaffolded
- Charts: PatternFly charts integrated (Area, Bar, Donut)

## Generated Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout → wraps with AppShell
│   ├── page.tsx               # Home (welcome page, no demo dependency)
│   ├── error.tsx              # Global error boundary using EmptyState
│   ├── analytics/page.tsx     # Generated when demo content is enabled
│   ├── dashboard/page.tsx
│   ├── users/page.tsx
│   ├── settings/page.tsx
│   └── gallery/page.tsx
├── components/
│   ├── ui/
│   │   ├── AppShell.tsx
│   │   ├── AppMasthead.tsx
│   │   └── AppSidebar.tsx
│   └── content-patterns/
│       ├── DashboardView.tsx
│       ├── CardView.tsx
│       ├── TableView.tsx
│       ├── PrimaryDetailView.tsx
│       └── FormView.tsx
.build.json              # Generator manifest documenting what was scaffolded
src/lib/data/seed.ts     # Demo content backing the sample patterns (imported directly)
src/app/routes.json      # Navigation manifest consumed by the shell

public/
└── PF-HorizontalLogo-Color.svg
```

## Usage

The application works perfectly without running `quick-start`. Only run it if you want to customize:

```bash
# Optional: Reconfigure app layout (prompt lets you skip demo content)
npm run quick-start

# Then start development
npm run dev
# Visit http://localhost:3000
```

## Notes

- Navigation order follows the array defined in `src/app/routes.json`. Edit the JSON to add, remove, or rename links. Quick Start overwrites the file when demo routes change.
- `TableView` uses `@patternfly/react-table` with pagination, search, and bulk actions.
- `DashboardView` includes PatternFly charts (Area, Bar, Donut) using `@patternfly/react-charts`.
- Sample components are clearly labeled in their file headers so you can replace or delete them.
- All sample content patterns read demo data from `src/lib/data/seed.ts`.
- AppShell defaults to sidebar navigation with masthead toolbar. Edit `AppShell` directly if you need a different navigation pattern.
- Theme toggle supports light/dark modes with localStorage persistence and automatically swaps the masthead logo via `.show-light` / `.show-dark` helpers.
- Without demo content, only the Home page and EmptyState-based error boundary are generated, giving you a lean starting point.

## Related CLI

```bash
npm run quick-start
```

> Phase 1 ships with the quick-start workflow only. The more granular generate,
> sync, and config commands will return once their new architecture is ready.
