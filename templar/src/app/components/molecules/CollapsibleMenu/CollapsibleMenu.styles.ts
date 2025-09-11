import React from 'react';
import type { CollapsibleMenuSize, CollapsibleMenuColor, CollapsibleMenuShape, CollapsibleMenuPosition } from './CollapsibleMenu.types';

// Get size-specific configurations
export const getSizeConfig = (size: CollapsibleMenuSize) => {
  const configs = {
    xs: {
      toggleSize: '32px',
      toggleIconSize: '12px',
      padding: '8px',
      fontSize: '12px',
    },
    sm: {
      toggleSize: '36px',
      toggleIconSize: '14px',
      padding: '12px',
      fontSize: '14px',
    },
    md: {
      toggleSize: '40px',
      toggleIconSize: '16px',
      padding: '16px',
      fontSize: '16px',
    },
    lg: {
      toggleSize: '44px',
      toggleIconSize: '18px',
      padding: '20px',
      fontSize: '18px',
    },
    xl: {
      toggleSize: '48px',
      toggleIconSize: '20px',
      padding: '24px',
      fontSize: '20px',
    },
  };

  return configs[size];
};

// Get color variables based on color prop
export const getColorVariables = (color: CollapsibleMenuColor, customColor: string | undefined, cssVars: any) => {
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
      background: cssVars.primaryBackground || cssVars.primary + '10',
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover || cssVars.primary + '20',
      border: cssVars.primaryBorder || cssVars.primary,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground || cssVars.secondary + '10',
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover || cssVars.secondary + '20',
      border: cssVars.secondaryBorder || cssVars.secondary,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground || cssVars.success + '10',
      foreground: cssVars.successForeground,
      hover: cssVars.successHover || cssVars.success + '20',
      border: cssVars.successBorder || cssVars.success,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground || cssVars.warning + '10',
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover || cssVars.warning + '20',
      border: cssVars.warningBorder || cssVars.warning,
    },
    destructive: {
      main: cssVars.error,
      background: cssVars.errorBackground || cssVars.error + '10',
      foreground: cssVars.errorForeground || '#ffffff',
      hover: cssVars.errorHover || cssVars.error + '20',
      border: cssVars.errorBorder || cssVars.error,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground || cssVars.info + '10',
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover || cssVars.info + '20',
      border: cssVars.infoBorder || cssVars.info,
    },
  };

  return colorMap[color] || colorMap.primary;
};

// Get shape styles based on shape prop
export const getShapeStyles = (shape: CollapsibleMenuShape): React.CSSProperties => {
  switch (shape) {
    case 'sharp':
      return { borderRadius: '0' };
    case 'round':
      return { borderRadius: '12px' };
    case 'pill':
      return { borderRadius: '24px' };
    default:
      return { borderRadius: '8px' };
  }
};

// Main menu container styles
export const getCollapsibleMenuContainerStyles = (
  position: CollapsibleMenuPosition,
  collapsed: boolean,
  expandedWidth: string | number,
  collapsedWidth: string | number,
  overlay: boolean,
  zIndex: number,
  animationDuration: number,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const width = collapsed 
    ? (typeof collapsedWidth === 'number' ? `${collapsedWidth}px` : collapsedWidth)
    : (typeof expandedWidth === 'number' ? `${expandedWidth}px` : expandedWidth);

  const baseStyles: React.CSSProperties = {
    position: overlay ? 'fixed' : 'relative',
    top: overlay ? '0' : 'auto',
    [position]: overlay ? '0' : 'auto',
    width,
    height: overlay ? '100vh' : '100%',
    backgroundColor: cssVars.background,
    borderRight: position === 'left' ? `1px solid ${cssVars.border}` : 'none',
    borderLeft: position === 'right' ? `1px solid ${cssVars.border}` : 'none',
    transition: `width ${animationDuration}ms var(--animation-spring), transform ${animationDuration}ms var(--animation-spring)`,
    zIndex,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible', // Changed from 'hidden' to 'visible' to prevent toggle button cutoff
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };

  // Add shadow for overlay mode
  if (overlay) {
    baseStyles.boxShadow = position === 'left' 
      ? '2px 0 8px rgba(0, 0, 0, 0.1)' 
      : '-2px 0 8px rgba(0, 0, 0, 0.1)';
  }

  return baseStyles;
};

// Content area styles
export const getContentStyles = (
  size: CollapsibleMenuSize,
  collapsed: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    flex: 1,
    padding: collapsed ? `${sizeConfig.padding} 8px` : sizeConfig.padding,
    // Removed overflow properties - let the Scrollbar component handle scrolling
    transition: 'padding 200ms var(--animation-spring)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };
};

// Toggle tag styles
export const getToggleStyles = (
  position: CollapsibleMenuPosition,
  size: CollapsibleMenuSize,
  color: CollapsibleMenuColor,
  customColor: string | undefined,
  shape: CollapsibleMenuShape,
  collapsed: boolean,
  disabled: boolean,
  animationDuration: number,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  const colors = getColorVariables(color, customColor, cssVars);
  const shapeStyles = getShapeStyles(shape);
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: '16px',
    [position === 'left' ? 'right' : 'left']: '-20px',
    width: sizeConfig.toggleSize,
    height: sizeConfig.toggleSize,
    backgroundColor: colors.main,
    color: colors.foreground,
    border: `1px solid ${colors.border}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${animationDuration}ms var(--animation-spring)`,
    zIndex: 2,
    ...shapeStyles,
  };

  // Hover styles (applied via CSS-in-JS for pseudo-states)
  if (!disabled) {
    baseStyles.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  }

  return baseStyles;
};

// Toggle icon styles
export const getToggleIconStyles = (
  position: CollapsibleMenuPosition,
  collapsed: boolean,
  animationDuration: number
): React.CSSProperties => {
  const rotation = (() => {
    if (position === 'left') {
      return collapsed ? '180deg' : '0deg';
    } else {
      return collapsed ? '0deg' : '180deg';
    }
  })();

  return {
    transform: `rotate(${rotation})`,
    transition: `transform ${animationDuration}ms var(--animation-spring)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};