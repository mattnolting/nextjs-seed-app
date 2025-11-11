# CLI Architecture (Phase 1)

The current CLI surface is intentionally small while the broader generator
system is being redesigned. Only the quick-start workflow ships in this phase;
the other subcommands have been removed to avoid stale entry points.

## Command Surface

```
npm run quick-start   # Reconfigure layout and regenerate demo content
```

## Implementation

```json
{
  "scripts": {
    "quick-start": "tsx cli/commands/quick-start.ts"
  }
}
```

## Directory Layout

```
cli/
├── commands/
│   └── quick-start.ts          # Standalone bootstrap and rebuild script
├── generators/
│   └── quick-start.ts          # Implements scaffold + demo content creation
├── utils/
│   ├── bootstrap-check.ts      # Shared: detect existing layout configuration
│   ├── bootstrap-setup.ts      # Shared: interactive bootstrap prompts
│   └── routes.ts               # Shared: filesystem route scanning
└── tsconfig.json
```

## Usage

```bash
npm run quick-start
# → Re-run bootstrap, rebuild AppShell, recreate demo pages, update routes.json
```

## Roadmap

- Additional generators (page/component/layout) will return in a future phase
- Sync and config commands will be reintroduced once their UX is finalized
- The quick-start flow remains the canonical way to refresh the demo experience
