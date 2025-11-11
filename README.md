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

## Features

- 🎨 **PatternFly v6** - Modern design system components
- ⚛️ **Next.js 16** - App Router, React Server Components
- 📝 **TypeScript** - Type-safe by default
- 🧭 **Dynamic Navigation** - Automatically built from your pages
- 📐 **Sample Content Patterns** - Optional demo views (Dashboard, Card View, Table View, Primary Detail, Form View)
- 📊 **Data-Driven** - Single JSON file (`src/app/app-data.json`) for all component data
- 🎯 **Zero Config** - Sensible defaults, ready to customize
- ⚡ **Optional Quick Start** - Reconfigure app layout when needed

## Project Structure

```
nextjs-seed-app/
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── page.tsx        # Root page
│   │   └── [routes]/       # Dynamic routes
│   ├── components/
│   │   ├── content-patterns/  # Sample PatternFly page content (optional)
│   │   └── ui/             # App chrome (AppShell, AppMasthead, AppSidebar)
│   └── lib/                # Utilities
├── public/                 # Public assets (at root)
│   └── logo.svg
├── src/app/app-data.json   # Demo content backing page patterns
├── src/app/routes.json     # Navigation manifest consumed by /api/routes
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

### Dynamic Navigation

Navigation automatically discovers routes from your file structure and updates as you add pages.

### Production Ready

- Accessible by default
- Responsive design
- TypeScript types
- Hydration-safe patterns (AppMasthead defers client-only state with `requestAnimationFrame`)
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

1. **Generate** - CLI creates layout and page components based on manifest
2. **Scan** - Filesystem discovery finds all routes
3. **Build** - `src/app/routes.json` generated for navigation
4. **Run** - Standard Next.js development workflow

## Customization

Generated files are production-ready React code. You can:

- Edit any generated component
- Add custom pages manually
- Modify layouts as needed
- Use any Next.js feature

No abstraction layers or magic—just standard React and Next.js.

### Hydration Safety in `AppMasthead`

The masthead defers client-only UI updates with `requestAnimationFrame` to keep server and client markup aligned in React 19 Strict Mode. This prevents hydration warnings when toggling toolbar or navigation state. If you simplify the masthead or no longer need client-side guards, feel free to remove that effect.

## Requirements

- Node.js 20.19.0+ (LTS recommended)
- npm 10+

## License

MIT
