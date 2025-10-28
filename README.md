# PatternFly Next.js Starter

A modern Next.js application with PatternFly components and intelligent component extraction capabilities.

## Features

- ✅ **Next.js 15+** with App Router
- ✅ **PatternFly v6** React components
- ✅ **TypeScript** support
- ✅ **Dynamic routing** with file-based routing
- ✅ **Component extraction engine** for PatternFly components
- ✅ **AI-friendly metadata** for conversational development

## Project Structure

```
patternfly-nextjs-clean/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── (dashboard)/       # Route group
│   │   ├── support/
│   │   └── settings/
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   └── ui/                # UI components (generated)
│   └── lib/                   # Utilities
├── modules/                    # Component extraction engine
│   ├── cli/
│   ├── extractor/
│   └── generator/
└── .ephemeral/                # Archived old code
```

## Development

This project uses Next.js with the App Router pattern. The component extraction engine in `modules/` can analyze PatternFly components and generate framework-agnostic schemas for use in multiple frameworks.

## License

MIT
