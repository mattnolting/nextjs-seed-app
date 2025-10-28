# CLI Testing Instructions

## How to Test the CLI

Run the CLI from the `src/` directory:

```bash
cd src
npm run cli
```

Then follow the interactive prompts.

## Expected Behavior

1. You'll see a menu to select layout type
2. Enter a component name (default will be PascalCase)
3. Choose whether to include example content
4. Optionally generate a route page
5. Files are generated in `src/components/layouts/`

## Manual Test Steps

Test each layout type:

```bash
# Test Dashboard Layout
npm run cli
# Select: Dashboard
# Name: TestDashboard
# Include example: Y
# Generate page: N

# Test Gallery Layout
npm run cli
# Select: Gallery
# Name: TestGallery
# Include example: Y
# Generate page: N

# Test Table Layout
npm run cli
# Select: Table
# Name: TestTable
# Include example: Y
# Generate page: N

# Test Split View Layout
npm run cli
# Select: Split View
# Name: TestSplitView
# Include example: Y
# Generate page: N
```

## Verification

After generation, verify:

1. ✅ Files exist in `src/components/layouts/`
2. ✅ Files contain `"use client"` directive
3. ✅ Imports are correct for PatternFly
4. ✅ TypeScript interfaces are properly defined
5. ✅ Components have JSDoc comments

## Next Step: Build Test

After generating, try building:

```bash
npm run build
```

If build succeeds, Phase 2 is complete! 🎉

