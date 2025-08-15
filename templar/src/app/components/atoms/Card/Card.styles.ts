import React from 'react';
import type { CardVariant, CardSize, CardPadding } from './Card.types';

export const getVariantStyles = (variant: CardVariant, cssVars: any) => {
  const baseStyles = {
    borderWidth: '0',
    borderStyle: 'solid' as const,
    borderColor: 'transparent',
  };

  switch (variant) {
    case 'primary':
      return {
        backgroundColor: cssVars.primary,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
    case 'secondary':
      return {
        backgroundColor: cssVars.secondary,
        color: cssVars.secondaryForeground,
        ...baseStyles,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: cssVars.foreground,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: cssVars.border,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: cssVars.foreground,
        ...baseStyles,
      };
    case 'default':
      return {
        backgroundColor: cssVars.card,
        color: cssVars.cardForeground,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: cssVars.border,
        boxShadow: cssVars.shadows.sm,
      };
    default:
      return {
        backgroundColor: cssVars.card,
        color: cssVars.cardForeground,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: cssVars.border,
        boxShadow: cssVars.shadows.sm,
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

export const createBaseStyles = (
  fullWidth: boolean,
  isDisabled: boolean,
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: fullWidth ? '100%' : 'auto',
  opacity: isDisabled ? 0.6 : 1,
  pointerEvents: isDisabled ? 'none' : 'auto',
  cursor: 'default',
  borderRadius: rounded ? '24px' : '8px',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  fontFamily: 'inherit',
  fontWeight: '500',
  outline: 'none',
});

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
