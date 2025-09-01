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

  const colorMap = {
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
        '&:hover:not(:disabled)': {
          backgroundColor: colors.hover,
          borderColor: colors.hover,
        },
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderColor: colors.main,
        ...baseStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: colors.background || colors.main + '10',
          borderColor: colors.hover,
          color: colors.hover,
        },
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        borderColor: 'transparent',
        ...baseStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: colors.background || colors.main + '10',
          color: colors.hover,
        },
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

export const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
  const sizeMap = {
    xs: { padding: '4px 12px', fontSize: '14px', minWidth: '82px', height: '40px' },
    sm: { padding: '6px 12px', fontSize: '14px', minWidth: '82px', height: '40px' },
    md: { padding: '8px 16px', fontSize: '16px', minWidth: '112px', height: '48px' },
    lg: { padding: '10px 20px', fontSize: '16px', minWidth: '112px', height: '52px' },
    xl: { padding: '12px 24px', fontSize: '18px', minWidth: '142px', height: '60px' },
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
