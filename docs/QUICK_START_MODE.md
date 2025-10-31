# Quick Start Mode

## Command

```bash
npm run quick-start
```

## What It Generates

A ready-to-use application with:

- App chrome: `AppShell`, `AppMasthead`, `AppSidebar` (with theme toggle and nav mode)
- Content patterns: `DashboardView`, `DashboardDemoView`, `CardView`, `TableView`, `SplitViewView`
- Pages: `/`, `/dashboard`, `/analytics`, `/users`, `/settings`, `/gallery`
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
│       ├── DashboardDemoView.tsx
│       ├── CardView.tsx
│       ├── TableView.tsx
│       ├── SplitViewView.tsx
│       └── GalleryView.tsx
└── lib/
    └── navigation/
        └── useRoutes.ts

public/
├── routes.json
└── PF-HorizontalLogo-Color.svg
```

## After Running

```bash
npm run quick-start
npm run dev
# Visit http://localhost:3000
```

## Notes

- Navigation ordering is by appearance in `public/routes.json` by default; `order` or `priority` fields can override. `hidden: true` omits a route from nav.
- `TableView` uses `@patternfly/react-table` with pagination, search, and bulk actions.
- `DashboardDemoView` includes PatternFly charts (Area, Bar, Donut) using `@patternfly/react-charts`.
- AppShell config allows changing the masthead logo, toolbar items, theme mode, and navigation mode (sidebar/horizontal) from `app/layout.tsx`.
- Theme toggle supports light/dark/system modes with localStorage persistence.

## Related CLI

```bash
npm run generate page
npm run generate component
npm run sync routes
npm run config navigation
```
