# Phase 2: Content Patterns & Data-Driven Architecture

## Overview

Enhance content patterns to match PatternFly design patterns, establish a consistent page pattern using toggle hooks, and implement a data-driven architecture with a single JSON configuration file.

## Goals

1. **Content Patterns**: Create/update content patterns to match PatternFly design patterns
2. **Page Pattern**: Standardize all `app/*/page.tsx` files to use toggle hooks pattern
3. **Data-Driven**: Single JSON file for all component data (charts, tables, cards, etc.)
4. **Separation of Concerns**: Users can reference pre-configured patterns while developing custom implementations

---

## 1. Content Patterns

### 1.1 DashboardView

**Reference**: [PatternFly Dashboard Pattern](https://www.patternfly.org/patterns/dashboard)

**Status**: ✅ Exists, needs enhancement

**Tasks**:

- [ ] Review PatternFly dashboard pattern structure
- [ ] Enhance `DashboardView` to match PatternFly basic dashboard demo
- [ ] Support KPI cards, charts, and sections as per PatternFly pattern
- [ ] Integrate with data JSON file for dashboard content

**File**: `src/components/content-patterns/DashboardView.tsx`

**Props Interface**:

```typescript
export interface DashboardViewProps {
  title?: string;
  children?: ReactNode;
  // Add data-driven props
  kpiCards?: KPICard[];
  charts?: ChartConfig[];
  sections?: DashboardSection[];
}
```

---

### 1.2 CardView

**Reference**: [PatternFly Card View Pattern](https://www.patternfly.org/patterns/card-view)

**Status**: ✅ Exists, needs alignment

**Tasks**:

- [ ] Review PatternFly card-view pattern (toolbar, filtering, pagination, selection)
- [ ] Ensure `CardView` matches PatternFly card-view implementation
- [ ] Verify toolbar actions, filters, and bulk selection work correctly
- [ ] Integrate with data JSON file for card items

**File**: `src/components/content-patterns/CardView.tsx`

**Current Status**: Already has toolbar, filtering, pagination, selection ✅

**Enhancements**:

- [ ] Add data JSON integration
- [ ] Ensure all PatternFly card-view features are present

---

### 1.3 PrimaryDetail

**Reference**: [PatternFly Primary-Detail Pattern](https://www.patternfly.org/patterns/primary-detail)

**Status**: ❌ New component needed

**Tasks**:

- [ ] Create `PrimaryDetailView.tsx` component
- [ ] Implement primary list view (left panel)
- [ ] Implement detail view (right panel)
- [ ] Add selection state management
- [ ] Support responsive behavior (stack on mobile)
- [ ] Integrate with data JSON file

**File**: `src/components/content-patterns/PrimaryDetailView.tsx`

**Props Interface**:

```typescript
export interface PrimaryDetailViewProps {
  primaryItems: PrimaryItem[];
  renderDetail: (selectedItem: PrimaryItem | null) => ReactNode;
  title?: string;
  emptyState?: ReactNode;
}
```

---

### 1.4 TableView

**Reference**: [PatternFly Filters Pattern](https://www.patternfly.org/patterns/filters)

**Status**: ✅ Exists, needs filter enhancement

**Tasks**:

- [ ] Review PatternFly filters pattern
- [ ] Enhance `TableView` to include advanced filtering (like filters pattern)
- [ ] Add filter chips, filter groups, and filter management
- [ ] Integrate with data JSON file for table data

**File**: `src/components/content-patterns/TableView.tsx`

**Current Status**: Has basic table with search, pagination, selection ✅

**Enhancements**:

- [ ] Add PatternFly filter toolbar pattern
- [ ] Support multiple filter categories
- [ ] Add filter chips display
- [ ] Add filter management UI

---

### 1.5 FormView

**Reference**: [PatternFly Horizontal Form](https://www.patternfly.org/components/forms/form#horizontal)

**Status**: ❌ New component needed

**Tasks**:

- [ ] Create `FormView.tsx` component
- [ ] Implement horizontal form layout
- [ ] Add form validation (client-side)
- [ ] Support validation states (error, warning, success)
- [ ] Add form submission handling
- [ ] Integrate with data JSON file for form fields

**File**: `src/components/content-patterns/FormView.tsx`

**Props Interface**:

```typescript
export interface FormViewProps {
  title?: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  initialValues?: Record<string, any>;
  validationSchema?: ValidationSchema;
}
```

**Validation Features**:

- Required field validation
- Email, URL, number validation
- Custom validation rules
- Real-time validation feedback
- Error message display

---

## 2. Page Pattern Standardization

### 2.1 Toggle Hook Pattern

All `app/*/page.tsx` files should follow the pattern from `analytics/page.tsx`:

```typescript
"use client";

import { DashboardView } from "@/components/content-patterns/DashboardView";
import { CardView } from "@/components/content-patterns/CardView";
// ... other imports

export default function PageName() {
  // Toggle hooks for content pattern selection
  const useDashboardView = true;
  const useCardView = false;
  const useTableView = false;
  // ... other toggles

  if (useDashboardView) {
    return <DashboardView title="Page Title">...</DashboardView>;
  }

  if (useCardView) {
    return <CardView items={...} />;
  }

  // ... other patterns

  // Fallback/default
  return <div>Default content</div>;
}
```

### 2.2 Pages to Update

**Files to standardize**:

- [ ] `src/app/page.tsx` (Home)
- [ ] `src/app/dashboard/page.tsx`
- [ ] `src/app/analytics/page.tsx` ✅ (already follows pattern)
- [ ] `src/app/users/page.tsx`
- [ ] `src/app/settings/page.tsx`
- [ ] `src/app/gallery/page.tsx`

**Pattern**:

- Use boolean toggle hooks (`useDashboardView`, `useCardView`, etc.)
- Conditional rendering based on toggles
- Easy to switch between patterns
- Clear separation: page shell selects pattern, pattern handles content

---

## 3. Data-Driven Architecture

### 3.1 Single JSON Configuration File

**File**: `public/app-data.json` (or `src/data/app-data.json`)

**Purpose**: Provision all non-static component data (charts, tables, cards, etc.)

**Structure**:

```json
{
  "dashboard": {
    "kpiCards": [
      { "id": "1", "title": "Total Users", "value": "1,234", "trend": "+5%" },
      ...
    ],
    "charts": {
      "area": { "data": [...], "config": {...} },
      "bar": { "data": [...], "config": {...} },
      "donut": { "data": [...], "config": {...} }
    },
    "sections": [...]
  },
  "cardView": {
    "items": [
      { "id": "1", "title": "...", "description": "...", ... },
      ...
    ],
    "filters": {
      "categories": ["Category 1", "Category 2"],
      ...
    }
  },
  "tableView": {
    "columns": ["Name", "Email", "Role"],
    "rows": [
      { "id": 1, "cells": ["...", "...", "..."] },
      ...
    ],
    "filters": {
      "categories": {
        "Role": ["Admin", "User", "Guest"],
        "Status": ["Active", "Inactive"]
      }
    }
  },
  "primaryDetail": {
    "primaryItems": [
      { "id": "1", "title": "...", "description": "...", ... },
      ...
    ]
  },
  "formView": {
    "fields": [
      { "name": "fullName", "label": "Full Name", "type": "text", "required": true },
      ...
    ],
    "validation": {
      "fullName": { "required": true, "minLength": 2 },
      ...
    }
  }
}
```

### 3.2 Data Loading Hook

**File**: `src/lib/data/useAppData.ts`

**Purpose**: Load and provide app data from JSON file

```typescript
export function useAppData() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/app-data.json")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
```

### 3.3 Integration Points

- [x] `DashboardView` renders static sample content (no `data.dashboard` dependency)
- [ ] `CardView` uses `data.cardView`
- [ ] `TableView` uses `data.tableView`
- [ ] `PrimaryDetailView` uses `data.primaryDetail`
- [ ] `FormView` uses `data.formView`
- [ ] All pages use `useAppData()` hook

---

## 4. Implementation Plan

### Phase 2.1: Content Pattern Enhancements

1. Review PatternFly patterns for each component
2. Update existing components (DashboardView, CardView, TableView)
3. Create new components (PrimaryDetailView, FormView)
4. Test each component independently

### Phase 2.2: Page Pattern Standardization

1. Update all `app/*/page.tsx` files to use toggle pattern
2. Ensure consistent structure across all pages
3. Test navigation between pages

### Phase 2.3: Data-Driven Architecture

1. Create `app-data.json` structure
2. Implement `useAppData()` hook
3. Integrate data loading into all content patterns
4. Migrate hardcoded data to JSON file

### Phase 2.4: Documentation & Testing

1. Update documentation with new patterns
2. Add examples for each content pattern
3. Create smoke tests for new components
4. Update README with Phase 2 features

---

## 5. Benefits

### For Developers

- **Reference Implementation**: Open pre-configured patterns to see how they work
- **Easy Toggling**: Switch between patterns using simple boolean flags
- **Separation of Concerns**: Page shell is separate from content pattern logic
- **Data-Driven**: Change data without touching code

### For Users

- **Consistent Patterns**: All pages follow the same structure
- **PatternFly Compliant**: Components match official PatternFly patterns
- **Flexible**: Easy to customize and extend

---

## 6. Success Criteria

- [ ] All 5 content patterns implemented and match PatternFly patterns
- [ ] All pages use toggle hook pattern
- [ ] Single JSON file provides all component data
- [ ] Components can be toggled on/off easily
- [ ] Documentation updated
- [ ] All tests passing

---

## 7. References

- [PatternFly Dashboard Pattern](https://www.patternfly.org/patterns/dashboard)
- [PatternFly Card View Pattern](https://www.patternfly.org/patterns/card-view)
- [PatternFly Primary-Detail Pattern](https://www.patternfly.org/patterns/primary-detail)
- [PatternFly Filters Pattern](https://www.patternfly.org/patterns/filters)
- [PatternFly Horizontal Form](https://www.patternfly.org/components/forms/form#horizontal)

---

## Notes

- Keep existing components working during migration
- Ensure backward compatibility where possible
- Follow PatternFly design guidelines strictly
- Maintain TypeScript types throughout
- Use PatternFly v6 components and patterns
