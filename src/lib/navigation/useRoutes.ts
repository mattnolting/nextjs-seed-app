"use client";

import { useEffect, useState } from "react";

export interface NavRoute {
  path: string;
  title: string;
  priority?: number;
  icon?: string;
  order?: number;
  hidden?: boolean;
  group?: string;
}

export function useRoutes(): NavRoute[] {
  const [routes, setRoutes] = useState<NavRoute[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/routes", { cache: "no-store" });
        if (!res.ok) {
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
              "useRoutes: failed to fetch routes manifest (",
              res.status,
              ")"
            );
          }
          return;
        }
        const data = await res.json();
        let list: NavRoute[] = Array.isArray(data?.routes) ? data.routes : [];
        // Filter hidden
        list = list.filter((r) => !r.hidden);
        // Preserve appearance order by default. If any route defines order/priority, apply stable ordering by that key.
        const hasOrdering = list.some(
          (r) => typeof r.order === "number" || typeof r.priority === "number"
        );
        if (hasOrdering) {
          list = list
            .map((r, idx) => ({ r, idx }))
            .sort((a, b) => {
              const ao = a.r.order ?? a.r.priority ?? Number.MAX_SAFE_INTEGER;
              const bo = b.r.order ?? b.r.priority ?? Number.MAX_SAFE_INTEGER;
              if (ao !== bo) return ao - bo;
              return a.idx - b.idx; // stable fallback
            })
            .map(({ r }) => r);
        }
        if (!cancelled) setRoutes(list);
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("useRoutes: error loading routes manifest", err);
        }
        if (!cancelled) setRoutes([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return routes;
}
