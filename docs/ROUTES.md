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
- `lastSynced` (optional): informational; updated by sync command

## Ordering Rules

- Default: appearance order in `routes.json` is used
- If any route specifies `order` or `priority`, a stable sort is applied by `(order || priority)`, with original index as tiebreaker
- Hidden routes are omitted from the sidebar

## Sync Command

```
npm run sync routes
```

Behavior:

- Scans `src/app/` for `page.tsx`
- Preserves existing `routes.json` order and metadata
- Appends newly discovered routes at the end
- Removes entries for deleted routes
- Writes to `public/routes.json`

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
