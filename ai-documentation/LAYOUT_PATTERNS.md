# PatternFly Layout Patterns

## Overview

This starter wraps the App Router in a PatternFly `Page` layout via the custom
`AppShell`. The shell supplies a masthead, sidebar, and main content area that
all feature pages render into.

## Root Layout

- `src/app/layout.tsx` imports global styles and renders `<AppWrapper>`
- `AppWrapper` provides error boundaries and instantiates `AppShell`
- `AppShell` composes `Page`, `Masthead`, and `Nav` components from
  PatternFly React

```tsx
// layout.tsx (excerpt)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
```

## Page Sections

- Use `PageSection` and `PageGroup` within content patterns to create visual
  rhythm
- Prefer PatternFly spacing tokens and variants (default, light, noPadding,
  etc.) to maintain consistency
- Keep page-level state inside the corresponding content-pattern component and
  pass data/handlers from the App Router page

## Navigation

- Navigation items are sourced from `src/app/routes.json`, which `AppWrapper`
  imports and passes to the shell.
- Keep navigation shallow; add group labels to the JSON only when you need
  grouped lists or horizontal navigation.

## Content Patterns

The starter exposes ready-made page layouts under `components/content-patterns`. Each file is tagged with a “SAMPLE CONTENT PATTERN” banner to make it clear the implementation is optional:

- `CardView` – selectable card gallery with toolbar actions
- `DashboardView` – KPI cards + PatternFly charts
- `FormView` – data-driven form rendered from JSON schema
- `PrimaryDetailView` – master/detail experience with PatternFly Drawer
- `TableView` – searchable, paginated table with bulk actions

Use these as references when building new PatternFly experiences: each pattern
shows recommended toolbar placement, pagination, empty states, and selection
behavior aligned with PatternFly guidelines.
