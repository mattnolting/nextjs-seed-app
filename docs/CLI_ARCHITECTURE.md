# CLI Architecture: Hybrid Action-First Pattern

## Command Structure

```
# Primary Actions (standalone commands)
npm run quick-start                     # Bootstrap everything

# Generate (with targets)
npm run generate layout                # Interactive layout generation
npm run generate component <name>      # Generate component
npm run generate page <path>           # Generate page

# Sync (with targets)
npm run sync routes                    # Sync public/routes.json

# Config (with targets)
npm run config navigation              # Configure navigation
npm run config layout                  # Re-run layout setup
```

## Implementation

```json
{
  "scripts": {
    "quick-start": "tsx cli/commands/quick-start.ts",
    "generate": "tsx cli/index.ts generate",
    "sync": "tsx cli/index.ts sync",
    "config": "tsx cli/index.ts config"
  }
}
```

## Architecture

```
cli/
├── index.ts                          # Entry point, routes to subcommands
├── commands/
│   ├── quick-start.ts                # Standalone: bootstrap everything
│   ├── generate/
│   │   ├── layout.ts                 # generate layout (interactive)
│   │   ├── component.ts              # generate component <name> [--verbose]
│   │   └── page.ts                   # generate page <path> [--type]
│   ├── sync/
│   │   └── routes.ts                 # sync routes
│   └── config/
│       ├── navigation.ts             # config navigation (interactive)
│       └── layout.ts                 # config layout (re-run bootstrap)
├── utils/
│   ├── bootstrap-check.ts            # Shared: bootstrap state check
│   ├── bootstrap-setup.ts            # Shared: run bootstrap prompts
│   └── routes.ts                     # Shared: filesystem scanning
└── templates/
    └── page.ts                       # Page template(s)
```

## Usage Examples

```bash
# Bootstrap
npm run quick-start
# → AppShell + UI + content-patterns + demo pages + public/routes.json

# Generate
npm run generate component Button
npm run generate page /orders

# Configure navigation
npm run config navigation

# Sync routes with filesystem
npm run sync routes
```

## Rationale

- Action-first is intuitive ("generate page" > "page generate")
- Minimal surface area (4 actions: quick-start, generate, sync, config)
- Extensible (add new targets under each action)
- Interactive when needed; direct when simple
- Clear mental model: actions + targets
