import React from 'react';
import type { CardColor, CardVariant, CardSize, CardShape } from './Card.types';
import type { UniversalSize } from '../types';

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

  return colorMap[color] || {
    main: cssVars.card,
    background: cssVars.card,
    foreground: cssVars.cardForeground,
    hover: cssVars.backgroundHover,
    border: cssVars.border,
  };
};

export const getVariantStyles = (
  color: CardColor,
  variant: CardVariant,
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
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border,
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
        backgroundColor: 'transparent',
        color: colors.main,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        ...baseStyles,
      };
    case 'glassmorphic':
      // Helper function to convert hex to rgba
      const hexToRgba = (hex: string, alpha: number): string => {
        if (!hex || !hex.startsWith('#')) return `rgba(0, 0, 0, ${alpha})`;
        const cleanHex = hex.slice(1);
        const r = parseInt(cleanHex.substr(0, 2), 16);
        const g = parseInt(cleanHex.substr(2, 2), 16);
        const b = parseInt(cleanHex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      // Use theme background color with opacity for darker translucent effect
      const backgroundWithOpacity = hexToRgba(cssVars.background, 0.85);
      const borderWithOpacity = hexToRgba(cssVars.border, 0.5);

      return {
        backgroundColor: backgroundWithOpacity,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari support
        color: colors.main,
        borderTopColor: borderWithOpacity,
        borderRightColor: borderWithOpacity,
        borderBottomColor: borderWithOpacity,
        borderLeftColor: borderWithOpacity,
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3)`,
        position: 'relative',
        overflow: 'hidden',
        transform: 'translateZ(0)', // Force GPU acceleration
        willChange: 'auto', // Let browser optimize
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: colors.background,
        color: colors.foreground,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border,
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

export const getPaddingStyles = (padding: UniversalSize | 'none'): React.CSSProperties => {
  const paddingMap = {
    none: { 
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px'
    },
    xs: { 
      paddingTop: '4px',
      paddingRight: '4px',
      paddingBottom: '4px',
      paddingLeft: '4px'
    },
    sm: { 
      paddingTop: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      paddingLeft: '8px'
    },
    md: { 
      paddingTop: '16px',
      paddingRight: '16px',
      paddingBottom: '16px',
      paddingLeft: '16px'
    },
    lg: { 
      paddingTop: '24px',
      paddingRight: '24px',
      paddingBottom: '24px',
      paddingLeft: '24px'
    },
    xl: { 
      paddingTop: '32px',
      paddingRight: '32px',
      paddingBottom: '32px',
      paddingLeft: '32px'
    },
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

// Get isometric animation styles for Card
export const getIsometricStyles = (color: any, variant: CardVariant, shape: CardShape) => {
  // Ghost and glassmorphic variants don't support isometric animation
  if (variant === 'ghost' || variant === 'glassmorphic') {
    return {};
  }
  
  // For outline variant, use the main color (primary). For solid, use foreground color.
  const borderColor = variant === 'outline' ? color.main : color.foreground || '#000000';
  
  const styles: any = {
    // Use individual border properties to avoid conflict with shorthand
    borderTopWidth: '1px',
    borderLeftWidth: '1px', 
    borderRightWidth: '1px',
    borderBottomWidth: '6px', // Larger bottom border for 3D effect (bigger than Badge since Cards are larger)
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: 'translateY(0)',
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Ensure proper box-sizing and prevent collapse
    boxSizing: 'border-box',
    position: 'relative',
    // Adjust padding to account for larger bottom border
    paddingBottom: '13px', // Reduce bottom padding to compensate for thicker border
  };
  
  return styles;
};
