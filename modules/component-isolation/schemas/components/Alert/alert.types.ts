export interface AlertProps {
  // Core props
  children?: React.ReactNode;
  className?: string;
  id?: string;
  timeout?: number | boolean;
  timeoutAnimation?: number;
  component?: keyof React.JSX.IntrinsicElements;
  toggleAriaLabel?: string;
  tooltipPosition?: | TooltipPosition
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
    | 'right-end';
  truncateTitle?: number;

  // Styling props
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
  variantLabel?: string;

  // Accessibility props
  ouiaId?: number | string;
  ouiaSafe?: boolean;

  // Advanced props
  actionClose?: React.ReactNode;
  actionLinks?: React.ReactNode;
  customIcon?: React.ReactNode;
  isExpandable?: boolean;
  isInline?: boolean;
  isLiveRegion?: boolean;
  isPlain?: boolean;
  title: React.ReactNode;

  // Event props
  onTimeout?: () => void;
}
