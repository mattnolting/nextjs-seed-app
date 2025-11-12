# Architecture: AppShell + Content Patterns + Manifest-augmented Nav

## Vision

Create a simple, elegant, fast starter that composes PatternFly primitives into an App Shell and reusable content patterns. Navigation is filesystem-driven with a small JSON manifest to augment metadata. Graceful fallbacks everywhere.

## Core Principles

1. **Action-First CLI**: Quick Start scaffolds a working 5-page app
2. **Filesystem-Driven**: Routes discovered from `src/app/`
3. **Manifest-Augmented**: `src/app/routes.json` adds titles/icons/order
4. **Graceful Degradation**: Missing manifest → sensible defaults
5. **Separation of Concerns**: App chrome vs page content patterns

---

## Architecture Overview

### System Layers

```
┌─────────────────────────────────────┐
│   CLI (Action-First)                │
│   - Quick Start scaffolding         │
│   - Future: targeted generators     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   AppShell                          │
│   src/components/ui/AppShell.tsx    │
│   - PF Page + masthead + sidebar    │
│   - Configurable masthead props     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Navigation System                 │
│   src/lib/navigation/               │
│   - Discovers routes (filesystem)   │
│   - Enhances with metadata (JSON)   │
│   - Appearance ordering by default  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   UI Shell + Content Patterns       │
│   src/components/ui/                │
│   - AppShell (PF Page + chrome)     │
│   src/components/content-patterns/  │
│   - [Concern]View (DashboardView,  │
│     CardView, TableView,            │
│     PrimaryDetailView, FormView)    │
└─────────────────────────────────────┘
```

---

## 1. Layout System (Next.js App Router)

We use Next.js App Router with a minimal root layout that wraps the client `AppShell` component, which holds the PF `Page` with masthead and sidebar.

### File Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout → wraps with AppShell
│   ├── page.tsx                  # Minimal welcome page
│   └── error.tsx                 # Global error boundary (EmptyState)
├── components/
│   ├── ui/                       # App chrome
│   │   ├── AppShell.tsx
│   │   ├── AppMasthead.tsx
│   │   └── AppSidebar.tsx
│   └── content-patterns/         # Pre-built page content
│       ├── DashboardView.tsx
│       ├── CardView.tsx
│       ├── TableView.tsx
│       ├── PrimaryDetailView.tsx
│       └── FormView.tsx
└── app/
    └── routes.json              # Declarative navigation manifest
```

### AppShell configuration via props

```typescript
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell
          config={{
            masthead: {
              logo: "/PF-HorizontalLogo-Color.svg",
              toolbarItems: ["notifications", "settings"],
            },
          }}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
```

### Bootstrap (Quick Start)

Quick Start scaffolds `AppShell`, `AppMasthead`, `AppSidebar`, and content patterns, updates `app/layout.tsx` to wrap children with `AppShell`, and generates demo pages.

---

## 2. Navigation System

### File Structure

```
src/app/routes.json                 # Navigation manifest consumed by AppWrapper
```

### Navigation Flow

```
┌─────────────┐
│ routes.json │
│ (manifest)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AppWrapper  │  imports manifest at build time
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AppShell    │  passes items to AppMasthead/AppSidebar
└─────────────┘
```

### Routes Metadata Schema (`src/app/routes.json`)

```typescript
interface RouteMetadata {
  path: string; // Required: matches filesystem
  title: string; // Display name
  icon?: string; // PatternFly icon name
  order?: number; // Preferred ordering (lower = first)
  priority?: number; // Optional legacy key; lower appears first
  group?: string; // For grouped nav
  hidden?: boolean; // Exclude from nav
  description?: string; // Tooltip/aria-label
}
```

### Ordering Model

```typescript
// Default: preserve appearance order in routes.json
// If any route defines order/priority, apply stable sort by (order || priority)
// Hidden routes are filtered
```

### Fallback Strategy

```typescript
// Missing routes.json → Use filesystem defaults
// Missing metadata for route → Use path-based title
// Invalid order/priority → Use appearance order
// Missing icon → No icon (graceful)
```

---

## 3. Demo Pages (Quick Start Output)

These pages are generated only when you opt into sample content during the Quick Start prompt. They exist to showcase PatternFly layouts and can be deleted when you begin building product-specific views.

- DashboardView: dashboard with KPI cards and charts
- TableView: data table with toolbar, search, pagination
- CardView: card gallery with filtering and selection
- PrimaryDetailView: primary-detail pattern with DataList and Drawer
- FormView: data-driven forms

---

## 4. App Chrome and Content Patterns

### AppShell

Wraps the entire app (PatternFly `Page` with masthead + sidebar). Receives a config prop for:

- Masthead branding: the default config points to `public/PF-HorizontalLogo-Color.svg`. The logo element renders both light and dark variants using `.show-light` / `.show-dark` helpers defined in `globals.css`.
- Toolbar items: notifications, settings, and theme toggle are preconfigured, but you can add or remove actions in `AppWrapper.tsx`.
- Theme mode: the shell toggles the `pf-v6-theme-dark` class on `<html>`, causing icons, tokens, and the masthead logo to switch automatically. Values persist to `localStorage` so the user’s choice sticks across reloads.
- Sidebar navigation: enabled by default; adjust `AppShell` if you want a masthead-only layout.
- Client handoff: `ClientAppShell` renders a minimal skeleton during SSR and mounts the full shell on the client, eliminating PatternFly’s OUIA id mismatches during hydration.

### Content Patterns

Reusable, composable page content layouts under `src/components/content-patterns/`. Each file begins with a “SAMPLE CONTENT PATTERN” banner so maintainers know the code is optional:

- **DashboardView** - Full-featured dashboard with KPI cards and PatternFly charts (Area, Bar, Donut) using `@patternfly/react-charts`
- **CardView** - Card gallery layout with filtering, pagination, and selection
- **TableView** - Data table with toolbar, search, pagination, and bulk actions (uses `@patternfly/react-table`)
- **PrimaryDetailView** - Primary-detail pattern using DataList and Drawer components
- **FormView** - Data-driven forms with validation

---

## 5. CLI Overview (Phase 1)

```
npm run quick-start
```

> The generate, sync, and config subcommands are paused while the new generator
> architecture is being designed. Quick-start is the supported way to rebuild
> the demo experience during this phase.

### After Quick Start

- Generate `AppShell`, `AppMasthead`, `AppSidebar`
- Update `src/app/layout.tsx` to wrap with `AppShell`
- Optionally generate content patterns and demo pages (based on the include-demo prompt)
- Update/create `src/app/routes.json` to match new navigation when demos are included

---

## 6. File Structure Summary

```
src/
├── app/
│   ├── layout.tsx           # Root layout → wraps with AppShell
│   ├── page.tsx
│   ├── error.tsx
│   └── [routes]/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── AppShell.tsx
│   │   ├── AppMasthead.tsx
│   │   └── AppSidebar.tsx
│   └── content-patterns/   # Sample PatternFly demos (optional)
│       ├── DashboardView.tsx
│       ├── CardView.tsx
│       ├── TableView.tsx
│       ├── PrimaryDetailView.tsx
│       └── FormView.tsx
└── src/app/
    └── routes.json        # Navigation manifest consumed directly by the UI
```

Sample data used by the demo components lives in `src/lib/data/seed.ts` and is imported directly by `useAppData`. API route handlers import helpers from `src/server/api/` so business logic stays separate from routing.

---

## 7. Benefits

✅ Uses Next.js and PatternFly idioms
✅ App chrome isolated from page content
✅ Filesystem-first with manifest augmentation
✅ Graceful fallbacks and dev warnings
✅ Action-first CLI commands for speed
