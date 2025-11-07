"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect /dashboard to / (home)
 * Dashboard is now the home page
 */
export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
