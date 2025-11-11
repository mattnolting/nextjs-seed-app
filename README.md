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

The application works perfectly with default settings. If you want to customize your application layout (sidebar, navigation, masthead), you can optionally run:

```bash
npm run quick-start
```

This interactive tool lets you reconfigure:

- Sidebar navigation (enabled/disabled, type, default state)
- Horizontal navigation (masthead navigation)
- Masthead (logo, toolbar items)

**Note:** This is completely optional. The app is fully functional without running `quick-start`.

## Features

- 🎨 **PatternFly v6** - Modern design system components
- ⚛️ **Next.js 16** - App Router, React Server Components
- 📝 **TypeScript** - Type-safe by default
- 🧭 **Dynamic Navigation** - Automatically built from your pages
- 📐 **Content Patterns** - Dashboard, Card View, Table View, Primary Detail, Form View
- 📊 **Data-Driven** - Single JSON file (`app-data.json`) for all component data
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

- **DashboardView** - Full-featured dashboard with KPI cards and charts (Area, Bar, Donut)
- **CardView** - Responsive card gallery with filtering and pagination
- **TableView** - Data table with search, pagination, and bulk actions
- **PrimaryDetailView** - Primary-detail pattern with DataList and Drawer
- **FormView** - Data-driven forms with validation

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

# Development server (start here!)
npm run dev

# Optional: Reconfigure app layout
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
