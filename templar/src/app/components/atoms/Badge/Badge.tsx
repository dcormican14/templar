'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import type { BadgeProps } from './Badge.types';
import { getVariantStyles, getSizeStyles, createBaseStyles } from './Badge.styles';
import { createBadgeContent } from './Badge.utils';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    rounded = false,
    icon,
    iconPosition = 'leading',
    removable = false,
    onRemove,
    children,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    // Computed values
    const hasIcon = Boolean(icon);
    const isRemovable = removable && Boolean(onRemove);
    const animationsEnabled = settings.appearance.animations;

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      Boolean(rounded),
      isRemovable,
      animationsEnabled
    ), [rounded, isRemovable, animationsEnabled]);

    const variantStyles = useMemo(() => getVariantStyles(variant, cssVars), [variant, cssVars]);
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...style,
    };

    return (
      <span
        ref={ref}
        style={combinedStyles}
        className={className}
        {...props}
      >
        {createBadgeContent(
          icon,
          iconPosition,
          size,
          children,
          removable,
          onRemove,
          cssVars,
          animationsEnabled
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';