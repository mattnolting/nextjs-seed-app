import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Next.js app router hooks used by components under test
vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/",
    useRouter: () => ({ push: vi.fn() }),
  };
});

// Avoid async state updates in sidebar by stubbing useRoutes
vi.mock("@/lib/navigation/useRoutes", () => {
  return {
    useRoutes: () => [{ path: "/", title: "Home" }],
  };
});

// Provide a deterministic fetch for routes.json used by useRoutes()
if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = vi.fn();
}

(globalThis as any).fetch = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : (input as URL).toString();
  if (url.endsWith("/routes.json") || url.endsWith("routes.json")) {
    return {
      ok: true,
      json: async () => ({
        routes: [
          { path: "/", title: "Home" },
          { path: "/dashboard", title: "Dashboard" },
        ],
      }),
    } as any;
  }
  return { ok: true, json: async () => ({}) } as any;
});
