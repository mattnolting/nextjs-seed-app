# Routes Manifest

## Location

- `public/routes.json` (served statically)
- Consumed by `src/lib/navigation/useRoutes.ts` on the client

## Schema

```json
{
  "routes": [
    {
      "path": "/dashboard",
      "title": "Dashboard",
      "icon": "HistoryIcon",
      "order": 1,
      "priority": 1,
      "group": "Reports",
      "hidden": false,
      "description": "Main dashboard"
    }
  ],
  "lastSynced": "2025-01-01T00:00:00.000Z"
}
```

Fields:

- `path` (required): must match a route directory in `src/app/`
- `title` (required): label shown in navigation
- `icon` (optional): PatternFly icon name (future rendering)
- `order` (optional): explicit ordering (lower appears first)
- `priority` (optional): legacy ordering key; treated like `order`
- `group` (optional): enables grouped navigation (future)
- `hidden` (optional): exclude route from navigation
- `description` (optional): tooltip/aria helper text
- `lastSynced` (optional): informational timestamp recorded by automation

## Ordering Rules

- Default: appearance order in `routes.json` is used
- If any route specifies `order` or `priority`, a stable sort is applied by `(order || priority)`, with original index as tiebreaker
- Hidden routes are omitted from the sidebar

## Managing Routes

- **Quick Start:** `npm run quick-start` rebuilds demo pages and refreshes
  `public/routes.json` to match the scaffolded content.
- **Manual edits:** You can edit `routes.json` directly for custom ordering,
  titles, or advanced metadata. Keep paths aligned with `src/app/` routes.

> The legacy `sync routes` command has been removed while the CLI is being
> redesigned. Future phases will reintroduce targeted sync tooling.

## Error Handling

- Missing file → `useRoutes()` returns an empty list and logs a dev warning
- Fetch error → dev warning; sidebar renders with no items
- Invalid fields → ignored; defaults applied

## Examples

Minimal:

```json
{
  "routes": [
    { "path": "/", "title": "Home" },
    { "path": "/dashboard", "title": "Dashboard" }
  ]
}
```

Explicit ordering:

```json
{
  "routes": [
    { "path": "/dashboard", "title": "Dashboard", "order": 1 },
    { "path": "/analytics", "title": "Analytics", "order": 2 }
  ]
}
```
