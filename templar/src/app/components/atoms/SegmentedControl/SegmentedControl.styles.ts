import { CSSProperties } from 'react';
import type { SegmentedControlSize, SegmentedControlVariant, SegmentedControlColor, SegmentedControlShape } from './SegmentedControl.types';

// Safe CSS variable access with fallback
const getCSSVar = (cssVars: any, key: string, fallback: string = '#000000'): string => {
  return cssVars?.[key] || fallback;
};

// Get color variables based on color prop
export const getColorVariables = (color: SegmentedControlColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  // Guard against undefined cssVars
  if (!cssVars) {
    return {
      main: '#0066cc',
      background: '#eff6ff',
      foreground: '#ffffff',
      hover: '#0052a3',
      accent: '#0066cc',
      shadow: 'rgba(0, 0, 0, 0.1)',
      disabled: '#d1d5db',
      border: '#0066cc',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary || '#0066cc',
      background: cssVars.primaryBackground || '#eff6ff',
      foreground: cssVars.primaryForeground || '#ffffff',
      hover: cssVars.primaryHover || '#0052a3',
      accent: cssVars.primaryAccent || '#0066cc',
      shadow: cssVars.primaryShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.primaryDisabled || '#d1d5db',
      border: cssVars.primaryBorder || '#0066cc',
    },
    secondary: {
      main: cssVars.secondary || '#6b7280',
      background: cssVars.secondaryBackground || '#f9fafb',
      foreground: cssVars.secondaryForeground || '#ffffff',
      hover: cssVars.secondaryHover || '#4b5563',
      accent: cssVars.secondaryAccent || '#6b7280',
      shadow: cssVars.secondaryShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.secondaryDisabled || '#d1d5db',
      border: cssVars.secondaryBorder || '#6b7280',
    },
    success: {
      main: cssVars.success || '#10b981',
      background: cssVars.successBackground || '#ecfdf5',
      foreground: cssVars.successForeground || '#ffffff',
      hover: cssVars.successHover || '#059669',
      accent: cssVars.successAccent || '#10b981',
      shadow: cssVars.successShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.successDisabled || '#d1d5db',
      border: cssVars.successBorder || '#10b981',
    },
    warning: {
      main: cssVars.warning || '#f59e0b',
      background: cssVars.warningBackground || '#fffbeb',
      foreground: cssVars.warningForeground || '#ffffff',
      hover: cssVars.warningHover || '#d97706',
      accent: cssVars.warningAccent || '#f59e0b',
      shadow: cssVars.warningShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.warningDisabled || '#d1d5db',
      border: cssVars.warningBorder || '#f59e0b',
    },
    destructive: {
      main: cssVars.destructive || '#ef4444',
      background: cssVars.destructiveBackground || '#fef2f2',
      foreground: cssVars.destructiveForeground || '#ffffff',
      hover: cssVars.destructiveHover || '#dc2626',
      accent: cssVars.destructiveAccent || '#ef4444',
      shadow: cssVars.destructiveShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.destructiveDisabled || '#d1d5db',
      border: cssVars.destructiveBorder || '#ef4444',
    },
    info: {
      main: cssVars.info || '#3b82f6',
      background: cssVars.infoBackground || '#eff6ff',
      foreground: cssVars.infoForeground || '#ffffff',
      hover: cssVars.infoHover || '#2563eb',
      accent: cssVars.infoAccent || '#3b82f6',
      shadow: cssVars.infoShadow || 'rgba(0, 0, 0, 0.1)',
      disabled: cssVars.infoDisabled || '#d1d5db',
      border: cssVars.infoBorder || '#3b82f6',
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Size configurations following design standards
export const getSegmentedControlDimensions = (size: SegmentedControlSize) => {
  switch (size) {
    case 'xs':
      return {
        height: 40,
        minWidth: 200,
        fontSize: '14px',
        padding: '4px',
        borderRadius: 12,
      };
    case 'sm':
      return {
        height: 40,
        minWidth: 220,
        fontSize: '14px',
        padding: '4px',
        borderRadius: 12,
      };
    case 'lg':
      return {
        height: 52,
        minWidth: 260,
        fontSize: '16px',
        padding: '4px',
        borderRadius: 12,
      };
    case 'xl':
      return {
        height: 60,
        minWidth: 280,
        fontSize: '18px',
        padding: '4px',
        borderRadius: 12,
      };
    case 'md':
    default:
      return {
        height: 48,
        minWidth: 240,
        fontSize: '16px',
        padding: '4px',
        borderRadius: 12,
      };
  }
};

// Get variant styles for container
export const getVariantStyles = (
  variant: SegmentedControlVariant,
  color: SegmentedControlColor,
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
      borderColor: getCSSVar(cssVars, 'destructive', '#ef4444'),
    };

    switch (variant) {
      case 'solid':
        return {
          ...baseErrorStyle,
          backgroundColor: getCSSVar(cssVars, 'destructiveAccent', getCSSVar(cssVars, 'destructive', '#ef4444')),
        };
      case 'ghost':
        return {
          ...baseErrorStyle,
          backgroundColor: 'transparent',
        };
      case 'glassmorphic':
        return {
          ...baseErrorStyle,
          backgroundColor: getCSSVar(cssVars, 'destructiveBackground', '#fef2f2'),
        };
      case 'outline':
      default:
        return {
          ...baseErrorStyle,
          backgroundColor: getCSSVar(cssVars, 'background', '#ffffff'),
        };
    }
  }

  // Normal state styles by variant
  switch (variant) {
    case 'solid':
      return {
        borderColor: colors.accent || colors.main,
        backgroundColor: colors.background,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'ghost':
      return {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
    case 'glassmorphic':
      return {
        borderColor: colors.border,
        backgroundColor: colors.background,
        borderWidth: '2px',
        borderStyle: 'solid' as const,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      };
    case 'outline':
    default:
      return {
        borderColor: colors.main,
        backgroundColor: getCSSVar(cssVars, 'background', '#ffffff'),
        borderWidth: '2px',
        borderStyle: 'solid' as const,
      };
  }
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: SegmentedControlShape, size: SegmentedControlSize): CSSProperties => {
  const dimensions = getSegmentedControlDimensions(size);

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

// Main container styles
export const getContainerStyles = (
  size: SegmentedControlSize,
  variant: SegmentedControlVariant,
  color: SegmentedControlColor,
  customColor: string | undefined,
  shape: SegmentedControlShape,
  disabled: boolean,
  error: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  fullWidth?: boolean,
  itemCount?: number
): CSSProperties => {
  const dimensions = getSegmentedControlDimensions(size);
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars, error);
  const shapeStyles = getShapeStyles(shape, size);

  return {
    position: 'relative',
    display: 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    minWidth: `${dimensions.minWidth}px`,
    height: `${dimensions.height}px`,
    fontFamily: 'inherit',
    transition: animationsEnabled
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)'
      : 'none',
    cursor: disabled ? 'not-allowed' : 'auto',
    opacity: disabled ? 0.6 : 1,
    padding: `${dimensions.padding}px`,
    boxSizing: 'border-box',
    ...variantStyles,
    ...shapeStyles,
  };
};

// Segment styles
export const getSegmentStyles = (
  size: SegmentedControlSize,
  variant: SegmentedControlVariant,
  color: SegmentedControlColor,
  customColor: string | undefined,
  shape: SegmentedControlShape,
  isSelected: boolean,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getSegmentedControlDimensions(size);
  const colors = getColorVariables(color, customColor, cssVars);

  const getSegmentColor = () => {
    if (disabled) {
      return getCSSVar(cssVars, 'mutedForeground', '#9ca3af');
    }

    if (isSelected) {
      return colors.main;
    }

    return getCSSVar(cssVars, 'mutedForeground', '#9ca3af');
  };

  return {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    fontSize: dimensions.fontSize,
    fontWeight: isSelected ? '600' : '400',
    color: getSegmentColor(),
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: animationsEnabled
      ? 'color var(--duration-fast) var(--animation-smooth), font-weight var(--duration-fast) var(--animation-smooth)'
      : 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    outline: 'none',
    minWidth: 0,
    boxSizing: 'border-box',
    borderRadius: 'inherit',
  };
};

// Indicator styles (the sliding background behind selected segment)
export const getIndicatorStyles = (
  selectedIndex: number,
  itemCount: number,
  variant: SegmentedControlVariant,
  color: SegmentedControlColor,
  customColor: string | undefined,
  shape: SegmentedControlShape,
  size: SegmentedControlSize,
  animationsEnabled: boolean,
  cssVars: any
): CSSProperties => {
  const translateX = `${selectedIndex * 100}%`;
  const colors = getColorVariables(color, customColor, cssVars);
  const dimensions = getSegmentedControlDimensions(size);

  // Get indicator background based on variant
  const getIndicatorBackground = () => {
    switch (variant) {
      case 'solid':
        return colors.accent || colors.main;
      case 'outline':
        return getCSSVar(cssVars, 'background', '#ffffff');
      case 'ghost':
        return colors.background || colors.main + '10';
      case 'glassmorphic':
        return colors.background;
      default:
        return getCSSVar(cssVars, 'background', '#ffffff');
    }
  };

  // Get border styles
  const getBorderStyles = () => {
    switch (variant) {
      case 'solid':
        return {
          borderWidth: '0',
          borderStyle: 'none' as const,
        };
      case 'outline':
        return {
          borderWidth: '2px',
          borderStyle: 'solid' as const,
          borderColor: colors.main,
        };
      case 'ghost':
        return {
          borderWidth: '0',
          borderStyle: 'none' as const,
        };
      case 'glassmorphic':
        return {
          borderWidth: '1px',
          borderStyle: 'solid' as const,
          borderColor: colors.border,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        };
      default:
        return {
          borderWidth: '1px',
          borderStyle: 'solid' as const,
          borderColor: getCSSVar(cssVars, 'border', '#e5e7eb'),
        };
    }
  };

  // Get shape radius for indicator (should be slightly smaller than container)
  const getIndicatorRadius = () => {
    switch (shape) {
      case 'sharp':
        return '0';
      case 'round':
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
      case 'pill':
        return '9999px';
      default:
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
    }
  };

  return {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: `calc((100% - 4px) / ${itemCount})`,
    height: 'calc(100% - 4px)',
    borderRadius: getIndicatorRadius(),
    backgroundColor: getIndicatorBackground(),
    transform: `translateX(${translateX})`,
    transition: animationsEnabled
      ? 'transform var(--duration-smooth) var(--animation-spring)'
      : 'none',
    zIndex: 1,
    boxShadow: variant !== 'ghost' ? `0 1px 2px ${getCSSVar(cssVars, 'shadowSm', 'rgba(0, 0, 0, 0.05)')}` : 'none',
    ...getBorderStyles(),
  };
};

