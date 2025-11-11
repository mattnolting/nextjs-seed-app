# Quick Start Mode

> **Note:** Quick Start is **optional**. The application is fully functional out of the box with sensible defaults. Use this command only if you want to reconfigure the app layout.

## Command

```bash
npm run quick-start
```

## What It Does

Reconfigures your application layout with:

- App chrome: `AppShell`, `AppMasthead`, `AppSidebar` (with theme toggle and nav mode)
- Optional sample content patterns: `DashboardView`, `CardView`, `TableView`, `PrimaryDetailView`, `FormView`
- Optional demo pages: `/`, `/analytics`, `/gallery`, `/users`, `/settings`
- Manifest: `src/app/routes.json` (served via `/api/routes` and used by `useRoutes()`)
- Charts: PatternFly charts integrated (Area, Bar, Donut)

## Generated Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout → wraps with AppShell
│   ├── page.tsx               # Home uses DashboardView
│   ├── analytics/page.tsx
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
└── lib/
    └── navigation/
        └── useRoutes.ts

src/app/app-data.json        # Demo content backing content patterns (created when samples are enabled)
src/app/routes.json          # Navigation manifest consumed by /api/routes

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

- Navigation ordering is by appearance in `src/app/routes.json` by default; `order` or `priority` fields can override. `hidden: true` omits a route from nav.
- `TableView` uses `@patternfly/react-table` with pagination, search, and bulk actions.
- `DashboardView` includes PatternFly charts (Area, Bar, Donut) using `@patternfly/react-charts`.
- Sample components are clearly labeled in their file headers so you can replace or delete them.
- All sample content patterns are data-driven via `src/app/app-data.json`.
- AppShell defaults to sidebar navigation with masthead toolbar. Edit `AppShell` directly if you need a different navigation pattern.
- Theme toggle supports light/dark/system modes with localStorage persistence. `AppMasthead` defers hydration work with `requestAnimationFrame` to avoid Strict Mode warnings.

## Related CLI

```bash
npm run quick-start
```

> Phase 1 ships with the quick-start workflow only. The more granular generate,
> sync, and config commands will return once their new architecture is ready.
