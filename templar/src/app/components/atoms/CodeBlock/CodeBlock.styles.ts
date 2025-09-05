import React from 'react';
import type { CodeBlockColor, CodeBlockVariant, CodeBlockSize, CodeBlockShape } from './CodeBlock.types';

// Get color variables based on color prop
export const getColorVariables = (color: CodeBlockColor, customColor: string | undefined, cssVars: any) => {
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

  return colorMap[color] || colorMap.primary;
};

// Get shape styles based on shape prop and line numbers
export const getShapeStyles = (shape: CodeBlockShape, hasLineNumbers: boolean = false): React.CSSProperties => {
  const getRadius = () => {
    switch (shape) {
      case 'sharp':
        return '0';
      case 'round':
        return '12px';
      case 'pill':
        return '9999px';
      default:
        return '12px';
    }
  };
  
  const radius = getRadius();
  
  if (hasLineNumbers) {
    return { 
      borderRadius: `${radius}`
    };
  }
  
  return { borderRadius: radius };
};

// Get variant styles
export const getVariantStyles = (
  color: CodeBlockColor,
  customColor: string | undefined,
  variant: CodeBlockVariant,
  cssVars: any,
  hasLineNumbers: boolean = false
): React.CSSProperties => {
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
        borderColor: colors.main,
        ...baseStyles,
      };
    case 'ghost':
      return {
        backgroundColor: colors.background,
        color: colors.main,
        borderColor: 'transparent',
        ...baseStyles,
      };
    case 'outline':
    default:
      return {
        backgroundColor: colors.background || cssVars.backgroundAccent,
        color: cssVars.foreground,
        borderColor: colors.border || colors.main,
        ...baseStyles,
      };
  }
};

// Get size styles
export const getSizeStyles = (size: CodeBlockSize): React.CSSProperties => {
  const sizeMap = {
    xs: { 
      padding: '8px 12px', 
      fontSize: '11px', 
      lineHeight: 1.4,
    },
    sm: { 
      padding: '12px 16px', 
      fontSize: '12px', 
      lineHeight: 1.4,
    },
    md: { 
      padding: '16px 20px', 
      fontSize: '13px', 
      lineHeight: 1.5,
    },
    lg: { 
      padding: '20px 24px', 
      fontSize: '14px', 
      lineHeight: 1.5,
    },
    xl: { 
      padding: '24px 28px', 
      fontSize: '15px', 
      lineHeight: 1.6,
    },
  };
  return sizeMap[size];
};

// Create base styles
export const createBaseStyles = (
  shape: CodeBlockShape,
  maxHeight: string | undefined,
  animationsEnabled: boolean,
  hasLineNumbers: boolean = false,
  // Legacy support
  rounded?: boolean
): React.CSSProperties => {
  // Handle legacy rounded prop
  const finalShape = rounded !== undefined ? (rounded ? 'pill' : 'round') : shape;
  
  return {
    display: 'block',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
    overflowY: maxHeight ? 'auto' : 'visible',
    maxHeight: maxHeight || 'none',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth)'
      : 'none',
    position: 'relative',
    wordBreak: 'break-all',
    tabSize: 2,
    ...getShapeStyles(finalShape, hasLineNumbers),
  };
};

// Inline code styles
export const getInlineCodeStyles = (
  color: CodeBlockColor,
  customColor: string | undefined,
  variant: CodeBlockVariant,
  size: CodeBlockSize,
  shape: CodeBlockShape,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const shapeStyles = getShapeStyles(shape);
  
  // Inline code uses smaller border radius
  const inlineShapeStyles = {
    ...shapeStyles,
    borderRadius: shape === 'sharp' ? '0' : shape === 'pill' ? '4px' : '4px'
  };
  
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.main,
          color: colors.foreground,
          borderColor: colors.main,
        };
      case 'ghost':
        return {
          backgroundColor: colors.background,
          color: colors.main,
          borderColor: 'transparent',
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.backgroundAccent,
          color: cssVars.foreground,
          borderColor: colors.border || cssVars.border,
        };
    }
  })();
  
  const sizeStyles = (() => {
    switch (size) {
      case 'xs': return { padding: '1px 4px', fontSize: '10px' };
      case 'sm': return { padding: '2px 4px', fontSize: '11px' };
      case 'md': return { padding: '2px 6px', fontSize: '12px' };
      case 'lg': return { padding: '3px 6px', fontSize: '13px' };
      case 'xl': return { padding: '4px 8px', fontSize: '14px' };
      default: return { padding: '2px 6px', fontSize: '12px' };
    }
  })();

  return {
    display: 'inline-block',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    whiteSpace: 'nowrap',
    borderWidth: '1px',
    borderStyle: 'solid',
    verticalAlign: 'baseline',
    ...inlineShapeStyles,
    ...variantStyles,
    ...sizeStyles,
  };
};

// Copy button styles
export const getCopyButtonStyles = (
  size: CodeBlockSize,
  cssVars: any, 
  animationsEnabled: boolean
): React.CSSProperties => {
  const sizeConfig = (() => {
    switch (size) {
      case 'xs': return { padding: '4px 6px', fontSize: '10px', top: '4px', right: '4px' };
      case 'sm': return { padding: '4px 8px', fontSize: '11px', top: '6px', right: '6px' };
      case 'md': return { padding: '6px 8px', fontSize: '12px', top: '8px', right: '8px' };
      case 'lg': return { padding: '6px 10px', fontSize: '12px', top: '10px', right: '10px' };
      case 'xl': return { padding: '8px 12px', fontSize: '13px', top: '12px', right: '12px' };
      default: return { padding: '6px 8px', fontSize: '12px', top: '8px', right: '8px' };
    }
  })();

  return {
    position: 'absolute',
    top: sizeConfig.top,
    right: sizeConfig.right,
    backgroundColor: cssVars.background,
    color: cssVars.mutedForeground,
    border: `1px solid ${cssVars.border}`,
    borderRadius: '8px',
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    cursor: 'pointer',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth)'
      : 'none',
    fontFamily: 'inherit',
    zIndex: 2,
    // Note: Hover styles should be handled via event handlers in the component
  };
};

// Line number styles
export const getLineNumberStyles = (
  size: CodeBlockSize,
  cssVars: any,
  color: string,
  customColor: string | undefined,
  shape: string
): React.CSSProperties => {
  const sizeConfig = getSizeStyles(size);
  const colors = getColorVariables(color, customColor, cssVars);
  
  // Get border radius based on shape, but only apply to left corners
  const getBorderRadius = () => {
    switch (shape) {
      case 'sharp':
        return '0';
      case 'round':
        return '12px 0 0 12px'; // Only left corners rounded
      case 'pill':
        return '9999px 0 0 9999px'; // Only left corners rounded
      default:
        return '12px 0 0 12px'; // Only left corners rounded
    }
  };
  
  return {
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    width: '44px',
    backgroundColor: cssVars.backgroundAccent,
    borderRight: `1px solid ${colors.border || colors.main}`,
    borderTop: `1px solid ${colors.border || colors.main}`,
    borderBottom: `1px solid ${colors.border || colors.main}`,
    borderLeft: `1px solid ${colors.border || colors.main}`,
    borderRadius: getBorderRadius(),
    padding: (typeof sizeConfig.padding === 'string' ? sizeConfig.padding.split(' ')[0] : '12px') + ' 8px',
    paddingTop: '24px', // Account for language label
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    color: colors.main, // Same color as title/language label
    userSelect: 'none',
    textAlign: 'right',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    zIndex: 1,
  };
};

// Code content styles (when line numbers are shown)
export const getCodeContentStyles = (
  hasLineNumbers: boolean,
  size: CodeBlockSize
): React.CSSProperties => {
  if (!hasLineNumbers) return {};
  
  return {
    paddingLeft: '56px', // 44px + 12px margin
  };
};

// Highlight line styles
export const getHighlightLineStyles = (
  lineNumber: number,
  highlightedLines: number | number[],
  cssVars: any
): React.CSSProperties => {
  const isHighlighted = Array.isArray(highlightedLines) 
    ? highlightedLines.includes(lineNumber)
    : lineNumber === highlightedLines;

  if (!isHighlighted) return {};

  return {
    backgroundColor: cssVars.primary + '20',
    borderLeft: `3px solid ${cssVars.primary}`,
    paddingLeft: '8px',
    marginLeft: '-8px',
  };
};