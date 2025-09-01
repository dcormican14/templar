'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useLoading, useSettings } from '../../../providers';
import type { ButtonProps } from './Button.types';
import { getVariantStyles, getSizeStyles, createBaseStyles, getShapeStyles } from './Button.styles';
import { createCenteredContent, createTextContainer } from './Button.utils';
import { ProgressIndicator } from '../ProgressIndicator';
import { useAsyncClick, useButtonHover } from './hooks';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    color = 'primary',
    customColor,
    variant = 'solid',
    size = 'md',
    shape = 'round',
    loading = false,
    loadingKey,
    icon,
    iconPosition = 'leading',
    fullWidth = false,
    onAsyncClick,
    onClick,
    children,
    disabled,
    className,
    style,
    // Legacy support
    rounded,
    ...props 
  }, ref) => {
    // Hooks
    const cssVars = useCSSVariables();
    const { isLoading } = useLoading();
    const { settings } = useSettings();

    // Computed values
    const isButtonLoading = loading || (loadingKey && isLoading(loadingKey));
    const isDisabled = Boolean(disabled) || isButtonLoading;
    const hasIcon = Boolean(icon);
    const animationsEnabled = settings.appearance.animations;

    // Event handlers
    const handleAsyncClick = useAsyncClick({ loadingKey, onAsyncClick, onClick });
    const { handleMouseEnter, handleMouseLeave } = useButtonHover({
      color,
      variant,
      isDisabled: Boolean(isDisabled),
      animationsEnabled,
      cssVars
    });

    // Styles
    const baseStyles = useMemo(() => createBaseStyles(
      Boolean(fullWidth),
      Boolean(isDisabled),
      hasIcon,
      shape,
      animationsEnabled,
      rounded
    ), [fullWidth, isDisabled, hasIcon, shape, animationsEnabled, rounded]);

    const variantStyles = useMemo(() => getVariantStyles(color, variant, customColor, cssVars), [color, variant, customColor, cssVars]);
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles,
      ...variantStyles,
      ...style,
    };

    // Content rendering
    const renderContent = () => {
      if (isButtonLoading) {
        // Map button size to spinner size
        const spinnerSize = size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm';
        // Determine spinner color based on variant
        const spinnerColor = variant === 'outline' || variant === 'ghost' ? color : 'inherit';
        
        return (
          <ProgressIndicator 
            type="spinner"
            size={spinnerSize}
            color={spinnerColor}
          />
        );
      }

      return (
        <>
          {hasIcon ? (
            createCenteredContent(icon, iconPosition, size, children)
          ) : (
            createTextContainer(children)
          )}
        </>
      );
    };

    return (
      <button
        ref={ref}
        disabled={Boolean(isDisabled)}
        onClick={handleAsyncClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={combinedStyles}
        className={className}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';
