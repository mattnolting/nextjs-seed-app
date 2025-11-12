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
- **Important:** Content-pattern components handle their own `PageSection` structure.
  Pages should not wrap components in additional `PageSection` wrappers, as this
  creates nested sections and doubles padding. Pages can add their own headers if
  needed, but headers are not automated.

## Navigation

- Navigation items are sourced from `src/app/routes.json`, which `AppWrapper`
  imports and passes to the shell.
- Keep navigation shallow; add group labels to the JSON only when you need
  grouped lists or horizontal navigation.

## Content Patterns

The starter exposes ready-made page layouts under `components/content-patterns`. Each file is tagged with a "SAMPLE CONTENT PATTERN" banner to make it clear the implementation is optional:

- `CardView` – selectable card gallery with toolbar actions
- `DashboardView` – KPI cards + PatternFly charts
- `FormView` – data-driven form rendered from JSON schema
- `PrimaryDetailView` – master/detail experience with PatternFly Drawer
- `TableView` – searchable, paginated table with bulk actions

### Self-Contained Components

All content-pattern components are self-contained and work independently:
- Components fetch their own default data from `src/lib/data/seed.ts` when props aren't provided
- All props are optional with sensible defaults
- Components can be dropped into pages without any configuration: `<CardView />` or `<TableView />`
- Easy to customize by providing props or replacing component logic

### Simplified Page Structure

Pages follow a simple, consistent structure:
- No duplicate `PageSection` wrappers (components handle their own sections)
- No automated page headers (flexibility for manual headers when needed)
- Pages can add their own headers if needed, but it's not automated
- Content-pattern components handle their own `PageSection` structure internally

Example page structure:
```tsx
// Simple page - component handles everything
export default function Dashboard() {
  return <DashboardView title="Dashboard" />;
}

// Page with custom header
export default function CustomPage() {
  return (
    <>
      <PageSection isWidthLimited>
        <Content>
          <Title headingLevel="h1">Custom Header</Title>
        </Content>
      </PageSection>
      <CardView title="My Cards" />
    </>
  );
}
```

Use these as references when building new PatternFly experiences: each pattern
shows recommended toolbar placement, pagination, empty states, and selection
behavior aligned with PatternFly guidelines.

## CSS Configuration

The `src/app/globals.css` file includes comprehensive documentation for all PatternFly CSS files. This documentation addresses common developer pain points:

1. **Discoverability** – PatternFly CSS files can be hard to find in `node_modules/@patternfly/patternfly/`
2. **Understanding differences** – It's challenging to understand the differences between various CSS files
3. **Combination guidance** – Clear guidance on how to combine files to suit individual needs

The documentation includes detailed descriptions, line counts, use cases, effects, and four recommended setup configurations. See `src/app/globals.css` for complete details.
