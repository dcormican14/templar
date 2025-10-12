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

  const colorMap: Record<string, any> = {
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
  customColor: string | undefined,
  variant: BadgeVariant,
  disabled: boolean,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);

  const baseStyles = {
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderTopStyle: 'solid' as const,
    borderRightStyle: 'solid' as const,
    borderBottomStyle: 'solid' as const,
    borderLeftStyle: 'solid' as const,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
  };

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderBottomColor: colors.main,
        borderLeftColor: colors.main,
        ...baseStyles,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border,
        ...baseStyles,
      };
    case 'ghost':
      return {
        backgroundColor: colors.background,
        color: colors.main,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        ...baseStyles,
      };
    case 'glassmorphic':
      // Create reflection gradient lines using the hover color with transparency
      const reflectionColor = colors.hover || colors.main || '#ffffff';
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      
      return {
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        color: colors.main,
        borderTopColor: 'rgba(255, 255, 255, 0.18)',
        borderRightColor: 'rgba(255, 255, 255, 0.18)',
        borderBottomColor: 'rgba(255, 255, 255, 0.18)',
        borderLeftColor: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', // Safari support
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.08)',
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderBottomColor: colors.main,
        borderLeftColor: colors.main,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: BadgeSize): React.CSSProperties => {
  const sizeMap = {
    xs: { 
      paddingTop: '2px',
      paddingRight: '6px',
      paddingBottom: '2px',
      paddingLeft: '6px',
      fontSize: '11px', 
      height: '20px',
      minWidth: '20px',
      gap: '2px'
    },
    sm: { 
      paddingTop: '3px',
      paddingRight: '8px',
      paddingBottom: '3px',
      paddingLeft: '8px',
      fontSize: '12px', 
      height: '24px',
      minWidth: '24px',
      gap: '3px'
    },
    md: { 
      paddingTop: '4px',
      paddingRight: '10px',
      paddingBottom: '4px',
      paddingLeft: '10px',
      fontSize: '13px', 
      height: '28px',
      minWidth: '28px',
      gap: '4px'
    },
    lg: { 
      paddingTop: '5px',
      paddingRight: '12px',
      paddingBottom: '5px',
      paddingLeft: '12px',
      fontSize: '14px', 
      height: '32px',
      minWidth: '32px',
      gap: '5px'
    },
    xl: { 
      paddingTop: '6px',
      paddingRight: '14px',
      paddingBottom: '6px',
      paddingLeft: '14px',
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
  rounded: boolean,
  isRemovable: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop - now just a boolean
  const finalShape = rounded ? 'pill' : 'round';
  
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

// Get icon-only styles (square/circular based on shape)
export const getIconOnlyStyles = (size: BadgeSize, shape: BadgeShape): React.CSSProperties => {
  // Get the height from the size styles to make width match height
  const sizeStyles = getSizeStyles(size);
  const height = sizeStyles.height;
  
  return {
    width: height, // Make width equal to height for square/circle
    minWidth: height, // Override minWidth from size styles
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    aspectRatio: '1', // Ensure 1:1 aspect ratio
  };
};

// Get isometric animation styles for Badge
export const getIsometricStyles = (color: any, variant: BadgeVariant, shape: BadgeShape) => {
  // Ghost and glassmorphic variants don't support isometric animation
  if (variant === 'ghost' || variant === 'glassmorphic') {
    return {};
  }
  
  // For outline variant, use the main color (primary). For solid, use foreground color.
  const borderColor = variant === 'outline' ? color.main : color.foreground || '#000000';
  
  const styles: any = {
    // Use individual border properties to avoid conflict with shorthand borderWidth
    borderTopWidth: '1px',
    borderLeftWidth: '1px', 
    borderRightWidth: '1px',
    borderBottomWidth: '4px', // Larger bottom border for 3D effect
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: 'translateY(0)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Ensure proper box-sizing and prevent collapse
    boxSizing: 'border-box',
    position: 'relative',
    // Adjust padding to account for larger bottom border
    paddingBottom: '1px', // Slightly reduce bottom padding to compensate
  };
  
  return styles;
};
