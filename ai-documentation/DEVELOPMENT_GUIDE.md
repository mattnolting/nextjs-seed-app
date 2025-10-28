# Development Guide

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

## Component Extraction

This project includes a component extraction engine in `modules/` that can:

- Analyze PatternFly React components
- Extract schema metadata
- Generate framework-agnostic templates

## Adding New Components

1. Use the CLI: `npm run cli`
2. Select components to extract
3. Generate isolated components
4. Integrate into the app directory

## Testing

- Unit tests in `__tests__/unit/`
- Integration tests in `__tests__/integration/`
- E2E tests in `__tests__/e2e/`

## Deployment

This project can be deployed to:

- Vercel (recommended for Next.js)
- Any Node.js hosting platform
- Static export for static sites
