"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";

/**
 * Dashboard (Home) page - PatternFly Basic Dashboard Demo
 * 
 * Matches the structure from:
 * https://www.patternfly.org/patterns/dashboard/html-demos/basic/
 * 
 * Features:
 * - Title section with description
 * - KPI cards in a grid (4 cards)
 * - Charts in a gallery (Area, Bar, Donut)
 * - Additional sections
 */
export default function Dashboard() {
  return <DashboardView title="Dashboard" />;
}
