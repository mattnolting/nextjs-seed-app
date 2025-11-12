"use client";

import type { AppData } from "./types";
import { demoData } from "./seed";

/**
 * Hook to load app data for demo content
 * Returns static data so components remain fully client-side.
 */
export function useAppData(): {
  data: AppData | null;
  loading: boolean;
  error: Error | null;
} {
  return { data: demoData, loading: false, error: null };
}
