import React from 'react';
import type { CardVariant, CardSize, CardPadding } from './Card.types';

export const getVariantStyles = (variant: CardVariant, cssVars: any) => {
  const baseStyles = {
    borderStyle: 'solid' as const,
    transition: 'all 0.2s ease-in-out',
  };

  switch (variant) {
    case 'default':
      return {
        backgroundColor: cssVars.card,
        color: cssVars.cardForeground,
        borderWidth: '1px',
        borderColor: cssVars.border,
        boxShadow: cssVars.shadows.sm,
        ...baseStyles,
      };
    case 'elevated':
      return {
        backgroundColor: cssVars.card,
        color: cssVars.cardForeground,
        borderWidth: '0px',
        borderColor: 'transparent',
        boxShadow: cssVars.shadows.md,
        ...baseStyles,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        color: cssVars.foreground,
        borderWidth: '2px',
        borderColor: cssVars.border,
        boxShadow: 'none',
        ...baseStyles,
      };
    case 'filled':
      return {
        backgroundColor: cssVars.muted,
        color: cssVars.mutedForeground,
        borderWidth: '0px',
        borderColor: 'transparent',
        boxShadow: 'none',
        ...baseStyles,
      };
    case 'transparent':
      return {
        backgroundColor: 'transparent',
        color: cssVars.foreground,
        borderWidth: '0px',
        borderColor: 'transparent',
        boxShadow: 'none',
        ...baseStyles,
      };
    default:
      return {
        backgroundColor: cssVars.card,
        color: cssVars.cardForeground,
        borderWidth: '1px',
        borderColor: cssVars.border,
        boxShadow: cssVars.shadows.sm,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: CardSize): React.CSSProperties => {
  switch (size) {
    case 'xs':
      return {
        borderRadius: '4px',
        minHeight: '60px',
      };
    case 'sm':
      return {
        borderRadius: '6px',
        minHeight: '80px',
      };
    case 'md':
      return {
        borderRadius: '8px',
        minHeight: '100px',
      };
    case 'lg':
      return {
        borderRadius: '12px',
        minHeight: '120px',
      };
    case 'xl':
      return {
        borderRadius: '16px',
        minHeight: '140px',
      };
    default:
      return {
        borderRadius: '8px',
        minHeight: '100px',
      };
  }
};

export const getPaddingStyles = (padding: CardPadding): React.CSSProperties => {
  switch (padding) {
    case 'none':
      return { padding: '0' };
    case 'xs':
      return { padding: '8px' };
    case 'sm':
      return { padding: '12px' };
    case 'md':
      return { padding: '16px' };
    case 'lg':
      return { padding: '24px' };
    case 'xl':
      return { padding: '32px' };
    default:
      return { padding: '16px' };
  }
};

export const createBaseStyles = (
  fullWidth: boolean,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: fullWidth ? '100%' : 'auto',
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
  cursor: 'default',
});

export const createClickableStyles = (
  clickable: boolean,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  if (!clickable || disabled) return {};
  
  return {
    cursor: 'pointer',
    // Hover effects will be handled via JavaScript event handlers
  };
};

export const createHeaderStyles = (): React.CSSProperties => ({
  marginBottom: '12px',
  borderBottom: '1px solid',
  borderBottomColor: 'inherit',
  paddingBottom: '12px',
  opacity: 0.9,
});

export const createFooterStyles = (): React.CSSProperties => ({
  marginTop: 'auto',
  paddingTop: '12px',
  borderTop: '1px solid',
  borderTopColor: 'inherit',
  opacity: 0.9,
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
