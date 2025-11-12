# Routes Manifest

## Location

- `src/app/routes.json` (single source of truth)
- Imported by `AppWrapper` at build time and passed to `AppShell`
- When demo content is disabled, the manifest defaults to a single Home entry.

## Schema

`routes.json` exports a plain array of navigation items:

```json
[
  { "path": "/", "title": "Home" },
  { "path": "/dashboard", "title": "Dashboard" },
  { "path": "/analytics", "title": "Analytics", "group": "Reports" }
]
```

Fields:

- `path` (required): must match a route directory in `src/app/`
- `title` (required): label shown in navigation
- `group` (optional): when specified, groups related links in the sidebar masthead (future flexibility)

The runtime reads the array in order; no additional sorting or filtering is applied.

## Managing Routes

- **Quick Start:** `npm run quick-start` rewrites demo pages (when requested) and refreshes `src/app/routes.json` to list the generated routes.
- **Manual edits:** Update `routes.json` directly to add, remove, or rename links. Array ordering becomes the sidebar ordering.

## Error Handling

- Missing file → the Next.js build fails because `AppWrapper` cannot import the manifest.
- Invalid JSON → the build fails with a parse error.
- Unknown fields → ignored by the UI (they are preserved in the manifest but not consumed yet).
