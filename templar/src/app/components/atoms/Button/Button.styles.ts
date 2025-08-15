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
    case 'destructive':
      return {
        backgroundColor: cssVars.error,
        color: cssVars.errorForeground,
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
        backgroundColor: cssVars.primary,
        color: cssVars.primaryForeground,
        ...baseStyles,
      };
  }
};

export const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
  const sizeMap = {
    xs: { padding: '4px 8px', fontSize: '14px', minWidth: '82px', height: '40px' },
    sm: { padding: '6px 12px', fontSize: '16px', minWidth: '82px', height: '40px' },
    md: { padding: '8px 16px', fontSize: '18px', minWidth: '112px', height: '48px' },
    lg: { padding: '10px 20px', fontSize: '20px', minWidth: '112px', height: '52px' },
    xl: { padding: '12px 24px', fontSize: '22px', minWidth: '142px', height: '60px' },
  };
  return sizeMap[size];
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
  rounded: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: fullWidth ? '100%' : 'auto',
  opacity: isDisabled ? 0.6 : 1,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  pointerEvents: isDisabled ? 'none' : 'auto',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'top',
  borderRadius: rounded ? '24px' : '8px',
  fontWeight: '500',
  outline: 'none',
  position: 'relative',
  fontFamily: 'inherit',
  userSelect: 'none',
});
