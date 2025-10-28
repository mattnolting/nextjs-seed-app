import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, "../templates");

export async function generateLayoutCode(
  layoutType: string,
  componentName: string,
  includeExample: boolean
): Promise<string> {
  switch (layoutType) {
    case "dashboard":
      return generateDashboardLayout(componentName, includeExample);
    case "gallery":
      return generateGalleryLayout(componentName, includeExample);
    case "table":
      return generateTableLayout(componentName, includeExample);
    case "split-view":
      return generateSplitViewLayout(componentName, includeExample);
    default:
      throw new Error(`Unknown layout type: ${layoutType}`);
  }
}

function generateDashboardLayout(
  componentName: string,
  includeExample: boolean
): string {
  return `"use client";

import {
  Page,
  Masthead,
  MastheadMain,
  MastheadToggle,
  MastheadBrand,
  MastheadLogo,
  MastheadContent,
  PageSidebar,
  PageSidebarBody,
  PageSection,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Nav,
  NavList,
  NavItem,
  Button,
} from "@patternfly/react-core";
import {
  HistoryIcon,
  ChartLineIcon,
  CogIcon,
  BellIcon,
  BarsIcon,
} from "@patternfly/react-icons";
import { useState, useEffect } from "react";

export interface ${componentName}Props {
  /** Main content to render in the dashboard */
  children: React.ReactNode;
  /** Page title displayed in header */
  title?: string;
  /** Show or hide sidebar navigation */
  showSidebar?: boolean;
}

/**
 * ${componentName} Component
 *
 * A responsive dashboard layout with header, sidebar navigation, and main content area.
 * Built with PatternFly components for consistency and accessibility.
 *
 * @example
 * \`\`\`tsx
 * <${componentName} title="My Dashboard">
 *   <YourContent />
 * </${componentName}>
 * \`\`\`
 */
export function ${componentName}({
  children,
  title = "Dashboard",
  showSidebar = true,
}: ${componentName}Props) {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering client-side interactivity after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const headerToolbar = (
    <Toolbar id="vertical-toolbar">
      <ToolbarContent>
        <ToolbarItem>
          <Button variant="plain" aria-label="Notifications" icon={<BellIcon />}>
          </Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button variant="plain" aria-label="Settings" icon={<CogIcon />}>
          </Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            id="vertical-nav-toggle"
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>
            <img src="https://www.patternfly.org/assets/images/pf_logo.svg" alt="PatternFly Logo" />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const sidebar = showSidebar ? (
    <PageSidebar isSidebarOpen={isSidebarOpen} id="vertical-sidebar">
      <PageSidebarBody>
        <Nav suppressHydrationWarning>
          <NavList>
            <NavItem
              itemId="dashboard"
              isActive={mounted && activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
              suppressHydrationWarning
            >
              <HistoryIcon /> Dashboard
            </NavItem>
            <NavItem
              itemId="analytics"
              isActive={mounted && activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
              suppressHydrationWarning
            >
              <ChartLineIcon /> Analytics
            </NavItem>
            <NavItem
              itemId="settings"
              isActive={mounted && activeItem === "settings"}
              onClick={() => setActiveItem("settings")}
              suppressHydrationWarning
            >
              <CogIcon /> Settings
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  ) : null;

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <PageSection>{children}</PageSection>
    </Page>
  );
}
`;
}

function generateGalleryLayout(
  componentName: string,
  includeExample: boolean
): string {
  return `"use client";

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

export interface GalleryItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface ${componentName}Props {
  /** Array of items to display in gallery */
  items: GalleryItemData[];
  /** Number of columns (min width per item) */
  minWidths?: {
    default?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

/**
 * ${componentName} Component
 *
 * A responsive gallery layout for displaying cards in a grid.
 * Automatically adjusts columns based on screen size.
 *
 * @example
 * \`\`\`tsx
 * const items = [
 *   { id: "1", title: "Card 1", content: <div>Content</div> },
 *   { id: "2", title: "Card 2", content: <div>Content</div> },
 * ];
 *
 * <${componentName} items={items} />
 * \`\`\`
 */
export function ${componentName}({
  items,
  minWidths = {
    default: "100%",
    md: "300px",
    lg: "350px",
    xl: "400px",
  },
}: ${componentName}Props) {
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
`;
}

function generateTableLayout(
  componentName: string,
  includeExample: boolean
): string {
  return `"use client";

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

export interface ${componentName}Props<T = any> {
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
 * ${componentName} Component
 *
 * A data table layout with optional search and pagination.
 * Built on PatternFly Table component.
 *
 * @example
 * \`\`\`tsx
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
 * <${componentName} columns={columns} data={data} searchable paginated />
 * \`\`\`
 */
export function ${componentName}<T extends Record<string, any>>({
  columns,
  data,
  searchable = false,
  paginated = false,
  perPage = 10,
}: ${componentName}Props<T>) {
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
`;
}

function generateSplitViewLayout(
  componentName: string,
  includeExample: boolean
): string {
  return `"use client";

import {
  Page,
  PageSection,
  Split,
  SplitItem,
  Divider,
} from "@patternfly/react-core";

export interface ${componentName}Props {
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
 * ${componentName} Component
 *
 * A split-view layout with two resizable panels.
 * Useful for master-detail views, editors, etc.
 *
 * @example
 * \`\`\`tsx
 * <${componentName}
 *   leftPanel={<ListComponent />}
 *   rightPanel={<DetailComponent />}
 *   leftWidth={40}
 * />
 * \`\`\`
 */
export function ${componentName}({
  leftPanel,
  rightPanel,
  leftWidth = 50,
  showDivider = true,
  orientation = "vertical",
}: ${componentName}Props) {
  return (
    <Page>
      <PageSection>
        <Split hasGutter={showDivider}>
          <SplitItem style={{ flex: \`0 0 \${leftWidth}%\` }}>
            {leftPanel}
          </SplitItem>
          {showDivider && <Divider orientation={orientation} />}
          <SplitItem isFilled>{rightPanel}</SplitItem>
        </Split>
      </PageSection>
    </Page>
  );
}
`;
}
