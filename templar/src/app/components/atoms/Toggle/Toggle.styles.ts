import React from 'react';
import type { ToggleSize, ToggleColor, ToggleVariant } from './Toggle.types';

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
      accent: cssVars.primaryAccent,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      background: cssVars.primaryBackground,
    },
    secondary: {
      main: cssVars.secondary,
      accent: cssVars.secondaryAccent,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
      background: cssVars.secondaryBackground,
    },
    success: {
      main: cssVars.success,
      accent: cssVars.successAccent,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
      background: cssVars.successBackground,
    },
    warning: {
      main: cssVars.warning,
      accent: cssVars.warningAccent,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
      background: cssVars.warningBackground,
    },
    destructive: {
      main: cssVars.destructive,
      accent: cssVars.destructiveAccent,
      foreground: cssVars.destructiveForeground || '#ffffff',
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
      background: cssVars.destructiveBackground,
    },
    info: {
      main: cssVars.info,
      accent: cssVars.infoAccent,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
      background: cssVars.infoBackground,
    },
    custom: {
      main: cssVars.primary,
      accent: cssVars.primaryAccent,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      background: cssVars.primaryBackground,
    },
  };

  return colorMap[color] || colorMap.primary;
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

// Get variant-specific styles for toggle track
export const getVariantStyles = (
  variant: ToggleVariant,
  colors: any,
  checked: boolean,
  cssVars: any
): React.CSSProperties => {
  switch (variant) {
    case 'solid':
      // Background is always --color (main), never changes
      // Toggle slider is always --color-foreground
      return {
        backgroundColor: colors.main,
        borderColor: colors.main,
      };
    case 'ghost':
      // Background uses cssVars.background (same as outline TextArea), toggle slider is --color-foreground
      return {
        backgroundColor: cssVars.background,
        borderColor: cssVars.background,
      };
    case 'outline':
      // Background always cssVars.background, border always --color (main)
      return {
        backgroundColor: cssVars.background,
        borderColor: colors.main,
      };
    case 'glassmorphic':
      // Glassmorphic background with window pane effect
      const reflectionColor = colors.hover || colors.main || '#ffffff';
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;

      return {
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
      };
    default:
      return {
        backgroundColor: colors.main,
        borderColor: colors.main,
      };
  }
};

// Toggle track (background) styles (matching Search component with 2px border)
export const getToggleTrackStyles = (
  size: ToggleSize,
  color: ToggleColor,
  variant: ToggleVariant,
  checked: boolean,
  disabled: boolean,
  focused: boolean,
  cssVars: any
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);
  const variantStyles = getVariantStyles(variant, colors, checked, cssVars);

  return {
    position: 'relative',
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    border: `2px solid`,
    borderRadius: `${dimensions.height}px`,
    transition: 'background-color var(--toggle-duration) var(--animation-spring), border-color var(--toggle-duration) var(--animation-spring), opacity var(--toggle-duration) var(--animation-spring)',
    outline: focused ? `2px solid ${colors.main}` : 'none',
    outlineOffset: '2px',
    opacity: disabled ? 0.4 : 1,
    ...variantStyles,
  };
};

// Get bubble styles based on variant
export const getBubbleStyles = (
  size: ToggleSize,
  color: ToggleColor,
  checked: boolean,
  disabled: boolean,
  cssVars: any,
  variant: ToggleVariant
): React.CSSProperties => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);

  // Border width of the track
  const borderWidth = 2;

  // Calculate the available space inside the track (excluding borders)
  const trackInnerWidth = dimensions.width - (borderWidth * 2);
  const trackInnerHeight = dimensions.height - (borderWidth * 2);

  // Calculate horizontal positions for unchecked and checked states
  // Start position: padding from the left edge
  const startX = dimensions.padding;
  // End position: track inner width minus bubble size minus padding
  const endX = trackInnerWidth - dimensions.bubbleSize - dimensions.padding;
  // Distance to travel
  const travelDistance = endX - startX;

  // Base bubble styles
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    // Center vertically using top 50% and translateY
    top: '50%',
    // Start from the left padding position
    left: `${startX}px`,
    width: `${dimensions.bubbleSize}px`,
    height: `${dimensions.bubbleSize}px`,
    borderRadius: '50%',
    // When checked, translateX by the travel distance; always center vertically with translateY(-50%)
    transform: checked
      ? `translateX(${travelDistance}px) translateY(-50%)`
      : 'translateX(0) translateY(-50%)',
    transition: 'all var(--toggle-duration) var(--animation-spring)',
  };

  // Variant-specific bubble styles
  if (variant === 'glassmorphic') {
    // Window pane with faint color-specific glow
    return {
      ...baseStyles,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: `0 0 10px ${colors.main}40, 0 2px 4px rgba(0, 0, 0, 0.1)`,
    };
  }

  // For all other variants: use --color-foreground
  return {
    ...baseStyles,
    backgroundColor: colors.foreground,
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
