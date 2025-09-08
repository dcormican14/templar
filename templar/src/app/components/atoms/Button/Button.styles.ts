import React from 'react';
import type { ButtonColor, ButtonVariant, ButtonSize, ButtonShape } from './Button.types';

// Get color variables based on color prop
export const getColorVariables = (color: ButtonColor, customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff', // Default to white text for custom colors
      hover: customColor + '20', // Add opacity for hover
      disabled: customColor + '40',
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

export const getVariantStyles = (
  color: ButtonColor,
  variant: ButtonVariant,
  customColor: string | undefined,
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
  };

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: colors.accent || colors.main,
        color: colors.foreground,
        borderTopColor: colors.accent || colors.main,
        borderRightColor: colors.accent || colors.main,
        borderLeftColor: colors.accent || colors.main,
        borderBottomColor: colors.accent || colors.main,
        ...baseStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: colors.hover,
          borderTopColor: colors.hover,
          borderRightColor: colors.hover,
          borderLeftColor: colors.hover,
          borderBottomColor: colors.hover,
        },
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderLeftColor: colors.main,
        borderBottomColor: colors.main,
        ...baseStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: colors.background || colors.main + '10',
          borderTopColor: colors.hover,
          borderRightColor: colors.hover,
          borderLeftColor: colors.hover,
          borderBottomColor: colors.hover,
          color: colors.hover,
        },
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        ...baseStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: colors.background || colors.main + '10',
          color: colors.hover,
        },
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
        backdropFilter: 'blur(10px)',
        color: colors.main,
        boxShadow: `0 8px 32px 0 ${colors.shadow || 'rgba(31, 38, 135, 0.37)'}`,
        position: 'relative',
        overflow: 'hidden',
        ...baseStyles,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        borderRightColor: 'rgba(255, 255, 255, 0.2)',
        borderLeftColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        '&:hover:not(:disabled)': {
          background: `
            linear-gradient(135deg, transparent 0%, ${reflectionColor}30 20%, ${reflectionColor}25 25%, transparent 35%),
            linear-gradient(135deg, transparent 45%, ${reflectionColor}35 55%, ${reflectionColor}30 65%, transparent 80%),
            rgba(255, 255, 255, 0.15)
          `,
          backdropFilter: 'blur(15px)',
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          borderRightColor: 'rgba(255, 255, 255, 0.3)',
          borderLeftColor: 'rgba(255, 255, 255, 0.3)',
          borderBottomColor: 'rgba(255, 255, 255, 0.3)',
          transform: 'translateY(-1px)',
          boxShadow: `0 12px 40px 0 ${colors.shadow || 'rgba(31, 38, 135, 0.45)'}`,
        },
      };
    default:
      return {
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderLeftColor: colors.main,
        borderBottomColor: colors.main,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
  const sizeMap = {
    xs: { 
      paddingTop: '4px',
      paddingRight: '12px', 
      paddingBottom: '4px',
      paddingLeft: '12px',
      fontSize: '14px', 
      minWidth: '82px', 
      height: '40px' 
    },
    sm: { 
      paddingTop: '6px',
      paddingRight: '12px', 
      paddingBottom: '6px',
      paddingLeft: '12px',
      fontSize: '14px', 
      minWidth: '82px', 
      height: '40px' 
    },
    md: { 
      paddingTop: '8px',
      paddingRight: '16px', 
      paddingBottom: '8px',
      paddingLeft: '16px',
      fontSize: '16px', 
      minWidth: '112px', 
      height: '48px' 
    },
    lg: { 
      paddingTop: '10px',
      paddingRight: '20px', 
      paddingBottom: '10px',
      paddingLeft: '20px',
      fontSize: '16px', 
      minWidth: '112px', 
      height: '52px' 
    },
    xl: { 
      paddingTop: '12px',
      paddingRight: '24px', 
      paddingBottom: '12px',
      paddingLeft: '24px',
      fontSize: '18px', 
      minWidth: '142px', 
      height: '60px' 
    },
  };
  return sizeMap[size];
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: ButtonShape): React.CSSProperties => {
  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: '12px' };
    case 'pill':
      return { borderRadius: '9999px' };
    default:
      return { borderRadius: '12px' };
  }
};

export const getIconSize = (buttonSize: ButtonSize): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  const iconSizeMap = {
    xs: 'sm' as const,
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'md' as const,
    xl: 'lg' as const,
  };
  return iconSizeMap[buttonSize];
};

export const createBaseStyles = (
  fullWidth: boolean,
  isDisabled: boolean,
  hasIcon: boolean,
  shape: ButtonShape,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    pointerEvents: isDisabled ? 'none' : 'auto',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth), box-shadow var(--duration-fast) var(--animation-smooth)'
      : 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    fontWeight: '500',
    outline: 'none',
    position: 'relative',
    fontFamily: 'inherit',
    userSelect: 'none',
    ...getShapeStyles(finalShape),
  };
};


// Get isometric animation styles
export const getIsometricStyles = (color: any, variant: string, shape: string) => {
  // Ghost and glassmorphic variants don't support isometric animation
  if (variant === 'ghost' || variant === 'glassmorphic') {
    return {};
  }
  
  // For outline variant, use the main color (primary). For solid, use foreground color.
  const borderColor = variant === 'outline' ? color.main : color.foreground || '#000000';
  
  const styles: any = {
    // Large bottom border - override the base 1px
    borderBottomWidth: '6px',
    borderBottomStyle: 'solid',
    borderBottomColor: borderColor,
    transform: 'translateY(0)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Ensure proper box-sizing and prevent collapse
    boxSizing: 'border-box',
    position: 'relative',
    // Adjust padding to account for larger bottom border
    paddingBottom: '2px', // Slightly reduce bottom padding to compensate
  };
  
  // For solid variant, make all border colors match the bottom border (foreground color)
  if (variant === 'solid') {
    styles.borderTopColor = borderColor;
    styles.borderRightColor = borderColor;
    styles.borderLeftColor = borderColor;
  }
  
  return styles;
};
