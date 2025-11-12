import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Next.js app router hooks used by components under test
vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/",
    useRouter: () => ({ push: vi.fn() }),
  };
});
