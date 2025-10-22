# Alert Component

A PatternFly Alert component for Next.js applications.

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| actionClose | React.ReactNode | No | No description |
| actionLinks | React.ReactNode | No | No description |
| children | React.ReactNode | No | No description |
| className | string | No | No description |
| customIcon | React.ReactNode | No | No description |
| id | string | No | No description |
| isExpandable | boolean | No | No description |
| isInline | boolean | No | No description |
| isLiveRegion | boolean | No | No description |
| isPlain | boolean | No | No description |
| onTimeout | () => void | No | No description |
| timeout | number | boolean | No | No description |
| timeoutAnimation | number | No | No description |
| title | React.ReactNode | Yes | No description |
| component | keyof React.JSX.IntrinsicElements | No | No description |
| toggleAriaLabel | string | No | No description |
| tooltipPosition | | TooltipPosition
    | 'auto'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end' | No | No description |
| truncateTitle | number | No | No description |
| variant | 'success' | 'danger' | 'warning' | 'info' | 'custom' | No | No description |
| variantLabel | string | No | No description |
| ouiaId | number | string | No | No description |
| ouiaSafe | boolean | No | No description |

## Variants

### AlertVariant

Available values: success, danger, warning, info, custom


## Events

| Name | Signature | Description |
|------|-----------|-------------|
| onTimeout | () => void | Custom event |
| onClick | (event: React.MouseEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onKeyDown | (event: React.KeyboardEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onKeyUp | (event: React.KeyboardEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onKeyPress | (event: React.KeyboardEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onMouseEnter | (event: React.MouseEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onMouseLeave | (event: React.MouseEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onFocus | (event: React.FocusEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onBlur | (event: React.FocusEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onChange | (event: React.ChangeEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onSubmit | (event: React.FormEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onLoad | (event: React.SyntheticEvent<HTMLElement>) => void | Inherited from React.HTMLProps |
| onError | (event: React.SyntheticEvent<HTMLElement>) => void | Inherited from React.HTMLProps |

## Usage Examples

```tsx
import { Alert } from "./alert";

function MyComponent() {
  return (
    <Alert>
      Hello World
    </Alert>
  );
}
```
