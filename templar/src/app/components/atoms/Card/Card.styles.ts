import React from 'react';
import type { CardColor, CardVariant, CardSize, CardShape, CardPadding } from './Card.types';

// Get color variables based on color prop
export const getColorVariables = (color: CardColor, customColor: string | undefined, cssVars: any) => {
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
    default: {
      main: cssVars.card,
      background: cssVars.card,
      foreground: cssVars.cardForeground,
      hover: cssVars.backgroundHover,
      border: cssVars.border,
    },
  };

  return colorMap[color] || colorMap.default;
};

export const getVariantStyles = (
  color: CardColor,
  variant: CardVariant,
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
        borderColor: colors.border,
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
        backgroundColor: 'transparent',
        color: colors.main,
        borderColor: 'transparent',
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: colors.background,
        color: colors.foreground,
        borderColor: colors.border,
        boxShadow: cssVars.shadowSm,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: CardSize): React.CSSProperties => {
  const sizeMap = {
    xs: { minHeight: '40px', minWidth: '160px' },
    sm: { minHeight: '48px', minWidth: '200px' },
    md: { minHeight: '56px', minWidth: '240px' },
    lg: { minHeight: '64px', minWidth: '280px' },
    xl: { minHeight: '72px', minWidth: '320px' },
  };
  return sizeMap[size];
};

export const getPaddingStyles = (padding: CardPadding): React.CSSProperties => {
  const paddingMap = {
    none: { padding: '0px' },
    xs: { padding: '4px' },
    sm: { padding: '8px' },
    md: { padding: '16px' },
    lg: { padding: '24px' },
    xl: { padding: '32px' },
  };
  return paddingMap[padding];
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: CardShape): React.CSSProperties => {
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

export const createBaseStyles = (
  fullWidth: boolean,
  isDisabled: boolean,
  shape: CardShape,
  animationsEnabled: boolean,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.6 : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
    cursor: 'default',
    transition: animationsEnabled 
      ? 'background-color var(--duration-medium) var(--animation-spring), border-color var(--duration-medium) var(--animation-spring), transform var(--duration-medium) var(--animation-spring), box-shadow var(--duration-medium) var(--animation-spring)'
      : 'none',
    fontFamily: 'inherit',
    fontWeight: '500',
    outline: 'none',
    ...getShapeStyles(finalShape),
  };
};

export const createClickableStyles = (
  clickable: boolean,
  disabled: boolean
): React.CSSProperties => {
  if (!clickable || disabled) return {};
  
  return {
    cursor: 'pointer',
    userSelect: 'none',
    // Hover effects will be handled via JavaScript event handlers
  };
};

export const createHeaderStyles = (): React.CSSProperties => ({
  marginBottom: '12px',
  borderBottom: '1px solid',
  borderBottomColor: 'inherit',
  paddingBottom: '12px',
  fontWeight: '500',
});

export const createFooterStyles = (): React.CSSProperties => ({
  marginTop: 'auto',
  paddingTop: '12px',
  borderTop: '1px solid',
  borderTopColor: 'inherit',
  fontWeight: '500',
});

export const createContentStyles = (): React.CSSProperties => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
});

export const createLoadingOverlayStyles = (cssVars: any): React.CSSProperties => ({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: cssVars.getColorWithOpacity('background', 0.8),
  borderRadius: 'inherit',
  zIndex: 10,
});
