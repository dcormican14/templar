import React from 'react';
import type { ToggleSize, ToggleVariant } from './Toggle.types';

// Get size-specific dimensions
export const getToggleDimensions = (size: ToggleSize) => {
  switch (size) {
    case 'sm':
      return {
        width: 36,
        height: 20,
        bubbleSize: 16,
        padding: 2,
      };
    case 'lg':
      return {
        width: 56,
        height: 32,
        bubbleSize: 28,
        padding: 2,
      };
    case 'md':
    default:
      return {
        width: 44,
        height: 24,
        bubbleSize: 20,
        padding: 2,
      };
  }
};

// Get variant colors
export const getToggleColors = (variant: ToggleVariant, checked: boolean, disabled: boolean, cssVars: any) => {
  // Get the variant's primary color
  let variantColor;
  let variantForeground;
  
  switch (variant) {
    case 'primary':
      variantColor = cssVars.primary;
      variantForeground = cssVars.primaryForeground;
      break;
    case 'secondary':
      variantColor = cssVars.secondary;
      variantForeground = cssVars.secondaryForeground;
      break;
    case 'success':
      variantColor = cssVars.success || cssVars.primary;
      variantForeground = cssVars.successForeground || cssVars.primaryForeground;
      break;
    case 'warning':
      variantColor = cssVars.warning || cssVars.primary;
      variantForeground = cssVars.warningForeground || cssVars.primaryForeground;
      break;
    case 'error':
      variantColor = cssVars.error;
      variantForeground = cssVars.errorForeground;
      break;
    default:
      variantColor = cssVars.primary;
      variantForeground = cssVars.primaryForeground;
  }

  if (!checked) {
    return {
      background: cssVars.muted,
      bubble: cssVars.background,
      variantColor, // Keep the variant color for focus outlines
    };
  }

  return {
    background: variantColor,
    bubble: variantForeground,
    variantColor,
  };
};

// Main toggle container styles
export const getToggleContainerStyles = (
  size: ToggleSize,
  disabled: boolean,
  className?: string
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size === 'sm' ? '8px' : size === 'lg' ? '12px' : '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
  };
};

// Toggle track (background) styles
export const getToggleTrackStyles = (
  size: ToggleSize,
  variant: ToggleVariant,
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  cssVars: any
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(variant, checked, disabled, cssVars);
  
  return {
    position: 'relative',
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: colors.background,
    borderRadius: `${dimensions.height}px`,
    transition: 'background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    outline: focused ? `2px solid ${colors.variantColor}` : 'none',
    outlineOffset: '2px',
    boxShadow: focused ? `0 0 0 2px ${colors.variantColor}20` : 'none',
    opacity: disabled ? 0.4 : 1,
  };
};

// Main bubble styles
export const getBubbleStyles = (
  size: ToggleSize,
  variant: ToggleVariant,
  checked: boolean,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(variant, checked, disabled, cssVars);
  
  // Calculate positions
  const uncheckedX = dimensions.padding;
  const checkedX = dimensions.width - dimensions.bubbleSize - dimensions.padding;
  
  return {
    position: 'absolute',
    top: `${dimensions.padding}px`,
    left: `${uncheckedX}px`,
    width: `${dimensions.bubbleSize}px`,
    height: `${dimensions.bubbleSize}px`,
    backgroundColor: colors.bubble,
    borderRadius: '50%',
    transform: checked ? `translateX(${checkedX - uncheckedX}px) scale(1)` : 'translateX(0) scale(1)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
};

// Hidden input styles
export const getHiddenInputStyles = (): React.CSSProperties => ({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: 'none',
  outline: 'none',
});

// Label styles
export const getLabelStyles = (
  size: ToggleSize,
  disabled: boolean,
  position: 'left' | 'right',
  cssVars: any
): React.CSSProperties => {
  const fontSize = size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
  const order = position === 'left' ? -1 : 1;
  
  return {
    fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    order,
    userSelect: 'none',
    lineHeight: 1.4,
  };
};

// Description styles
export const getDescriptionStyles = (
  size: ToggleSize,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '14px' : '13px';
  
  return {
    fontSize,
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    marginTop: '2px',
    lineHeight: 1.3,
    userSelect: 'none',
  };
};

// Label container styles (for label + description)
export const getLabelContainerStyles = (
  position: 'left' | 'right'
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  order: position === 'left' ? -1 : 1,
});
