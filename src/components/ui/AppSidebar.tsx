"use client";

import { useState, useEffect } from "react";
import {
  PageSidebar,
  PageSidebarBody,
  Nav,
  NavList,
  NavItem,
} from "@patternfly/react-core";
import { usePathname, useRouter } from "next/navigation";
import { useRoutes } from "@/lib/navigation/useRoutes";

export function AppSidebar({
  items,
  isOpen,
}: {
  items?: { path: string; title: string; group?: string }[];
  isOpen: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = useRoutes();
  const navItems = items ?? routes;

  // Find the index of the current active route
  const getActiveItemId = () => {
    const index = navItems.findIndex(
      (item) => pathname === item.path || pathname.startsWith(item.path + "/")
    );
    return index >= 0 ? index : 0;
  };

  const [activeItem, setActiveItem] = useState(() => getActiveItemId());

  // Update activeItem when pathname changes (syncing Next.js routing with React state)
  // This is necessary to keep the UI in sync with Next.js router state
  useEffect(() => {
    const index = navItems.findIndex(
      (item) => pathname === item.path || pathname.startsWith(item.path + "/")
    );
    setActiveItem(index >= 0 ? index : 0);
    // eslint-disable-next-line react-compiler/react-compiler
  }, [pathname, navItems]);

  const onSelect = (
    _event: React.FormEvent<HTMLInputElement>,
    result: { itemId: number | string }
  ) => {
    const itemId = result.itemId as number;
    setActiveItem(itemId);
    const selectedItem = navItems[itemId];
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };

  // Debug: ensure we have routes to render
  if (navItems.length === 0) {
    return (
      <PageSidebar isSidebarOpen={isOpen} id="vertical-sidebar">
        <PageSidebarBody>
          <Nav
            onSelect={onSelect}
            aria-label="Default global"
            suppressHydrationWarning
          >
            <NavList>
              <NavItem
                preventDefault
                itemId={0}
                isActive={activeItem === 0}
                onClick={() => router.push("/")}
              >
                Home
              </NavItem>
            </NavList>
          </Nav>
        </PageSidebarBody>
      </PageSidebar>
    );
  }

  const hasGroups = navItems.some((i) => i.group);
  const grouped = hasGroups
    ? navItems.reduce((acc: Record<string, typeof navItems>, item) => {
        const key = item.group || "Other";
        (acc[key] = acc[key] || []).push(item);
        return acc;
      }, {})
    : { "": navItems };

  // Create a flat list with indices for itemId mapping
  const flatItems = Object.entries(grouped).flatMap(([, groupItems]) =>
    groupItems.map((item) => item)
  );

  return (
    <PageSidebar isSidebarOpen={isOpen} id="vertical-sidebar">
      <PageSidebarBody>
        <Nav
          onSelect={onSelect}
          aria-label="Default global"
          suppressHydrationWarning
        >
          {Object.entries(grouped).map(([groupName, groupItems]) => (
            <NavList
              key={groupName}
              title={hasGroups && groupName ? groupName : undefined}
            >
              {groupItems.map((item) => {
                // Find the index in the flat list
                const itemIndex = flatItems.findIndex(
                  (fi) => fi.path === item.path
                );
                return (
                  <NavItem
                    key={item.path}
                    preventDefault
                    itemId={itemIndex}
                    isActive={activeItem === itemIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.path);
                    }}
                  >
                    {item.title}
                  </NavItem>
                );
              })}
            </NavList>
          ))}
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );
}
