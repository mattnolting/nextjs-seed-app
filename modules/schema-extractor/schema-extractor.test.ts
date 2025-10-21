import { extractComponentSchema } from "./schema-extractor";
import { ButtonSchema } from "./schema-extractor.types";

describe("Schema Extractor", () => {
  const buttonPath =
    "/Users/mnolting/Web/patternfly-react/packages/react-core/src/components/Button/Button.tsx";

  test("should extract Button component schema", async () => {
    try {
      const schema = await extractComponentSchema(buttonPath);

      // Basic validation
      expect(schema).toBeDefined();
      expect(schema.schemaObject.componentName).toBe("Button");
      expect(schema.schemaObject.props).toBeDefined();
      expect(schema.schemaObject.props.length).toBeGreaterThan(0);

      // Check for key Button props
      const propNames = schema.schemaObject.props.map((p) => p.name);
      expect(propNames).toContain("variant");
      expect(propNames).toContain("size");
      expect(propNames).toContain("isDisabled");

      // Check for Button variants
      expect(schema.schemaObject.variants).toBeDefined();
      expect(schema.schemaObject.variants.length).toBeGreaterThan(0);

      const variantNames = schema.schemaObject.variants.map((v) => v.name);
      expect(variantNames).toContain("ButtonVariant");
      expect(variantNames).toContain("ButtonSize");

      // Check component model
      expect(schema.componentModel.type).toBe("functional");
      expect(schema.componentModel.forwardRef).toBe(true);

      // Check for hooks
      expect(schema.componentModel.hooks).toBeDefined();
      const hookNames = schema.componentModel.hooks.map((h) => h.name);
      expect(hookNames).toContain("useOUIAProps");

      console.log("✅ Button schema extraction successful!");
      console.log("Component:", schema.schemaObject.componentName);
      console.log("Props count:", schema.schemaObject.props.length);
      console.log(
        "Variants:",
        schema.schemaObject.variants.map((v) => v.name)
      );
      console.log(
        "Hooks:",
        schema.componentModel.hooks.map((h) => h.name)
      );
    } catch (error) {
      console.error("❌ Schema extraction failed:", (error as Error).message);
      throw error;
    }
  }, 10000); // 10 second timeout for file operations

  test("should handle file not found error", async () => {
    const nonExistentPath = "/path/to/nonexistent/component.tsx";

    await expect(extractComponentSchema(nonExistentPath)).rejects.toThrow(
      "FILE_NOT_FOUND"
    );
  });

  test("should validate extracted schema", async () => {
    const schema = await extractComponentSchema(buttonPath);

    expect(schema.metadata.validation.isValid).toBe(true);
    expect(schema.metadata.validation.errors).toHaveLength(0);
  });
});
