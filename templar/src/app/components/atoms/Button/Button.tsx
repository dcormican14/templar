'use client';

import React, { forwardRef, useMemo } from 'react';
import { useCSSVariables, useLoading, useSettings } from '../../../providers';
import type { ButtonProps } from './Button.types';
import { getVariantStyles, getSizeStyles, createBaseStyles } from './Button.styles';
import { createIconContainer, createTextContainer, createSpacerElement } from './Button.utils';
import { ProgressIndicator } from '../ProgressIndicator';
import { useAsyncClick, useButtonHover } from './hooks';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingKey,
    icon,
    iconPosition = 'leading',
    fullWidth = false,
    rounded = false,
    onAsyncClick,
    onClick,
    children,
    disabled,
    className,
    style,
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
      Boolean(rounded),
      animationsEnabled
    ), [fullWidth, isDisabled, hasIcon, rounded, animationsEnabled]);

    const variantStyles = useMemo(() => getVariantStyles(variant, cssVars), [variant, cssVars]);
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
        const spinnerColor = variant === 'outline' || variant === 'ghost' ? 'primary' : 'inherit';
        
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
          {/* Leading icon or spacer */}
          {hasIcon && iconPosition === 'leading' 
            ? createIconContainer(icon, 'leading', size)
            : hasIcon && iconPosition === 'trailing' && createSpacerElement()
          }
          
          {/* Text content */}
          {createTextContainer(children)}
          
          {/* Trailing icon or spacer */}
          {hasIcon && iconPosition === 'trailing'
            ? createIconContainer(icon, 'trailing', size)
            : hasIcon && iconPosition === 'leading' && createSpacerElement()
          }
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
