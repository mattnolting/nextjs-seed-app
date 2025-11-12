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
- `src/lib/data/seed.ts` contains embedded demo data (replaces previous `app-data.json` approach)

## CSS Configuration

### PatternFly CSS Files

The `src/app/globals.css` file includes comprehensive documentation for all PatternFly CSS files. This documentation addresses three common developer pain points:

1. **Discoverability** – PatternFly CSS files can be hard to find in `node_modules/@patternfly/patternfly/`
2. **Understanding differences** – It's challenging to understand the differences between files like `patternfly-base.css`, `patternfly-base-no-globals.css`, `patternfly.css`, and `patternfly-no-globals.css`
3. **Combination guidance** – Developers need clear guidance on how to combine files to suit their individual needs

The documentation includes:
- Descriptions of each CSS file and what it includes/excludes
- Line counts to understand bundle size implications
- Use cases for when to use each file
- Effects of enabling/disabling each import
- Four recommended setup configurations
- Clear guidance on which files can be combined

### Current Setup

The seed app uses the following CSS imports by default:
- `patternfly-base.css` – Base styles with reset/normalize
- `patternfly-charts.css` – Chart theme variables for dark theme support
- `patternfly-addons.css` – Utility classes (can be commented out if not needed)

### Customizing CSS Imports

To customize the CSS setup, edit `src/app/globals.css` and:
1. Comment out the current base import
2. Uncomment your preferred base import (e.g., `patternfly-base-no-globals.css` if you have your own reset)
3. Optionally comment out `patternfly-addons.css` if you don't need utility classes
4. See the documentation in `globals.css` for detailed guidance on each file

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
