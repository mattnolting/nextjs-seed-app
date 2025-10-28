# PatternFly Component Development Rules

## Overview

This document provides rules and guidelines for developing components with PatternFly React in a Next.js environment.

## Component Structure

### Client Components

- Components that use React hooks must have `"use client"` directive
- Components using DOM manipulation or state require client-side rendering

### Component Naming

- Use PascalCase for component names
- Match PatternFly naming conventions where applicable
- Use descriptive names that indicate the component's purpose

### Props Interfaces

- Define TypeScript interfaces for all component props
- Extend PatternFly base props where applicable
- Use descriptive prop names with clear types

## CSS Modules

- Import PatternFly CSS modules using `@patternfly/react-styles`
- Use the `css()` utility function to combine classes
- Follow PatternFly's modifier pattern for variations

## Accessibility

- All interactive components must support keyboard navigation
- Include appropriate ARIA attributes
- Use OUIA props for testing and accessibility

## Examples

```tsx
// Good: Client component with proper structure
"use client";

import { css } from "@patternfly/react-styles";
import buttonStyles from "@patternfly/react-styles/css/components/Button/button";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button
      className={css(
        buttonStyles.button,
        variant && buttonStyles.modifiers[variant]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```
