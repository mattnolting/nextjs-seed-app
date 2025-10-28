# PatternFly Next.js Starter - Project Plan

## 🎯 Project Vision

Create a clean, modern Next.js starter application with PatternFly React components. The project will feature an interactive CLI for scaffolding layouts and integrating PatternFly components directly from `@patternfly/react-core`.

## ✅ Strategic Decisions

### Core Technologies

- **Next.js 16** with App Router (latest stable)
- **TypeScript** with strict mode
- **Turbopack** for development (Webpack for production)
- **PatternFly v6** React components
- **PatternFly styles** via `@patternfly/react-styles`
- **Jest** for testing

### Architecture

- Direct component import from `@patternfly/react-core`
- PF-only styling (no Tailwind)
- Server Components by default, Client Components with `"use client"`
- Minimal foundation first, then build features incrementally

### Development Workflow

1. **Develop/Document** → Write code with documentation
2. **Test/Review** → Validate functionality
3. **If Failures** → Move old files to `.ephemeral` and rewrite cleanly

**Note:** Files located within `.ephemeral` are considered archaeological and used to avoid past mistakes and retain learning.

---

## 📋 Implementation Phases

### Phase 1: Foundation (Current Focus)

**Goal:** Minimal working Next.js app with PatternFly

**Tasks:**

1. ✅ Initialize Next.js with `create-next-app --typescript`
2. ✅ Configure Turbopack for development
3. ✅ Install PatternFly dependencies
4. ✅ Create root layout with PatternFly Page wrapper
5. ✅ Create minimal landing page
6. ✅ Verify dev server runs with hot reload
7. ✅ Document Phase 1 completion

**Success Criteria:**

- Dev server runs on `localhost:3000`
- No build errors or warnings
- PatternFly CSS loads properly
- Hot reload works
- Git repository initialized

**Deliverables:**

- Working Next.js app
- PatternFly integration complete
- Documentation updated

---

### Phase 2: Layout System

**Goal:** Interactive layout scaffolding CLI

**Tasks:**

1. Design layout JSON schemas (dashboard, gallery, table, split-view)
2. Create layout component templates
3. Build CLI with `commander` + `inquirer`
4. Implement layout picker and generation
5. Create layout examples
6. Test CLI workflow
7. Document Phase 2 completion

**Success Criteria:**

- CLI launches with `npm run cli`
- Interactive prompts for layout selection
- Generated layouts render correctly
- Code follows Next.js App Router patterns

**Deliverables:**

- Interactive CLI tool
- 4+ layout templates
- Layout generation working

---

### Phase 3: Component Integration

**Goal:** Direct PatternFly component integration via CLI

**Tasks:**

1. Build component discovery from `@patternfly/react-core`
2. Create component picker CLI interface
3. Implement code generation for components
4. Handle client/server component detection
5. Generate proper imports and usage examples
6. Test component integration
7. Document Phase 3 completion

**Success Criteria:**

- CLI lists available PatternFly components
- Selected components generate proper code
- Components integrate seamlessly
- Server/Client Component distinction handled

**Deliverables:**

- Component picker CLI
- Component generation working
- Integration examples

---

### Phase 4: Polish & Production

**Goal:** Production-ready starter application

**Tasks:**

1. Add comprehensive tests with Jest
2. Write user documentation
3. Create deployment guides
4. Optimize production build
5. Add CI/CD configuration
6. Create release documentation
7. Document Phase 4 completion

**Success Criteria:**

- All tests pass
- Production build succeeds
- Documentation complete
- Deployment guide written

**Deliverables:**

- Production-ready starter
- Complete documentation
- Deployment configuration

---

## 📁 Target Directory Structure

```
nextjs-seed-app/
├── .ephemeral/                  # Failed/replaced code (git ignored)
├── .next/                       # Next.js build output (git ignored)
├── node_modules/                # Dependencies (git ignored)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx          # Root layout with PatternFly Page
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles (PatternFly imports)
│   │
│   ├── components/              # React components
│   │   ├── layout/             # Layout components (Phase 2)
│   │   └── ui/                 # UI components (generated via CLI)
│   │
│   └── lib/                     # Utilities
│       └── utils.ts            # Helper functions
│
├── cli/                         # Interactive CLI (Phase 2+)
│   ├── index.ts                # CLI entry point
│   ├── commands/               # CLI commands
│   ├── prompts/                # Interactive prompts
│   └── generators/             # Code generators
│
├── layouts/                     # Layout definitions (Phase 2)
│   ├── dashboard.json
│   ├── gallery.json
│   ├── table.json
│   └── split-view.json
│
├── ai-documentation/            # AI development rules
│   ├── COMPONENT_RULES.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── LAYOUT_PATTERNS.md
│   └── PROBLEM_STATEMENT.md
│
├── docs/                        # Project documentation
│   ├── PROJECT_PLAN.md         # This file
│   ├── WORKFLOW.md             # Development workflow
│   └── HANDOFF.md              # Session handoff notes
│
├── config/                      # Configuration files
│   ├── next.config.ts          # Next.js config (Turbopack)
│   ├── tsconfig.json           # TypeScript config
│   └── package.json            # Dependencies
│
├── .gitignore                  # Git ignore rules
├── README.md                   # Project overview
└── jest.config.js              # Jest test configuration
```

---

## 🛠️ Key Dependencies

```json
{
  "next": "^16.0.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "@patternfly/react-core": "^6.0.0",
  "@patternfly/react-styles": "^6.0.0",
  "@patternfly/patternfly": "^6.0.0",
  "typescript": "^5.3.0",
  "commander": "^12.0.0",
  "inquirer": "^10.0.0",
  "@types/react": "^18.3.0",
  "@types/node": "^20.0.0",
  "jest": "^29.0.0",
  "jest-environment-jsdom": "^29.0.0",
  "@testing-library/react": "^14.0.0"
}
```

---

## 🎨 PatternFly Integration Approach

### CSS Import

```css
/* src/app/globals.css */
@import "@patternfly/react-core/dist/styles/base.css";
@import "@patternfly/react-core/dist/styles/components.css";
@import "@patternfly/react-core/dist/styles/utilities.css";
```

### Component Usage

```tsx
// Server Component (default)
import { Page, PageSection } from "@patternfly/react-core";

export default function Layout({ children }) {
  return (
    <Page>
      <PageSection>{children}</PageSection>
    </Page>
  );
}
```

```tsx
// Client Component (when needed)
"use client";

import { useState } from "react";
import { Button } from "@patternfly/react-core";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}
```

---

## 🚦 Next Steps

1. **Initialize Next.js project** with TypeScript
2. **Install PatternFly dependencies**
3. **Create basic layout** with PatternFly Page
4. **Test dev server** and hot reload
5. **Document results** and proceed to Phase 2

---

## 📝 Notes

- **Turbopack**: Use for dev (`npm run dev`)
- **Webpack**: Used automatically for production builds
- **Failure Strategy**: Move failed code to `.ephemeral/` and rewrite
- **Testing**: Add tests as features are completed
- **Documentation**: Update docs with each phase completion

---

**Last Updated:** 2025-10-28
**Current Phase:** 2 (Layout System) - ✅ COMPLETED
**Status:** Phase 2 Complete, Ready for Phase 3
