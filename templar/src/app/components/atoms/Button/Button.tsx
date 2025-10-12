'use client';

import React, { forwardRef, useMemo, useEffect } from 'react';
import { useCSSVariables, useLoading, useSettings } from '../../../providers';
import { extractInteractiveProps, UNIVERSAL_DEFAULTS } from '../types';
import type { ButtonProps } from './Button.types';
import { getVariantStyles, getSizeStyles, createBaseStyles, getShapeStyles, getIsometricContainerStyles, getIsometricButtonStyles, getIsometricShadowStyles, getColorVariables, getIconOnlyStyles } from './Button.styles';
import { createCenteredContent, createTextContainer } from './Button.utils';
import { ProgressIndicator } from '../ProgressIndicator';
import { useAsyncClick, useButtonHover } from './hooks';
import { ParallaxTiltWrapper, TypewriterText } from './animations';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((allProps, ref) => {
  // Extract interactive props and component-specific props
  const [interactiveProps, componentProps] = extractInteractiveProps(allProps);
  
  // Destructure interactive props with defaults
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
    animationMode = UNIVERSAL_DEFAULTS.animationMode,
    fullWidth,
    onMouseEnter: universalOnMouseEnter,
    onMouseLeave: universalOnMouseLeave,
  } = interactiveProps;
  
  // Destructure component-specific props
  const {
    icon,
    iconPosition = 'leading',
    onAsyncClick,
    onClick,
    children,
    ...restProps
  } = componentProps;
  // Hooks
  const cssVars = useCSSVariables();
  const { isLoading } = useLoading();
  const { settings } = useSettings();

  // Computed values
  const isButtonLoading = loading || (loadingKey && isLoading(loadingKey));
  const isDisabled = Boolean(disabled) || isButtonLoading;
  const hasIcon = Boolean(icon);
  const hasChildren = Boolean(children && (typeof children === 'string' ? children.trim() : children));
  const isIconOnly = hasIcon && !hasChildren;
  const animationsEnabled = (settings.appearance.animations ?? true) && animate;
  const useAnimationMode = animationsEnabled && animationMode !== 'none';
  const shouldUseDefaultAnimations = useAnimationMode && animationMode === 'default';
  const hasIsometricAnimation = useAnimationMode && animationMode === 'isometric' && variant !== 'ghost' && variant !== 'glassmorphic';
  const shouldUseHoverEffects = useAnimationMode && (
    animationMode === 'default' || 
    animationMode === 'typewriter' || 
    hasIsometricAnimation ||
    (animationMode === 'isometric' && (variant === 'ghost' || variant === 'glassmorphic')) // Enable hover effects for variants that don't support isometric
  );


  // Event handlers
  const handleAsyncClick = useAsyncClick({ loadingKey, onAsyncClick, onClick });
  const { handleMouseEnter, handleMouseLeave } = useButtonHover({
    variant,
    isDisabled: Boolean(isDisabled),
    animationsEnabled: shouldUseHoverEffects,
    cssVars,
    hasIsometricAnimation,
    colors: getColorVariables(color, customColor, cssVars)
  });
  
  // Combine universal and component mouse handlers
  const combinedMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    universalOnMouseEnter?.(e);
    handleMouseEnter(e);
  };
  
  const combinedMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    universalOnMouseLeave?.(e);
    handleMouseLeave(e);
  };

  // Styles
  const baseStyles = useMemo(() => createBaseStyles(
    Boolean(fullWidth),
    Boolean(isDisabled),
    hasIcon,
    shape,
    shouldUseDefaultAnimations,
  ), [fullWidth, isDisabled, hasIcon, shape, shouldUseDefaultAnimations]);

  const variantStyles = useMemo(() => getVariantStyles(color, variant, customColor, cssVars), [color, variant, customColor, cssVars]);
  const sizeStyles = useMemo(() => getSizeStyles(size), [size]);
  const iconOnlyStyles = useMemo(() => isIconOnly ? getIconOnlyStyles(size, shape) : {}, [isIconOnly, size, shape]);

  // Isometric styles
  const isometricContainerStyles = useMemo(() => hasIsometricAnimation ? getIsometricContainerStyles() : {}, [hasIsometricAnimation]);
  const isometricButtonStyles = useMemo(() => hasIsometricAnimation ? getIsometricButtonStyles(getColorVariables(color, customColor, cssVars), variant, animationsEnabled) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, animationsEnabled]);
  const isometricShadowStyles = useMemo(() => hasIsometricAnimation ? getIsometricShadowStyles(getColorVariables(color, customColor, cssVars), variant, shape, sizeStyles, animationsEnabled) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, shape, sizeStyles, animationsEnabled]);

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...iconOnlyStyles, // Apply icon-only styles after size styles to override them
    ...isometricButtonStyles, // Apply isometric button styles
    width,
    height,
    ...style,
  };

  // Content rendering with animation mode support
  const renderTextContent = useMemo(() => {
    if (useAnimationMode && animationMode === 'typewriter' && typeof children === 'string') {
      return (
        <TypewriterText
          text={children}
          disabled={isDisabled || !useAnimationMode}
          speed={100}
        />
      );
    }
    return children;
  }, [children, useAnimationMode, animationMode, isDisabled]);

  const renderContent = () => {
    if (isButtonLoading) {
      // Map button size to spinner size
      const spinnerSize = size === 'xs' ? 'xs' : size === 'sm' ? 'xs' : 'sm';
      // Use the selected color for the spinner to match the button's color theme
      const spinnerColor = color;
      
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
          createCenteredContent(icon, iconPosition, size, renderTextContent)
        ) : (
          createTextContainer(renderTextContent)
        )}
      </>
    );
  };

  // Render button element
  const buttonElement = (
    <button
      ref={ref}
      id={id}
      disabled={Boolean(isDisabled)}
      onClick={handleAsyncClick}
      onMouseEnter={combinedMouseEnter}
      onMouseLeave={combinedMouseLeave}
      style={combinedStyles}
      className={className || ''}
      data-testid={dataTestId}
      {...restProps}
    >
      {renderContent()}
    </button>
  );

  // Wrap with isometric container if isometric animation is enabled
  const isometricWrappedButton = hasIsometricAnimation ? (
    <div style={isometricContainerStyles}>
      <div style={isometricShadowStyles} />
      {buttonElement}
    </div>
  ) : buttonElement;

  // Wrap with animation mode if applicable
  if (useAnimationMode && animationMode === 'parallax') {
    return (
      <ParallaxTiltWrapper
        disabled={isDisabled || !useAnimationMode}
      >
        {isometricWrappedButton}
      </ParallaxTiltWrapper>
    );
  }

  return isometricWrappedButton;
});

Button.displayName = 'Button';
