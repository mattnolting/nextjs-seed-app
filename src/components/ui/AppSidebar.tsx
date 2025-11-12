"use client";

import {
  PageSidebar,
  PageSidebarBody,
  Nav,
  NavList,
  NavItem,
} from "@patternfly/react-core";
import { usePathname, useRouter } from "next/navigation";
import type { NavItem as ShellNavItem } from "@/components/ui/AppShell";

export function AppSidebar({
  items,
  isOpen,
}: {
  items?: ShellNavItem[];
  isOpen: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems =
    items && items.length > 0
      ? items
      : [
          {
            path: "/",
            title: "Home",
          },
        ];

  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
  };

  return (
    <PageSidebar isSidebarOpen={isOpen} id="vertical-sidebar">
      <PageSidebarBody>
        <div suppressHydrationWarning>
          <Nav
            onSelect={(_event, result) => {
              const targetPath = String(result.itemId);
              if (targetPath) {
                router.push(targetPath);
              }
            }}
            aria-label="Default global"
            ouiaId="app-sidebar-nav"
          >
            <NavList>
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  preventDefault
                  itemId={item.path}
                  isActive={isActive(item.path)}
                  onClick={(event) => {
                    event.preventDefault();
                    router.push(item.path);
                  }}
                  ouiaId={`nav-item-${item.path.replace(/\//g, "-") || "home"}`}
                >
                  {item.title}
                </NavItem>
              ))}
            </NavList>
          </Nav>
        </div>
      </PageSidebarBody>
    </PageSidebar>
  );
}
