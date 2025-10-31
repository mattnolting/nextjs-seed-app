# PatternFly Next.js Starter

A modern Next.js application with PatternFly components. Generate production-ready dashboards in seconds.

## Quick Start

Generate a complete application instantly:

```bash
# Install dependencies (from project root)
npm install

# Generate application
npm run quick-start

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## Features

- ⚡ **Generate in 3 seconds** - Quick Start mode creates a complete app
- 🎨 **PatternFly v6** - Modern design system components
- ⚛️ **Next.js 16** - App Router, React Server Components
- 📝 **TypeScript** - Type-safe by default
- 🧭 **Dynamic Navigation** - Automatically built from your pages
- 📐 **Multiple Layouts** - Dashboard, Gallery, Table, Split View
- 🎯 **Zero Config** - Sensible defaults, ready to customize

## Project Structure

```
nextjs-seed-app/
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── page.tsx        # Root page
│   │   └── [routes]/       # Dynamic routes
│   ├── components/
│   │   ├── content-patterns/  # Pre-built page content layouts
│   │   └── ui/             # App chrome (AppShell, AppMasthead, AppSidebar)
│   └── lib/                # Utilities
├── public/                 # Public assets (at root)
│   ├── routes.json         # Generated navigation
│   └── logo.svg
├── cli/                    # CLI tools
│   ├── generators/         # Code generators
│   └── templates/          # Template files
└── docs/                   # Documentation
```

## What You Get

### Pre-built Content Patterns

- **DashboardView** - Gallery-based dashboard layout
- **DashboardDemoView** - Full-featured dashboard with charts (Area, Bar, Donut)
- **CardView** - Responsive card gallery
- **TableView** - Data table with search, pagination, and bulk actions
- **SplitViewView** - Two-panel split layout

### Dynamic Navigation

Navigation automatically discovers routes from your file structure and updates as you add pages.

### Production Ready

- Accessible by default
- Responsive design
- TypeScript types
- Hydration-safe patterns
- SEO optimized

## Development

### Prerequisites

- Node.js 20.19+
- npm

### Commands

```bash
# Install dependencies
npm install

# Quick Start (generate app instantly)
npm run quick-start

# Generate components/pages
npm run generate page <path>
npm run generate component <name>

# Sync routes from filesystem
npm run sync routes

# Configure navigation
npm run config navigation

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Documentation

- **[Quick Start Guide](./docs/QUICK_START_MODE.md)** - Detailed CLI usage
- **[Architecture](./docs/ARCHITECTURE.md)** - Design decisions and technical details
- **[Project Plan](./docs/PROJECT_PLAN.md)** - Project structure and status

## How It Works

1. **Generate** - CLI creates layout and page components based on manifest
2. **Scan** - Filesystem discovery finds all routes
3. **Build** - `routes.json` generated for navigation
4. **Run** - Standard Next.js development workflow

## Customization

Generated files are production-ready React code. You can:

- Edit any generated component
- Add custom pages manually
- Modify layouts as needed
- Use any Next.js feature

No abstraction layers or magic—just standard React and Next.js.

## Requirements

- Node.js 20.19.0+ (LTS recommended)
- npm 10+

## License

MIT
