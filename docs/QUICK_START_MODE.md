# Quick Start Mode

> **Note:** Quick Start is **optional**. The application is fully functional out of the box with sensible defaults. Use this command only if you want to reconfigure the app layout.

## Command

```bash
npm run quick-start
```

## What It Does

Reconfigures your application layout with:

- App chrome: `AppShell`, `AppMasthead`, `AppSidebar` (with theme toggle and nav mode)
- Content patterns: `DashboardView`, `CardView`, `TableView`, `PrimaryDetailView`, `FormView`
- Pages: `/`, `/analytics`, `/gallery`, `/users`, `/settings`
- Manifest: `public/routes.json` (used by `useRoutes()`)
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

public/
├── routes.json
└── PF-HorizontalLogo-Color.svg
```

## Usage

The application works perfectly without running `quick-start`. Only run it if you want to customize:

```bash
# Optional: Reconfigure app layout
npm run quick-start

# Then start development
npm run dev
# Visit http://localhost:3000
```

## Notes

- Navigation ordering is by appearance in `public/routes.json` by default; `order` or `priority` fields can override. `hidden: true` omits a route from nav.
- `TableView` uses `@patternfly/react-table` with pagination, search, and bulk actions.
- `DashboardView` includes PatternFly charts (Area, Bar, Donut) using `@patternfly/react-charts`.
- All content patterns are data-driven via `public/app-data.json`.
- AppShell config allows changing the masthead logo, toolbar items, theme mode, and navigation mode (sidebar/horizontal) from `app/layout.tsx`.
- Theme toggle supports light/dark/system modes with localStorage persistence.

## Related CLI

```bash
npm run quick-start
```

> Phase 1 ships with the quick-start workflow only. The more granular generate,
> sync, and config commands will return once their new architecture is ready.
