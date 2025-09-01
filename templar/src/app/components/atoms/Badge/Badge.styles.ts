import React from 'react';
import type { BadgeColor, BadgeVariant, BadgeSize, BadgeShape } from './Badge.types';

// Get color variables based on color prop
export const getColorVariables = (color: BadgeColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
    };
  }

  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: BadgeShape): React.CSSProperties => {
  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: '12px' };
    case 'pill':
      return { borderRadius: '9999px' };
    default:
      return { borderRadius: '9999px' }; // Default to pill for badges
  }
};

export const getVariantStyles = (
  color: BadgeColor,
  variant: BadgeVariant,
  customColor: string | undefined,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);

  const baseStyles = {
    borderWidth: '1px',
    borderStyle: 'solid' as const,
  };

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: colors.main,
        color: colors.foreground,
        borderColor: colors.main,
        ...baseStyles,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderColor: colors.border,
        ...baseStyles,
      };
    case 'ghost':
      return {
        backgroundColor: colors.background,
        color: colors.main,
        borderColor: 'transparent',
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: colors.main,
        color: colors.foreground,
        borderColor: colors.main,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: BadgeSize): React.CSSProperties => {
  const sizeMap = {
    xs: { 
      padding: '2px 6px', 
      fontSize: '11px', 
      height: '20px',
      minWidth: '20px',
      gap: '2px'
    },
    sm: { 
      padding: '3px 8px', 
      fontSize: '12px', 
      height: '24px',
      minWidth: '24px',
      gap: '3px'
    },
    md: { 
      padding: '4px 10px', 
      fontSize: '13px', 
      height: '28px',
      minWidth: '28px',
      gap: '4px'
    },
    lg: { 
      padding: '5px 12px', 
      fontSize: '14px', 
      height: '32px',
      minWidth: '32px',
      gap: '5px'
    },
    xl: { 
      padding: '6px 14px', 
      fontSize: '15px', 
      height: '36px',
      minWidth: '36px',
      gap: '6px'
    },
  };
  return sizeMap[size];
};

export const getIconSize = (badgeSize: BadgeSize): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  const iconSizeMap = {
    xs: 'xs' as const,
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'sm' as const,
    xl: 'md' as const,
  };
  return iconSizeMap[badgeSize];
};

export const createBaseStyles = (
  shape: BadgeShape,
  isRemovable: boolean,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    fontWeight: '500',
    fontFamily: 'inherit',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth)'
      : 'none',
    cursor: isRemovable ? 'default' : 'auto',
    position: 'relative',
    ...getShapeStyles(finalShape),
  };
};
