import React from 'react';
import type { ButtonVariant, ButtonSize } from './Button.types';

export const getVariantStyles = (variant: ButtonVariant, cssVars: any) => {
  const baseStyles = {
    borderWidth: '0',
    borderStyle: 'solid' as const,
    borderColor: 'transparent',
  };

  switch (variant) {
    case 'primary':
      return {
        ...cssVars.surface.primary,
        ...baseStyles,
      };
    case 'secondary':
      return {
        backgroundColor: cssVars.secondary,
        color: cssVars.primary,
        ...baseStyles,
      };
    case 'destructive':
      return {
        backgroundColor: cssVars.error,
        color: cssVars.secondary,
        ...baseStyles,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: cssVars.primary,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: cssVars.primary,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: cssVars.primary,
        ...baseStyles,
      };
    default:
      return {
        ...cssVars.surface.primary,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
  const sizeMap = {
    xs: { padding: '4px 8px', fontSize: '12px', minWidth: '64px', height: '40px' },
    sm: { padding: '6px 12px', fontSize: '14px', minWidth: '80px', height: '40px' },
    md: { padding: '8px 16px', fontSize: '16px', minWidth: '96px', height: '48px' },
    lg: { padding: '10px 20px', fontSize: '18px', minWidth: '112px', height: '56px' },
    xl: { padding: '12px 24px', fontSize: '20px', minWidth: '128px', height: '64px' },
  };
  return sizeMap[size];
};

export const getIconSize = (buttonSize: ButtonSize): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  const iconSizeMap = {
    xs: 'xs' as const,
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'md' as const,
    xl: 'lg' as const,
  };
  return iconSizeMap[buttonSize];
};

export const createBaseStyles = (
  fullWidth: boolean,
  isDisabled: boolean,
  hasIcon: boolean,
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: fullWidth ? '100%' : 'auto',
  opacity: isDisabled ? 0.6 : 1,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: hasIcon ? 'space-between' : 'center',
  verticalAlign: 'top',
  borderRadius: rounded ? '24px' : '8px',
  fontWeight: '500',
  outline: 'none',
  position: 'relative',
  fontFamily: 'inherit',
});
