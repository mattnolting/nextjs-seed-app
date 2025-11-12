# Development Guide

## Getting Started

1. Install dependencies: `npm install`
2. (Optional) Rebuild demo content: `npm run quick-start`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

## Project Layout Highlights

- `src/app/` contains all routes and the root `layout.tsx`
- `src/app/error.tsx` provides the global EmptyState-based error boundary
- `src/components/ui/` holds the PatternFly AppShell chrome
- `src/components/content-patterns/` provides sample/demo pages (each file is marked as optional)
- `src/lib/data/useAppData.ts` exposes the embedded demo dataset from `src/lib/data/seed.ts`

## Working with Components

- Component files that use hooks should start with `"use client"`
- Follow PatternFly prop patterns and export typed interfaces
- Keep shared UI in `components/ui/` and page-level views in
  `components/content-patterns/`
- `AppMasthead` defers hydration-only state with `requestAnimationFrame` to avoid React Strict Mode warnings; remove that effect if you no longer need toolbar/nav guards.

## CLI Workflow

- `npm run quick-start` is the only Phase 1 CLI entry point
- It re-runs layout configuration, optionally generates demo routes/data, and refreshes
  `src/app/routes.json` when samples are included
- Skip demo generation by answering “no” to the include-demo prompt for a lean seed

## Testing

- Smoke tests live under `src/__tests__/smoke/`
- Run the suite with `npm test` (single run) or `npm run test:watch`

## Deployment

- Optimized for Vercel/Next.js hosting
- Works on any Node runtime capable of running `next start`
- Supports static asset hosting via `next export` if needed
