# PatternFly Next.js Starter

A modern Next.js application with PatternFly components. Generate production-ready dashboards in seconds.

## Quick Start

The application is **ready to use out of the box** with sensible defaults:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

### Optional: Reconfigure Your App

The application works with default settings. If you want to regenerate the PatternFly shell or lay down the sample content, you can optionally run:

```bash
npm run quick-start
```

This interactive tool lets you:

- Decide whether to include the sample PatternFly demo content
- Toggle the masthead toolbar (and pick which actions appear)

**Note:** This is completely optional. The app is fully functional without running `quick-start`.

#### What Quick Start Generates

Running the command can rebuild the entire PatternFly scaffold:

- Rewrites `src/app/layout.tsx` and `AppWrapper.tsx` to ensure the AppShell is configured correctly.
- Optionally lays down demo routes (`/dashboard`, `/analytics`, `/users`, `/settings`, `/gallery`) powered by the sample content patterns.
- Syncs `src/app/routes.json` so navigation matches the generated pages.
- Produces `.build.json`, a manifest that records which content patterns and routes were scaffolded. This file is informational only—it helps you track what the generator created and can be deleted once you commit the resulting code.

Use the CLI when you want to see PatternFly layout patterns in action or when you want to reset to the stock shell; otherwise, continue editing the files manually.

## Features

- **PatternFly v6** - Modern design system components
- **Next.js 16** - App Router, React Server Components
- **TypeScript** - Type-safe by default
- **Sample Content Patterns** - Optional demo views (Dashboard, Card View, Table View, Primary Detail, Form View)
- **Data-Driven** - Demo data lives alongside the samples in `src/lib/data/seed.ts`
- **Minimal Defaults** - Ready-to-use Home page and error state even without demo content
- **Zero Config** - Sensible defaults, ready to customize
- **Optional Quick Start** - Reconfigure app layout when needed

## Project Structure

```
nextjs-seed-app/
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── page.tsx        # Root page
│   │   ├── error.tsx       # Global error boundary (EmptyState)
│   │   └── [route]/page.tsx       # Dynamic routes
│   ├── components/
│   │   ├── content-patterns/  # Sample PatternFly page content (optional)
│   │   └── ui/             # App chrome (AppShell, AppMasthead, AppSidebar)
│   ├── lib/                # Utilities
│   │   ├── data/             # Demo data + hooks
│   │   │   ├── seed.ts
│   │   │   └── useAppData.ts
│   └── server/
│       └── api/             # (reserved for future server utilities)
├── public/                 # Public assets (at root)
│   └── logo.svg
├── src/app/routes.json     # Navigation manifest imported by AppWrapper
├── cli/                    # CLI tools
│   ├── generators/         # Code generators
│   └── templates/          # Template files
└── docs/                   # Documentation
```

## What You Get

### Sample Content Patterns

The files under `src/components/content-patterns/` are intentionally labeled as **sample** implementations. They show how to use PatternFly primitives together and are safe to remove or replace:

- **DashboardView** – KPI cards and charts (Area, Bar, Donut)
- **CardView** – Card gallery with filtering, pagination, and selection
- **TableView** – Data table with search, pagination, and bulk actions
- **PrimaryDetailView** – Master/detail layout using DataList and Drawer
- **FormView** – JSON-driven forms with validation helpers

> Prefer a lean starter? When running `npm run quick-start`, answer “no” to the “Generate sample PatternFly demo pages and data?” prompt to keep the shell minimal.

### App Shell & Theme Support

`AppShell` wires up the PatternFly masthead and sidebar for you. The masthead branding renders two logo variants—light and dark—using helper wrappers in `public/PF-HorizontalLogo-Color.svg` alongside `.show-light`/`.show-dark` classes defined in `globals.css`. When the Theme toggle is used, `AppShell` flips the `pf-v6-theme-dark` class on the `<html>` element and the logo swap happens automatically.

Out of the box the toolbar exposes notifications, settings, and the theme toggle. You can change the logo path or toolbar actions in `AppWrapper.tsx`, or switch to your own masthead entirely while keeping the same CSS utilities for light/dark compatibility.

### Navigation Manifest (`src/app/routes.json`)

Navigation is declarative: `AppWrapper` imports the manifest and hands the array to `AppShell`, which renders both the sidebar and the optional masthead links. The file ships with a single Home entry; append additional objects to add new routes, or remove ones you do not need.

Each item supports:

- `path`: the route in `src/app/`
- `title`: label shown in masthead/sidebar
- `group` (optional): future-friendly grouping hint

Quick Start rewrites this manifest when you scaffold the optional demo pages, so the nav always matches the generated content. Outside the CLI you can update the JSON manually—the shell will pick up changes on the next reload with no other code updates required.

### Production Ready

- Accessible by default
- Responsive design
- TypeScript types
- Hydration-safe patterns (no runtime fetches for navigation)
- SEO optimized

## Development

### Prerequisites

- Node.js 20.19+
- npm

### Commands

```bash
# Install dependencies
npm install

# Development server (start here!)
npm run dev

# Optional: Reconfigure app layout (includes opt-in demo content)
npm run quick-start

# Note: additional CLI generators/sync/config commands will return in a future phase

# Production build
npm run build

# Start production server
npm start
```

## Documentation

- **[Quick Start Guide](./docs/QUICK_START_MODE.md)** - Detailed CLI usage
- **[Architecture](./docs/ARCHITECTURE.md)** - Design decisions and technical details

## How It Works

1. **Generate** - CLI optionally scaffolds demo pages and writes `src/app/routes.json`
2. **Configure** - `AppWrapper` imports the manifest and feeds it to `AppShell`
3. **Run** - Standard Next.js development workflow

## Customization

Generated files are production-ready React code. You can:

- Edit any generated component
- Add custom pages manually
- Modify layouts as needed
- Use any Next.js feature

No abstraction layers or magic—just standard React and Next.js.

### Hydration Safety

Navigation data is imported at build time, so the masthead and sidebar render the same markup on the server and client with no extra guards or asynchronous fetches required.

## PatternFly-Specific Inclusions

The seed includes several conveniences tailored for PatternFly projects:

- **CSS baseline** – `globals.css` imports PatternFly base and chart styles and defines `.show-light` / `.show-dark` helpers used by the masthead branding.
- **Comprehensive CSS documentation** – `globals.css` includes detailed documentation for all PatternFly CSS files, explaining differences, use cases, and recommended setups. This addresses common developer pain points where these files can be hard to find, differences are challenging to understand, and it's unclear how they can be combined to suit individual needs.
- **Scaffolded AppShell** – `AppShell`, `AppMasthead`, and `AppSidebar` are configured with sensible defaults for toolbar actions, theme toggling, and navigation.
- **Self-contained demo components** – All content-pattern components work independently with sensible defaults. They fetch their own data from `src/lib/data/seed.ts` when props aren't provided, making them easy to drop into pages and customize.
- **Sample content patterns** – Dashboard, table, card, primary-detail, and form views demonstrate how to assemble real layouts using PatternFly components.
- **Demo data & manifest** – `src/lib/data/seed.ts` and `.build.json` document what the generator laid down, making it easy to trim or extend the demo experience.
- **Quick Start CLI** – `npm run quick-start` replays PatternFly layout patterns on demand, ensuring AppShell and navigation stay correctly wired when you scaffold demos.
- **Template-based page generation** – The CLI uses a simple template system that makes it easy to add new demo pages by updating a data-driven configuration array.

## Requirements

- Node.js 20.19.0+ (LTS recommended)
- npm 10+

## License

MIT
