export interface ButtonProps {
  // Core props
  children?: React.ReactNode;
  className?: string;
  spinnerAriaValueText?: string;
  spinnerAriaLabel?: string;
  spinnerAriaLabelledBy?: string;
  inoperableEvents?: string[];
  type?: 'button' | 'submit' | 'reset';
  state?: 'read' | 'unread' | 'attention';
  iconPosition?: 'start' | 'end' | 'left' | 'right';
  hamburgerVariant?: 'expand' | 'collapse';
  /** Forwarded ref */
  innerRef?: React.Ref<any>;

  // Styling props
  size?: 'default' | 'sm' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'link' | 'plain' | 'control' | 'stateful';

  // Accessibility props
  'aria-label'?: string;
  tabIndex?: number;
  ouiaId?: number | string;
  ouiaSafe?: boolean;

  // Advanced props
  component?: React.ElementType<any> | React.ComponentType<any>;
  isClicked?: boolean;
  isBlock?: boolean;
  isDisabled?: boolean;
  isAriaDisabled?: boolean;
  isLoading?: boolean;
  isInline?: boolean;
  isFavorite?: boolean;
  isFavorited?: boolean;
  hasNoPadding?: boolean;
  icon?: React.ReactNode | null;
  isDanger?: boolean;
  isExpanded?: boolean;
  isSettings?: boolean;
  isHamburger?: boolean;
  countOptions?: BadgeCountObject;
}
