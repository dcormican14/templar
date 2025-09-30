import { CSSProperties } from 'react';
import type { SearchColor, SearchVariant, SearchSize, SearchShape } from './Search.types';

// Get color variables based on color prop
export const getColorVariables = (color: SearchColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Size configurations following design standards (matching Button component heights)
export const getSearchDimensions = (size: SearchSize) => {
  switch (size) {
    case 'xs':
      return {
        height: 40, // Matches Button xs height
        minWidth: 200,
        fontSize: '14px',
        iconSize: 16,
        paddingX: 8,
        paddingY: 6,
        borderRadius: 12,
      };
    case 'sm':
      return {
        height: 40, // Matches Button sm height
        minWidth: 220,
        fontSize: '14px',
        iconSize: 18,
        paddingX: 10,
        paddingY: 8,
        borderRadius: 12,
      };
    case 'lg':
      return {
        height: 52, // Matches Button lg height
        minWidth: 260,
        fontSize: '16px',
        iconSize: 22,
        paddingX: 14,
        paddingY: 12,
        borderRadius: 12,
      };
    case 'xl':
      return {
        height: 60, // Matches Button xl height
        minWidth: 280,
        fontSize: '18px',
        iconSize: 24,
        paddingX: 16,
        paddingY: 14,
        borderRadius: 12,
      };
    case 'md':
    default:
      return {
        height: 48, // Matches Button md height
        minWidth: 240,
        fontSize: '16px', // Updated to match Button md fontSize
        iconSize: 20,
        paddingX: 12,
        paddingY: 10,
        borderRadius: 12,
      };
  }
};

// Get variant styles for search input
export const getVariantStyles = (
  variant: SearchVariant,
  color: SearchColor,
  customColor: string | undefined,
  cssVars: any,
  error: boolean
): CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);

  // Error state override
  if (error) {
    const baseErrorStyle = {
      borderWidth: '2px',
      borderStyle: 'solid' as const,
      borderColor: cssVars.destructive,
    };

    switch (variant) {
      case 'solid':
        return {
          ...baseErrorStyle,
          backgroundColor: cssVars.destructiveAccent || cssVars.destructive,
          color: colors.foreground, // Keep original foreground color, not destructive
        };
      case 'ghost':
        return {
          ...baseErrorStyle,
          backgroundColor: 'transparent',
          color: cssVars.foreground,
        };
      case 'glassmorphic':
        return {
          ...baseErrorStyle,
          backgroundColor: cssVars.destructiveBackground,
          color: cssVars.destructiveForeground,
        };
      case 'outline':
      default:
        return {
          ...baseErrorStyle,
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
        };
    }
  }

  // Normal state styles by variant
  switch (variant) {
    case 'solid':
      return {
        borderColor: colors.accent || colors.main,
        backgroundColor: colors.accent || colors.main,
        color: colors.foreground,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'ghost':
      return {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: cssVars.foreground,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'glassmorphic':
      return {
        borderColor: colors.border,
        backgroundColor: colors.background,
        color: colors.foreground,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'outline':
    default:
      return {
        borderColor: colors.main,
        backgroundColor: cssVars.background,
        color: cssVars.foreground,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
  }
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: SearchShape, size: SearchSize): CSSProperties => {
  const dimensions = getSearchDimensions(size);

  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: `${dimensions.borderRadius}px` };
    case 'pill':
      return { borderRadius: '9999px' };
    default:
      return { borderRadius: `${dimensions.borderRadius}px` };
  }
};

// Main search container styles
export const getSearchContainerStyles = (
  size: SearchSize,
  variant: SearchVariant,
  color: SearchColor,
  customColor: string | undefined,
  shape: SearchShape,
  disabled: boolean,
  focused: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  width?: string | number
): CSSProperties => {
  const dimensions = getSearchDimensions(size);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars, error);
  const shapeStyles = getShapeStyles(shape, size);
  const colors = getColorVariables(color, customColor, cssVars);

  const baseStyles: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: width || 'auto',
    minWidth: `${dimensions.minWidth}px`,
    height: `${dimensions.height}px`,
    fontFamily: 'inherit',
    transition: animationsEnabled
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const focusStyles: CSSProperties = focused ? {
    outline: `2px solid ${error ? cssVars.destructive : colors.main}`,
    outlineOffset: '2px',
  } : {};

  return {
    ...baseStyles,
    ...variantStyles,
    ...shapeStyles,
    ...focusStyles,
  };
};

// Search input styles
export const getSearchInputStyles = (
  size: SearchSize,
  variant: SearchVariant,
  color: SearchColor,
  customColor: string | undefined,
  disabled: boolean,
  hasLeftIcon: boolean,
  hasRightIcon: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getSearchDimensions(size);
  const colors = getColorVariables(color, customColor, cssVars);

  // Calculate padding based on icons
  const leftPadding = hasLeftIcon ? dimensions.iconSize + dimensions.paddingX + 8 : dimensions.paddingX;
  const rightPadding = hasRightIcon ? dimensions.iconSize + dimensions.paddingX + 8 : dimensions.paddingX;

  const baseStyles: CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: dimensions.fontSize,
    lineHeight: 1.5,
    paddingLeft: `${leftPadding}px`,
    paddingRight: `${rightPadding}px`,
    paddingTop: `${dimensions.paddingY}px`,
    paddingBottom: `${dimensions.paddingY}px`,
    // Reset browser styles
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  };

  // Color based on variant
  const getInputColor = () => {
    switch (variant) {
      case 'solid':
        return colors.foreground;
      case 'outline':
      case 'ghost':
      case 'glassmorphic':
      default:
        return cssVars.foreground;
    }
  };

  return {
    ...baseStyles,
    color: getInputColor(),
    cursor: disabled ? 'not-allowed' : 'text',
  };
};

// Separate function to get placeholder color for use in component
export const getPlaceholderColor = (cssVars: any, variant: SearchVariant = 'outline'): string => {
  switch (variant) {
    case 'solid':
      return cssVars.primaryForeground;
    case 'outline':
      return cssVars.mutedForeground;
    case 'ghost':
      return cssVars.mutedForeground;
    default:
      return cssVars.mutedForeground;
  }
};

// Search icon styles
export const getSearchIconStyles = (
  size: SearchSize,
  position: 'left' | 'right',
  variant: SearchVariant,
  color: SearchColor,
  customColor: string | undefined,
  disabled: boolean,
  clickable: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getSearchDimensions(size);
  const colors = getColorVariables(color, customColor, cssVars);

  // Determine icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case 'solid':
        return colors.foreground;
      case 'outline':
      case 'ghost':
      case 'glassmorphic':
      default:
        return cssVars.mutedForeground;
    }
  };

  const baseStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [position]: `${dimensions.paddingX}px`,
    width: `${dimensions.iconSize}px`,
    height: `${dimensions.iconSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    color: getIconColor(),
    cursor: clickable && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: animationsEnabled ? 'color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)' : 'none',
    zIndex: 1,
  };

  return baseStyles;
};

// Loading spinner styles
export const getLoadingStyles = (
  size: SearchSize,
  animationsEnabled: boolean
): CSSProperties => {
  const dimensions = getSearchDimensions(size);

  return {
    animation: animationsEnabled ? 'spin 1s linear infinite' : 'none',
    width: `${dimensions.iconSize}px`,
    height: `${dimensions.iconSize}px`,
  };
};
