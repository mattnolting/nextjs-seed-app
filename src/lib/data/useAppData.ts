"use client";

import { useEffect, useState } from "react";
import type { AppData } from "./types";

/**
 * Hook to load app data from JSON file
 * Provides all component data in a single source of truth
 */
export function useAppData() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/app-data.json", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load app-data.json: ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          if (process.env.NODE_ENV !== "production") {
            console.warn("useAppData: error loading app-data.json", err);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

