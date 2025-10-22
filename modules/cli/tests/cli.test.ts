import { PatternFlyCLI } from "../patternfly-cli";

describe("PatternFly CLI", () => {
  test("should initialize CLI successfully", () => {
    const cli = new PatternFlyCLI();
    expect(cli).toBeDefined();
  });

  test("should have available components", () => {
    const cli = new PatternFlyCLI();
    // Access private property for testing
    const availableComponents = (cli as any).availableComponents;
    expect(availableComponents).toBeDefined();
    expect(availableComponents.length).toBeGreaterThan(0);
    expect(availableComponents[0]).toHaveProperty("name");
    expect(availableComponents[0]).toHaveProperty("description");
    expect(availableComponents[0]).toHaveProperty("category");
  });

  test("should have Button component available", () => {
    const cli = new PatternFlyCLI();
    const availableComponents = (cli as any).availableComponents;
    const buttonComponent = availableComponents.find(
      (c: any) => c.name === "Button"
    );
    expect(buttonComponent).toBeDefined();
    expect(buttonComponent.name).toBe("Button");
    expect(buttonComponent.category).toBe("Actions");
  });

  test("should have Alert component available", () => {
    const cli = new PatternFlyCLI();
    const availableComponents = (cli as any).availableComponents;
    const alertComponent = availableComponents.find(
      (c: any) => c.name === "Alert"
    );
    expect(alertComponent).toBeDefined();
    expect(alertComponent.name).toBe("Alert");
    expect(alertComponent.category).toBe("Feedback");
  });
});
