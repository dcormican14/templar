import React from 'react';
import type { BadgeVariant, BadgeSize } from './Badge.types';

export const getVariantStyles = (variant: BadgeVariant, cssVars: any): React.CSSProperties => {
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
    case 'success':
      return {
        backgroundColor: cssVars.success,
        color: cssVars.successForeground,
        ...baseStyles,
      };
    case 'warning':
      return {
        backgroundColor: cssVars.warning,
        color: cssVars.warningForeground,
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
        backgroundColor: cssVars.muted,
        color: cssVars.mutedForeground,
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
  rounded: boolean,
  isRemovable: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'top',
  borderRadius: rounded ? '50px' : '6px',
  fontWeight: '500',
  fontFamily: 'inherit',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
  cursor: isRemovable ? 'default' : 'auto',
  position: 'relative',
});
