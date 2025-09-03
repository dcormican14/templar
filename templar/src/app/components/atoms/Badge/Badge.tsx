'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { extractContainerProps, UNIVERSAL_DEFAULTS } from '../types';
import type { BadgeProps } from './Badge.types';
import { getVariantStyles, getSizeStyles, createBaseStyles } from './Badge.styles';
import { createBadgeContent } from './Badge.utils';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((allProps, ref) => {
  // Extract container props and component-specific props
  const [containerProps, componentProps] = extractContainerProps(allProps);
  
  // Destructure container props with defaults
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    'data-testid': dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded, // Legacy support
    children,
  } = containerProps;
  
  // Destructure component-specific props
  const {
    icon,
    iconPosition = 'leading',
    removable = false,
    onRemove,
    ...restProps
  } = componentProps;

  // Hooks
  const cssVars = useCSSVariables();
  const { settings } = useSettings();

  // Computed values
  const hasIcon = Boolean(icon);
  const isRemovable = removable && Boolean(onRemove);
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      shape === 'pill' || Boolean(rounded),
      isRemovable,
      animationsEnabled
    ), [shape, rounded, isRemovable, animationsEnabled]);

    const variantStyles = useMemo(() => getVariantStyles(
      color, 
      customColor,
      variant, 
      disabled,
      cssVars
    ), [color, customColor, variant, disabled, cssVars]);
    
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      width,
      height,
      ...style,
    };

    return (
      <span
        ref={ref}
        id={id}
        style={combinedStyles}
        className={className}
        data-testid={dataTestId}
        {...restProps}
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