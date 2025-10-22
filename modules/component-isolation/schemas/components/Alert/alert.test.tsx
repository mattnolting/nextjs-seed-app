import { render, screen } from "@testing-library/react";
import { Alert } from "./alert";

describe("Alert", () => {
  it("renders without crashing", () => {
    render(<Alert>Test content</Alert>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Alert className="custom-class">Test</Alert>);
    expect(screen.getByText("Test")).toHaveClass("custom-class");
  });
});
