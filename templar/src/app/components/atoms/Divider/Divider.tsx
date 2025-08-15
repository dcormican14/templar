'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables } from '../../../providers';
import type { DividerProps } from './Divider.types';
import { 
  getVariantStyles,
  getSizeStyles,
  getSpacingStyles,
  createBaseStyles,
  createLabelStyles,
  createGappedDividerStyles,
  createContainerStyles
} from './Divider.styles';
import { 
  createAccessibilityProps,
  createVerticalAccessibilityProps,
  validateDividerProps,
  createLabelContent
} from './Divider.utils';

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    variant = 'default',
    size = 'md',
    orientation = 'horizontal',
    spacing = 'md',
    rounded = false,
    fullSize = true,
    label,
    labelPosition = 'center',
    subtle = false,
    dashed = false,
    dotted = false,
    className,
    style,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();

    // Validation
    validateDividerProps(dashed, dotted, orientation, fullSize);

    // Computed values
    const hasLabel = Boolean(label);
    const isVertical = orientation === 'vertical';
    const useBorder = dashed || dotted;
    const useCustomPattern = dashed || dotted;

    // Accessibility props
    const accessibilityProps = useMemo(() => 
      isVertical 
        ? createVerticalAccessibilityProps(label)
        : createAccessibilityProps(label),
      [isVertical, label]
    );

    // Styles
    const baseStyles = useMemo(() => 
      createBaseStyles(orientation, fullSize, rounded, subtle, dashed, dotted),
      [orientation, fullSize, rounded, subtle, dashed, dotted]
    );

    const variantStyles = useMemo(() => 
      getVariantStyles(variant, cssVars, useBorder, orientation, dashed, dotted, size),
      [variant, cssVars, useBorder, orientation, dashed, dotted, size]
    );

    const sizeStyles = useMemo(() => 
      getSizeStyles(size, orientation, useBorder, useCustomPattern),
      [size, orientation, useBorder, useCustomPattern]
    );

    const spacingStyles = useMemo(() => 
      getSpacingStyles(spacing, orientation),
      [spacing, orientation]
    );

    const labelStyles = useMemo(() => 
      hasLabel ? createLabelStyles(orientation, labelPosition, cssVars, variantStyles) : {},
      [hasLabel, orientation, labelPosition, cssVars, variantStyles]
    );

    // For labeled dividers, create gapped styles
    const gappedStyles = useMemo(() => {
      if (!hasLabel) return null;
      return createGappedDividerStyles(
        orientation, 
        labelPosition, 
        variantStyles, 
        sizeStyles, 
        rounded, 
        subtle, 
        dashed, 
        dotted
      );
    }, [hasLabel, orientation, labelPosition, variantStyles, sizeStyles, rounded, subtle, dashed, dotted]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...spacingStyles,
      ...style,
    };

    // If there's a label, use the gapped approach
    if (hasLabel && gappedStyles) {
      return (
        <div
          ref={ref}
          className={className}
          style={{ ...gappedStyles.containerStyles, ...spacingStyles }}
          {...accessibilityProps}
          {...props}
        >
          {/* Before divider segment */}
          <div style={gappedStyles.beforeStyles} />
          
          {/* Label */}
          <div style={labelStyles}>
            {createLabelContent(label, cssVars)}
          </div>
          
          {/* After divider segment */}
          <div style={gappedStyles.afterStyles} />
        </div>
      );
    }

    // Simple divider without label
    return (
      <div
        ref={ref}
        className={className}
        style={combinedStyles}
        {...accessibilityProps}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
