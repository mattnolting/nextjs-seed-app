# Phase 2: CLI Layout System - Design Document

**Date:** October 28, 2025
**Status:** 📝 DESIGN PHASE

---

## 🎯 Overview

Build an interactive CLI that generates PatternFly layout components for Next.js App Router applications, focusing on **simplicity**, **scalability**, and **testability**.

---

## 🤔 Key Considerations & Decisions

### 1. **CLI Architecture**

**Question:** Where should the CLI live?

**Options:**

- ✅ **Root-level `cli/` directory** - Separate from app code, runs via `npm run cli`
- ❌ `src/cli/` - Mixes CLI with app code
- ❌ Separate npm package - Over-engineered for a starter

**Decision:** Root-level `cli/` directory with entry point at `cli/index.ts`

**Why:**

- Clear separation of concerns
- Easy to maintain and test
- Can be easily extracted to a separate package later

---

### 2. **Client vs Server Components**

**Critical Learning from Phase 1:**

- PatternFly components require `"use client"` directive
- This MUST be included in all generated layout files

**Decision:** All generated layout components will be **client components** by default.

**Template Header:**

```typescript
"use client";

import /* PatternFly imports */ "@patternfly/react-core";
```

---

### 3. **File Generation Strategy**

**Question:** Where do generated files go?

**Decision:**

```
src/
├── app/
│   └── [route]/
│       └── page.tsx              # Uses generated layout
└── components/
    └── layouts/
        ├── DashboardLayout.tsx   # Generated
        ├── GalleryLayout.tsx     # Generated
        ├── TableLayout.tsx       # Generated
        └── SplitViewLayout.tsx   # Generated
```

**Why:**

- Layouts are reusable components (not tied to routes)
- Pages import and use layouts as needed
- Follows Next.js best practices

---

### 4. **Template Approach**

**Options:**

1. **JSON Schema + Template Strings** ✅
2. TypeScript AST Generation (complex)
3. Pure template literals (not flexible enough)

**Decision:** Hybrid approach

- JSON defines layout structure and metadata
- TypeScript template functions generate code
- Balance between simplicity and flexibility

---

### 5. **TypeScript Support**

**Decision:** Full TypeScript with:

- Proper interface definitions
- Type-safe props
- Export named types for reusability

---

### 6. **Customization Options**

**Interactive Prompts:**

1. Layout type (dashboard, gallery, table, split-view)
2. Component name (default or custom)
3. Route to integrate with (optional)
4. Include example content? (yes/no)

---

### 7. **Testing Strategy**

**Must Test:**

- CLI prompt flow
- File generation (correct content)
- Generated components compile
- Generated components render without errors

**Test Structure:**

```
__tests__/
├── cli/
│   ├── prompts.test.ts
│   └── generators.test.ts
└── components/
    └── layouts/
        └── generated-layouts.test.tsx
```

---

## 📋 Template Examples

### **Layout Schema Format (JSON)**

```json
{
  "name": "Dashboard",
  "description": "A dashboard layout with header, sidebar, and main content area",
  "category": "layout",
  "patternflyComponents": [
    "Page",
    "Masthead",
    "MastheadMain",
    "MastheadBrand",
    "PageSidebar",
    "PageSidebarBody",
    "Nav",
    "NavList",
    "NavItem",
    "PageSection"
  ],
  "requiredProps": {
    "children": {
      "type": "React.ReactNode",
      "description": "Main content to render"
    }
  },
  "optionalProps": {
    "title": {
      "type": "string",
      "default": "Dashboard",
      "description": "Page title"
    },
    "showSidebar": {
      "type": "boolean",
      "default": true,
      "description": "Show or hide sidebar"
    }
  },
  "imports": ["@patternfly/react-core", "@patternfly/react-icons"],
  "structure": {
    "root": "Page",
    "children": [
      {
        "component": "Masthead",
        "children": ["MastheadMain", "MastheadBrand"]
      },
      {
        "component": "PageSidebar",
        "conditional": "showSidebar",
        "children": ["PageSidebarBody", "Nav"]
      },
      {
        "component": "PageSection",
        "props": {
          "children": "{children}"
        }
      }
    ]
  }
}
```

---

### **Generated Component Example: DashboardLayout.tsx**

````typescript
"use client";

import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageSection,
  Nav,
  NavList,
  NavItem,
} from "@patternfly/react-core";
import { DashboardIcon, ChartLineIcon, CogIcon } from "@patternfly/react-icons";
import { useState } from "react";

export interface DashboardLayoutProps {
  /** Main content to render in the dashboard */
  children: React.ReactNode;
  /** Page title displayed in header */
  title?: string;
  /** Show or hide sidebar navigation */
  showSidebar?: boolean;
}

/**
 * DashboardLayout Component
 *
 * A responsive dashboard layout with header, sidebar navigation, and main content area.
 * Built with PatternFly components for consistency and accessibility.
 *
 * @example
 * ```tsx
 * <DashboardLayout title="My Dashboard">
 *   <YourContent />
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  children,
  title = "Dashboard",
  showSidebar = true,
}: DashboardLayoutProps) {
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const header = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>{title}</MastheadBrand>
      </MastheadMain>
    </Masthead>
  );

  const sidebar = showSidebar ? (
    <PageSidebar>
      <PageSidebarBody>
        <Nav>
          <NavList>
            <NavItem
              itemId="dashboard"
              isActive={activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
            >
              <DashboardIcon /> Dashboard
            </NavItem>
            <NavItem
              itemId="analytics"
              isActive={activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
            >
              <ChartLineIcon /> Analytics
            </NavItem>
            <NavItem
              itemId="settings"
              isActive={activeItem === "settings"}
              onClick={() => setActiveItem("settings")}
            >
              <CogIcon /> Settings
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  ) : null;

  return (
    <Page header={header} sidebar={sidebar}>
      <PageSection>{children}</PageSection>
    </Page>
  );
}
````

---

### **Generated Component Example: GalleryLayout.tsx**

````typescript
"use client";

import {
  Page,
  PageSection,
  Gallery,
  GalleryItem,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "@patternfly/react-core";

export interface GalleryItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface GalleryLayoutProps {
  /** Array of items to display in gallery */
  items: GalleryItem[];
  /** Number of columns (min width per item) */
  minWidths?: {
    default?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

/**
 * GalleryLayout Component
 *
 * A responsive gallery layout for displaying cards in a grid.
 * Automatically adjusts columns based on screen size.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: "1", title: "Card 1", content: <div>Content</div> },
 *   { id: "2", title: "Card 2", content: <div>Content</div> },
 * ];
 *
 * <GalleryLayout items={items} />
 * ```
 */
export function GalleryLayout({
  items,
  minWidths = {
    default: "100%",
    md: "300px",
    lg: "350px",
    xl: "400px",
  },
}: GalleryLayoutProps) {
  return (
    <Page>
      <PageSection>
        <Gallery hasGutter minWidths={minWidths}>
          {items.map((item) => (
            <GalleryItem key={item.id}>
              <Card isFullHeight>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardBody>{item.content}</CardBody>
              </Card>
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>
    </Page>
  );
}
````

---

### **Generated Component Example: TableLayout.tsx**

````typescript
"use client";

import {
  Page,
  PageSection,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
  Pagination,
} from "@patternfly/react-core";
import { useState } from "react";

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
}

export interface TableLayoutProps<T = any> {
  /** Column definitions */
  columns: TableColumn[];
  /** Data rows */
  data: T[];
  /** Enable search functionality */
  searchable?: boolean;
  /** Enable pagination */
  paginated?: boolean;
  /** Items per page (if paginated) */
  perPage?: number;
}

/**
 * TableLayout Component
 *
 * A data table layout with optional search and pagination.
 * Built on PatternFly Table component.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { key: "name", title: "Name", sortable: true },
 *   { key: "email", title: "Email" },
 * ];
 *
 * const data = [
 *   { name: "John", email: "john@example.com" },
 *   { name: "Jane", email: "jane@example.com" },
 * ];
 *
 * <TableLayout columns={columns} data={data} searchable paginated />
 * ```
 */
export function TableLayout<T extends Record<string, any>>({
  columns,
  data,
  searchable = false,
  paginated = false,
  perPage = 10,
}: TableLayoutProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = searchable
    ? data.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    : data;

  const paginatedData = paginated
    ? filteredData.slice((page - 1) * perPage, page * perPage)
    : filteredData;

  return (
    <Page>
      <PageSection>
        {(searchable || paginated) && (
          <Toolbar>
            <ToolbarContent>
              {searchable && (
                <ToolbarItem>
                  <SearchInput
                    placeholder="Search"
                    value={searchValue}
                    onChange={(_, value) => setSearchValue(value)}
                    onClear={() => setSearchValue("")}
                  />
                </ToolbarItem>
              )}
              {paginated && (
                <ToolbarItem alignment={{ default: "alignRight" }}>
                  <Pagination
                    itemCount={filteredData.length}
                    perPage={perPage}
                    page={page}
                    onSetPage={(_, newPage) => setPage(newPage)}
                  />
                </ToolbarItem>
              )}
            </ToolbarContent>
          </Toolbar>
        )}
        <Table>
          <Thead>
            <Tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.title}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((row, idx) => (
              <Tr key={idx}>
                {columns.map((col) => (
                  <Td key={col.key} dataLabel={col.title}>
                    {row[col.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </Page>
  );
}
````

---

### **Generated Component Example: SplitViewLayout.tsx**

````typescript
"use client";

import {
  Page,
  PageSection,
  Split,
  SplitItem,
  Divider,
} from "@patternfly/react-core";

export interface SplitViewLayoutProps {
  /** Left panel content */
  leftPanel: React.ReactNode;
  /** Right panel content */
  rightPanel: React.ReactNode;
  /** Left panel width percentage (default: 50) */
  leftWidth?: number;
  /** Show vertical divider between panels */
  showDivider?: boolean;
  /** Orientation */
  orientation?: "vertical" | "horizontal";
}

/**
 * SplitViewLayout Component
 *
 * A split-view layout with two resizable panels.
 * Useful for master-detail views, editors, etc.
 *
 * @example
 * ```tsx
 * <SplitViewLayout
 *   leftPanel={<ListComponent />}
 *   rightPanel={<DetailComponent />}
 *   leftWidth={40}
 * />
 * ```
 */
export function SplitViewLayout({
  leftPanel,
  rightPanel,
  leftWidth = 50,
  showDivider = true,
  orientation = "vertical",
}: SplitViewLayoutProps) {
  return (
    <Page>
      <PageSection>
        <Split hasGutter={showDivider}>
          <SplitItem style={{ flex: `0 0 ${leftWidth}%` }}>
            {leftPanel}
          </SplitItem>
          {showDivider && <Divider orientation={orientation} />}
          <SplitItem isFilled>{rightPanel}</SplitItem>
        </Split>
      </PageSection>
    </Page>
  );
}
````

---

## 📂 Project Structure (After Phase 2)

```
nextjs-seed-app/
├── cli/
│   ├── index.ts                    # CLI entry point
│   ├── commands/
│   │   └── generate-layout.ts     # Layout generation command
│   ├── prompts/
│   │   └── layout-prompts.ts      # Interactive questions
│   ├── generators/
│   │   └── layout-generator.ts    # Code generation logic
│   └── templates/
│       ├── dashboard.json         # Dashboard schema
│       ├── gallery.json           # Gallery schema
│       ├── table.json             # Table schema
│       └── split-view.json        # Split-view schema
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── layouts/               # Generated layouts go here
│           ├── DashboardLayout.tsx
│           ├── GalleryLayout.tsx
│           ├── TableLayout.tsx
│           └── SplitViewLayout.tsx
│
└── __tests__/
    ├── cli/
    │   └── generators.test.ts
    └── components/
        └── layouts/
            └── layouts.test.tsx
```

---

## 🚀 CLI User Experience

### **Command:**

```bash
npm run cli
```

### **Interactive Flow:**

```
? What would you like to generate? (Use arrow keys)
❯ Layout Component
  UI Component (Phase 3)
  Full Page (Phase 3)

? Select a layout type: (Use arrow keys)
❯ Dashboard (Header + Sidebar + Content)
  Gallery (Grid of Cards)
  Table (Data Table with Search/Pagination)
  Split View (Two-Panel Layout)

? Component name: (DashboardLayout)
> CustomDashboard

? Include example content? (Y/n)
> Y

? Generate route page? (Y/n)
> Y

? Route path: (/dashboard)
> /admin

✓ Generated: src/components/layouts/CustomDashboard.tsx
✓ Generated: src/app/admin/page.tsx
✓ All files created successfully!

Next steps:
  1. Review generated files
  2. Customize the layout as needed
  3. Run: npm run dev
  4. Visit: http://localhost:3000/admin
```

---

## 🎯 Benefits of This Approach

### **For Simplicity:**

- ✅ Simple JSON schemas (easy to read/maintain)
- ✅ Template-based generation (predictable output)
- ✅ Clear file organization
- ✅ One command to generate everything

### **For Scalability:**

- ✅ Easy to add new layout types (just add JSON)
- ✅ Layouts are reusable components
- ✅ Can be extended in Phase 3 for component generation
- ✅ Template approach can scale to any complexity

### **For Testing:**

- ✅ Templates can be unit tested
- ✅ Generated code can be snapshot tested
- ✅ CLI flow can be integration tested
- ✅ Generated components can be rendered and tested

---

## ⚠️ Potential Issues & Solutions

### **Issue 1: PatternFly API Changes**

**Risk:** PatternFly v6 API might change in future versions
**Solution:**

- Lock PatternFly versions in package.json
- Include version checks in templates
- Document required PatternFly version

### **Issue 2: File Overwrite**

**Risk:** Accidentally overwriting existing files
**Solution:**

- Check if file exists before generating
- Prompt user for confirmation
- Option to append suffix (e.g., `DashboardLayout_2.tsx`)

### **Issue 3: Import Path Resolution**

**Risk:** Incorrect relative imports
**Solution:**

- Use TypeScript path aliases (`@/components/...`)
- Generate absolute imports from project root
- Test import resolution in generated code

### **Issue 4: Component Naming Conflicts**

**Risk:** Generated component names clash with existing ones
**Solution:**

- Check for existing components
- Allow custom naming
- Follow consistent naming convention

---

## 📊 Success Metrics

After Phase 2 completion, we should be able to:

1. ✅ Run `npm run cli` and see interactive prompts
2. ✅ Generate 4 different layout types
3. ✅ Generated components compile without errors
4. ✅ Generated components render in the browser
5. ✅ Generated code follows TypeScript best practices
6. ✅ Generated layouts are accessible (ARIA attributes)
7. ✅ All generated components have proper documentation
8. ✅ CLI handles edge cases (existing files, invalid names, etc.)

---

## 🔄 Next Steps After Phase 2

**Phase 3 Preview:**

- Extend CLI to generate individual PatternFly components
- Add component discovery from `@patternfly/react-core`
- Generate proper client/server component wrappers
- Handle component props and variations

---

**Ready to build this?** 🚀
