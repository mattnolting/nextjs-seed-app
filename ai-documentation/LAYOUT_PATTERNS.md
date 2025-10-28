# PatternFly Layout Patterns

## Overview

Guidelines for using PatternFly layout components in Next.js applications.

## App Router Integration

### Root Layout

- Use PatternFly's `Page` component as the root container
- Configure header and sidebar using PatternFly components
- Import global CSS in the layout file

### Page Sections

- Use `PageSection` for content areas
- Use appropriate variants for visual hierarchy
- Keep nesting consistent across the application

## Navigation

### Routing

- Use Next.js App Router file-based routing
- Define routes in a configuration object
- Implement client-side navigation with proper state management

### Sidebar Navigation

- Use PatternFly `Nav` components
- Maintain active state based on current route
- Keep navigation hierarchy flat when possible

## Examples

```tsx
// Root Layout Pattern
import { Page } from "@patternfly/react-core";
import Masthead from "@/components/layout/Masthead";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Page header={<Masthead />} sidebar={<Sidebar />}>
          {children}
        </Page>
      </body>
    </html>
  );
}
```
