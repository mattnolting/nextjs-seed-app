# Data-Driven Architecture

## Overview

Demo components share a common dataset stored in `src/lib/data/seed.ts`. The `useAppData` hook imports that module directly, keeping the sample experience self-contained and eliminating the need for runtime fetching or JSON files.

## Structure

### Files

- **`src/lib/data/seed.ts`** – Embedded demo data used by the content-pattern samples
- **`src/lib/data/types.ts`** – TypeScript type definitions for the dataset
- **`src/lib/data/useAppData.ts`** – React hook exposing the demo data to components

### Data Sections

The seed file provides sections for each content pattern:

- **`cardView`** – Card items and filter categories
- **`tableView`** – Table columns, rows, and filter categories
- **`primaryDetail`** – Primary list items used by the master/detail sample
- **`formView`** – Form fields and validation rules

## Usage

```typescript
"use client";

import { useAppData } from "@/lib/data/useAppData";
import { CardView } from "@/components/content-patterns/CardView";

export default function Gallery() {
  const { data } = useAppData();

  if (!data) {
    return null;
  }

  return (
    <CardView
      items={data.cardView.items}
      title="Gallery"
      description="Browse available projects and items"
    />
  );
}
```

## Benefits

1. **Self-contained samples** – No runtime fetch or JSON file required
2. **Type safety** – Dataset shape validated via TypeScript definitions
3. **Easy customization** – Edit `seed.ts` or replace `useAppData` entirely when wiring real data sources
4. **Clear separation** – Demo data is isolated from application logic, keeping the seed app focused

## Modifying Data

Edit `src/lib/data/seed.ts` to adjust the demo dataset. Components consuming `useAppData` will immediately reflect the updated values without restarting the dev server.
