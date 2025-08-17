import React from 'react';
import type { NavigationProps } from './Navigation.types';

export const getVariantStyles = (variant: NavigationProps['variant'], cssVars: any) => {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: cssVars.card,
        borderColor: 'transparent',
        boxShadow: cssVars.shadows.md,
      };
    case 'bordered':
      return {
        backgroundColor: cssVars.background,
        borderColor: cssVars.border,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid' as const,
        boxShadow: 'none',
      };
    case 'minimal':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        boxShadow: 'none',
      };
    case 'default':
    default:
      return {
        backgroundColor: cssVars.card,
        borderColor: cssVars.border,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid' as const,
        boxShadow: cssVars.shadows.sm,
      };
  }
};

export const getSizeStyles = (size: NavigationProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        height: '40px', // Reduced from 48px
        padding: '0 12px',
        fontSize: '14px',
        gap: '12px',
      };
    case 'lg':
      return {
        height: '60px', // Reduced from 72px
        padding: '0 24px',
        fontSize: '16px',
        gap: '24px',
      };
    case 'md':
    default:
      return {
        height: '48px', // Reduced from 60px
        padding: '0 16px',
        fontSize: '15px',
        gap: '16px',
      };
  }
};

export const createNavigationStyles = (
  variant: NavigationProps['variant'],
  size: NavigationProps['size'],
  sticky: boolean,
  cssVars: any
): React.CSSProperties => {
  const variantStyles = getVariantStyles(variant, cssVars);
  const sizeStyles = getSizeStyles(size);

  return {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : 'auto',
    zIndex: sticky ? 100 : 'auto',
    display: 'flex',
    alignItems: 'stretch', // Changed from 'end' to 'stretch' to fill full height
    width: '100%',
    transition: 'all 0.2s ease-in-out',
    ...variantStyles,
    ...sizeStyles,
  };
};

export const createBrandStyles = (size: NavigationProps['size'], cssVars: any) => {
  const sizeStyles = getSizeStyles('lg'); // Use large size for brand
  
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '8px 12px',
    textDecoration: 'none',
    color: cssVars.primary,
    fontSize: sizeStyles.fontSize,
    fontWeight: '600',
    height: '100%',
    minHeight: sizeStyles.height,
  } as React.CSSProperties;
};

export const createTabStyles = (
  isActive: boolean,
  size: NavigationProps['size'],
  cssVars: any
): React.CSSProperties => {
  const sizeStyles = getSizeStyles(size);
  
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: `8px 12px 0 12px`, // Reduced horizontal padding since we'll have fixed width text
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    fontSize: sizeStyles.fontSize,
    fontWeight: isActive ? '600' : '500',
    color: isActive ? cssVars.primary : cssVars.mutedForeground,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    overflow: 'hidden',
    height: '100%',
    borderRadius: '8px 8px 0 0',
    minWidth: '140px', // Fixed minimum width for each tab
    maxWidth: '160px', // Maximum width to prevent extremely wide tabs
    boxSizing: 'border-box',
  };

  return baseStyles;
};

export const createTabUnderlineStyles = (
  isActive: boolean,
  cssVars: any
): React.CSSProperties => {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '2px',
    width: isActive ? '100%' : '0%',
    backgroundColor: cssVars.primary,
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '1px 1px 0 0',
  };
};

export const createTabHoverStyles = (cssVars: any) => {
  return {
    backgroundColor: cssVars.getColorWithOpacity('muted', 0.8),
    color: cssVars.foreground,
  } as React.CSSProperties;
};

export const createContentAreaStyles = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center', // Center align for leading/trailing content
    gap: '8px',
    height: '100%',
  };
};

export const createTabsContainerStyles = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'flex-end', // Bottom align for tabs specifically
    height: 'calc(100% - 8px)', // Reduce height by 4px to create top gap
    marginTop: '8px', // Add 4px margin at the top
    gap: '0',
  };
};

export const createContainerStyles = (
  fullWidth: boolean,
  maxWidth?: string
): React.CSSProperties => {
  return {
    width: '100%',
    maxWidth: fullWidth ? '100%' : maxWidth || '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'stretch', // Changed from 'center' to 'stretch' to fill full height
    height: '100%', // Ensure container takes full height
  };
};
