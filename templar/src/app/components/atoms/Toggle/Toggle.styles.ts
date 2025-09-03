import React from 'react';
import type { ToggleSize, ToggleColor } from './Toggle.types';

// Get size-specific dimensions
export const getToggleDimensions = (size: ToggleSize) => {
  switch (size) {
    case 'xs':
      return {
        width: 32,
        height: 18,
        bubbleSize: 14,
        padding: 2,
      };
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
    case 'xl':
      return {
        width: 64,
        height: 36,
        bubbleSize: 32,
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

// Get color variables based on color prop
export const getToggleColors = (color: ToggleColor, checked: boolean, disabled: boolean, cssVars: any) => {
  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
    },
    secondary: {
      main: cssVars.secondary,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
    },
    success: {
      main: cssVars.success,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
    },
    warning: {
      main: cssVars.warning,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
    },
    destructive: {
      main: cssVars.error,
      foreground: cssVars.errorForeground || '#ffffff',
      hover: cssVars.errorHover,
    },
    info: {
      main: cssVars.info,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
    },
    custom: {
      main: cssVars.primary,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
    },
  };
  
  const colors = colorMap[color] || colorMap.primary;

  if (!checked) {
    return {
      background: cssVars.muted,
      bubble: cssVars.background,
      variantColor: colors.main, // Keep the color for focus outlines
    };
  }

  return {
    background: colors.main,
    bubble: colors.foreground,
    variantColor: colors.main,
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
  color: ToggleColor,
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  cssVars: any
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);
  
  return {
    position: 'relative',
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: colors.background,
    borderRadius: `${dimensions.height}px`,
    transition: 'background-color var(--toggle-duration) var(--animation-spring), opacity var(--toggle-duration) var(--animation-spring)',
    outline: focused ? `2px solid ${colors.variantColor}` : 'none',
    outlineOffset: '2px',
    boxShadow: focused ? `0 0 0 2px ${colors.variantColor}20` : 'none',
    opacity: disabled ? 0.4 : 1,
  };
};

// Main bubble styles
export const getBubbleStyles = (
  size: ToggleSize,
  color: ToggleColor,
  checked: boolean,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);
  
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
    transition: 'all var(--toggle-duration) var(--animation-spring)',
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
  const fontSizeMap = {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  };
  const fontSize = fontSizeMap[size] || fontSizeMap.md;
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
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '13px',
    lg: '14px',
    xl: '16px',
  };
  const fontSize = fontSizeMap[size] || fontSizeMap.md;
  
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
