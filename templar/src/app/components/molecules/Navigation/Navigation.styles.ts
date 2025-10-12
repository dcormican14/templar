import React from 'react';
import type { NavigationProps } from './Navigation.types';

// Get color variables based on color prop
export const getColorVariables = (color: NavigationProps['color'], customColor: string | undefined, cssVars: any) => {
  if (color === 'custom' && customColor) {
    return {
      main: customColor,
      foreground: '#ffffff',
      background: customColor + '10',
      border: customColor,
      hover: customColor + '20',
      shadow: customColor + '40',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      shadow: cssVars.primaryShadow,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
      shadow: cssVars.secondaryShadow,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
      shadow: cssVars.successShadow,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
      shadow: cssVars.warningShadow,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
      shadow: cssVars.destructiveShadow,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
      shadow: cssVars.infoShadow,
    },
  };

  return colorMap[color || 'primary'] || colorMap.primary;
};

export const getVariantStyles = (
  variant: NavigationProps['variant'],
  color: NavigationProps['color'],
  customColor: string | undefined,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid' as const,
        boxShadow: `0 2px 4px ${colors.shadow || 'rgba(0, 0, 0, 0.1)'}`,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        boxShadow: 'none',
      };
    case 'outline':
      return {
        backgroundColor: cssVars.background,
        borderColor: colors.border,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid' as const,
        boxShadow: 'none',
      };
    case 'glassmorphic':
      const reflectionColor = colors.hover || colors.main || '#ffffff';
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;

      return {
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          ${cssVars.background}CC
        `,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: `${cssVars.border}80`,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid' as const,
        boxShadow: `0 8px 32px 0 ${colors.shadow || 'rgba(31, 38, 135, 0.37)'}`,
      };
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
  color: NavigationProps['color'],
  customColor: string | undefined,
  size: NavigationProps['size'],
  sticky: boolean,
  cssVars: any
): React.CSSProperties => {
  const variantStyles = getVariantStyles(variant, color, customColor, cssVars);
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
  color: NavigationProps['color'],
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const sizeStyles = getSizeStyles(size);
  const colors = getColorVariables(color, customColor, cssVars);

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: `8px 12px 0 12px`,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    fontSize: sizeStyles.fontSize,
    fontWeight: isActive ? '600' : '500',
    color: isActive ? colors.main : cssVars.mutedForeground,
    backgroundColor: isActive ? `${colors.background}80` : 'transparent',
    border: 'none',
    outline: 'none',
    overflow: 'hidden',
    height: '100%',
    borderRadius: '8px 8px 0 0',
    minWidth: '140px',
    maxWidth: '160px',
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

export const createTabHoverStyles = (
  color: NavigationProps['color'],
  customColor: string | undefined,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);

  return {
    backgroundColor: `${colors.hover || colors.background}40`,
    color: colors.main,
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
