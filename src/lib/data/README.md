# Data-Driven Architecture

## Overview

All component data is provisioned through a single JSON file: `public/app-data.json`. This provides a centralized, easy-to-modify source of truth for all non-static content.

## Structure

### Files

- **`public/app-data.json`** - Single JSON file containing all component data
- **`src/lib/data/types.ts`** - TypeScript type definitions for data structure
- **`src/lib/data/useAppData.ts`** - React hook for loading data

### Data Sections

The JSON file contains sections for each content pattern:

- **`cardView`** - Card items and filter categories
- **`tableView`** - Table columns, rows, and filter categories
- **`primaryDetail`** - Primary list items
- **`formView`** - Form fields and validation rules

> The home dashboard now renders static sample content directly in the component; it no longer relies on `app-data.json`.

## Usage

### Basic Usage

```typescript
"use client";

import { useAppData } from "@/lib/data/useAppData";
import { CardView } from "@/components/content-patterns/CardView";

export default function Gallery() {
  const { data, loading, error } = useAppData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return null;

  return <CardView items={data.cardView.items} />;
}
```

### With Toggle Pattern

```typescript
"use client";

import { useAppData } from "@/lib/data/useAppData";
import { CardView } from "@/components/content-patterns/CardView";
import { DashboardView } from "@/components/content-patterns/DashboardView";

export default function Page() {
  const { data, loading } = useAppData();
  const useDashboardView = true;
  const useCardView = false;

  if (loading) return <div>Loading...</div>;
  if (!data) return null;

  if (useDashboardView) {
    return <DashboardView title="Dashboard" />;
  }

  if (useCardView) {
    return <CardView items={data.cardView.items} />;
  }

  return null;
}
```

## Benefits

1. **Single Source of Truth**: All data in one place
2. **Easy Updates**: Change data without touching code
3. **Type Safety**: TypeScript types ensure data structure consistency
4. **Separation of Concerns**: Data is separate from component logic
5. **Reference Implementation**: Developers can see how data is structured

## Data Structure

See `src/lib/data/types.ts` for complete type definitions.

## Modifying Data

Simply edit `public/app-data.json` to update component data. Changes will be reflected after a page refresh (or hot reload in development).

