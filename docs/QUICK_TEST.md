# Quick CLI Test Instructions

## Test the CLI Now

Run this command from the `src/` directory:

```bash
cd src
npm run cli layout
```

Then manually answer the prompts:

1. Select: **Dashboard (Header + Sidebar + Content)**
2. Component name: **DashboardTest**
3. Include example content: **No** (press Enter for No)
4. Generate route page: **No** (press Enter for No)

Expected result: A file should be created at `src/components/layouts/DashboardTest.tsx`

---

## Next: Build Test

After generation, test that it compiles:

```bash
cd src
npm run build
```

If the build succeeds, Phase 2 is working! ✅
