# Button Component

A PatternFly Button component for Next.js applications.

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| children | React.ReactNode | No | No description |
| className | string | No | No description |
| component | React.ElementType<any> | React.ComponentType<any> | No | No description |
| isClicked | boolean | No | No description |
| isBlock | boolean | No | No description |
| isDisabled | boolean | No | No description |
| isAriaDisabled | boolean | No | No description |
| isLoading | boolean | No | No description |
| spinnerAriaValueText | string | No | No description |
| spinnerAriaLabel | string | No | No description |
| spinnerAriaLabelledBy | string | No | No description |
| inoperableEvents | string[] | No | No description |
| isInline | boolean | No | No description |
| isFavorite | boolean | No | No description |
| isFavorited | boolean | No | No description |
| size | 'default' | 'sm' | 'lg' | No | No description |
| type | 'button' | 'submit' | 'reset' | No | No description |
| variant | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'link' | 'plain' | 'control' | 'stateful' | No | No description |
| state | 'read' | 'unread' | 'attention' | No | No description |
| hasNoPadding | boolean | No | No description |
| iconPosition | 'start' | 'end' | 'left' | 'right' | No | No description |
| 'aria-label' | string | No | No description |
| icon | React.ReactNode | null | No | No description |
| tabIndex | number | No | No description |
| isDanger | boolean | No | No description |
| isExpanded | boolean | No | No description |
| isSettings | boolean | No | No description |
| isHamburger | boolean | No | No description |
| hamburgerVariant | 'expand' | 'collapse' | No | No description |
| innerRef | React.Ref<any> | No | Forwarded ref |
| countOptions | BadgeCountObject | No | No description |
| ouiaId | number | string | No | No description |
| ouiaSafe | boolean | No | No description |

## Variants

### ButtonVariant

Available values: primary, secondary, tertiary, danger, warning, link, plain, control, stateful

### ButtonType

Available values: button, submit, reset

### ButtonSize

Available values: default, sm, lg


## Events

| Name | Signature | Description |
|------|-----------|-------------|
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
import { Button } from "./button";

function MyComponent() {
  return (
    <Button>
      Hello World
    </Button>
  );
}
```
