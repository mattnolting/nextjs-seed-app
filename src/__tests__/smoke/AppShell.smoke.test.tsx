import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/ui/AppShell";

describe("AppShell", () => {
  it("renders masthead, sidebar, and children without crashing", () => {
    render(
      <AppShell>
        <div data-testid="content">Hello</div>
      </AppShell>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
