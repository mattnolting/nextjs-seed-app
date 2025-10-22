"use client";

import { forwardRef, useState, useEffect } from "react";
import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/Button/button";
import { useOUIAProps } from "../../helpers";
import { useOUIAProps, OUIAProps } from "../../helpers/OUIA";

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

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "warning" | "link" | "plain" | "control" | "stateful";
export type ButtonType = "button" | "submit" | "reset";
export type ButtonSize = "default" | "sm" | "lg";

export const Button = forwardRef<HTMLDivElement, ButtonProps>(({
  // Core props
  children,
  className,
  spinnerAriaValueText,
  spinnerAriaLabel,
  spinnerAriaLabelledBy,
  inoperableEvents,
  type,
  state,
  iconPosition,
  hamburgerVariant,
  innerRef,
  // Styling props
  size,
  variant,
  // Accessibility props
  'aria-label',
  tabIndex,
  ouiaId,
  ouiaSafe,
  // Advanced props
  component,
  isClicked,
  isBlock,
  isDisabled,
  isAriaDisabled,
  isLoading,
  isInline,
  isFavorite,
  isFavorited,
  hasNoPadding,
  icon,
  isDanger,
  isExpanded,
  isSettings,
  isHamburger,
  countOptions,
  ...props
}, ref) => {

  // OUIA props for accessibility
  const ouiaProps = useOUIAProps("Button", ouiaId, ouiaSafe);

  // Custom hooks
  const useOUIAProps = useOUIAProps();

  // CSS classes
  const cssClasses = css(
    styles.button,
    isClicked && styles.modifiers.clicked,
    isBlock && styles.modifiers.block,
    isDisabled && styles.modifiers.disabled,
    isAriaDisabled && styles.modifiers.ariadisabled,
    isLoading && styles.modifiers.loading,
    isInline && styles.modifiers.inline,
    isFavorite && styles.modifiers.favorite,
    isFavorited && styles.modifiers.favorited,
    hasNoPadding && styles.modifiers.nopadding,
    isDanger && styles.modifiers.danger,
    isExpanded && styles.modifiers.expanded,
    isSettings && styles.modifiers.settings,
    isHamburger && styles.modifiers.hamburger,
    className
  );

  return (
    <div
      ref={ref}
      className={cssClasses}
      {...ouiaProps}
      {...props}
    >
      {children}
    </div>
  );
});

Button.displayName = "Button";
