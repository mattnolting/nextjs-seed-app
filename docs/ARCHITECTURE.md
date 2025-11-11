# Architecture: AppShell + Content Patterns + Manifest-augmented Nav

## Vision

Create a simple, elegant, fast starter that composes PatternFly primitives into an App Shell and reusable content patterns. Navigation is filesystem-driven with a small JSON manifest to augment metadata. Graceful fallbacks everywhere.

## Core Principles

1. **Action-First CLI**: Quick Start scaffolds a working 5-page app
2. **Filesystem-Driven**: Routes discovered from `src/app/`
3. **Manifest-Augmented**: `public/routes.json` adds titles/icons/order
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
│   └── page.tsx                  # Home content
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
└── lib/
    └── navigation/
        └── useRoutes.ts         # Loads public/routes.json on client
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
public/
└── routes.json                     # Route metadata (generated)

src/lib/navigation/
└── useRoutes.ts                    # Client hook to load routes.json
```

### Navigation Flow

```
┌──────────────┐
│ Filesystem   │───┐
│ Scan         │   │
└──────────────┘   │
                   ▼
              ┌──────────────┐
              │   Merge      │
              │   Metadata   │
              └──────┬───────┘
                     │
    ┌────────────────┴────────────────┐
    │                                  │
    ▼                                  ▼
┌─────────────┐              ┌─────────────┐
│ routes.json │              │ Discovered  │
│ (metadata)  │              │ Routes      │
└─────────────┘              └─────────────┘
```

### Routes Metadata Schema (public/routes.json)

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

- DashboardView: dashboard with KPI cards and charts
- TableView: data table with toolbar, search, pagination
- CardView: card gallery with filtering and selection
- PrimaryDetailView: primary-detail pattern with DataList and Drawer
- FormView: data-driven forms

---

## 4. App Chrome and Content Patterns

### AppShell

Wraps entire app (PF Page with masthead + sidebar). Receives a config prop for:

- Masthead logo and toolbar items
- Theme mode (light/dark/system) with localStorage persistence
- Navigation mode (sidebar vs horizontal masthead navigation)

### Content Patterns

Reusable, composable page content layouts under `src/components/content-patterns/`:

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
- Generate content patterns and demo pages
- Update `public/routes.json` to match new navigation

---

## 6. File Structure Summary

```
src/
├── app/
│   ├── layout.tsx           # Root layout → wraps with AppShell
│   ├── page.tsx
│   └── [routes]/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── AppShell.tsx
│   │   ├── AppMasthead.tsx
│   │   └── AppSidebar.tsx
│   └── content-patterns/
│       ├── DashboardView.tsx
│       ├── CardView.tsx
│       ├── TableView.tsx
│       └── PrimaryDetailView.tsx
├── lib/
│   └── navigation/
│       └── useRoutes.ts
└── public/
    ├── routes.json
    └── PF-HorizontalLogo-Color.svg
```

---

## 7. Benefits

✅ Uses Next.js and PatternFly idioms
✅ App chrome isolated from page content
✅ Filesystem-first with manifest augmentation
✅ Graceful fallbacks and dev warnings
✅ Action-first CLI commands for speed
