import React from 'react';
import type { TextAreaColor, TextAreaVariant, TextAreaSize, TextAreaShape, TextAreaResize } from './TextArea.types';

// Get color variables based on color prop
export const getColorVariables = (color: TextAreaColor, customColor: string | undefined, cssVars: any) => {
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
export const getShapeStyles = (shape: TextAreaShape): React.CSSProperties => {
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

// Get size configuration
export const getSizeConfig = (size: TextAreaSize) => {
  const configs = {
    xs: {
      padding: '8px 10px',
      fontSize: '12px',
      lineHeight: 1.4,
      minHeight: '64px',
      iconSize: '14px',
    },
    sm: {
      padding: '10px 12px',
      fontSize: '14px',
      lineHeight: 1.4,
      minHeight: '72px',
      iconSize: '16px',
    },
    md: {
      padding: '12px 14px',
      fontSize: '16px',
      lineHeight: 1.5,
      minHeight: '80px',
      iconSize: '18px',
    },
    lg: {
      padding: '14px 16px',
      fontSize: '18px',
      lineHeight: 1.5,
      minHeight: '96px',
      iconSize: '20px',
    },
    xl: {
      padding: '16px 18px',
      fontSize: '20px',
      lineHeight: 1.5,
      minHeight: '112px',
      iconSize: '22px',
    },
  };

  return configs[size];
};

// Container styles
export const getTextAreaContainerStyles = (
  width: string | number | undefined,
  height: string | number | undefined,
  disabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: width || '100%',
    fontFamily: 'inherit',
  };

  if (height) {
    baseStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (disabled) {
    baseStyles.opacity = 0.6;
  }

  return baseStyles;
};

// TextArea input styles
export const getTextAreaInputStyles = (
  color: TextAreaColor,
  customColor: string | undefined,
  variant: TextAreaVariant,
  shape: TextAreaShape,
  size: TextAreaSize,
  resize: TextAreaResize,
  disabled: boolean,
  error: boolean,
  focused: boolean,
  minRows: number,
  maxRows: number | undefined,
  autoResize: boolean,
  showLineNumbers: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const shapeStyles = getShapeStyles(shape);

  // Base styles
  const baseStyles: React.CSSProperties = {
    width: '100%',
    border: '1px solid',
    outline: 'none',
    fontFamily: 'inherit',
    resize: resize === 'none' ? 'none' : resize,
    transition: animationsEnabled
      ? 'border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), box-shadow var(--duration-fast) var(--animation-smooth)'
      : 'none',
    ...sizeConfig,
    ...shapeStyles,
  };

  // Auto-resize calculations
  if (autoResize) {
    baseStyles.resize = 'none';
    baseStyles.overflow = 'hidden';
    if (maxRows) {
      const lineHeight = parseFloat(sizeConfig.lineHeight.toString());
      const maxHeight = maxRows * lineHeight + 32; // Add padding
      baseStyles.maxHeight = `${maxHeight}px`;
    }
  } else {
    const lineHeight = parseFloat(sizeConfig.lineHeight.toString());
    const minHeight = Math.max(
      minRows * lineHeight * parseFloat(sizeConfig.fontSize) + 32,
      parseFloat(sizeConfig.minHeight.replace('px', ''))
    );
    baseStyles.minHeight = `${minHeight}px`;
  }

  // Line numbers adjustment
  if (showLineNumbers) {
    baseStyles.paddingLeft = '40px';
  }

  // Variant-specific styles with error state override
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.error,
        backgroundColor: cssVars.background,
        color: cssVars.foreground,
        '&::placeholder': {
          color: cssVars.mutedForeground,
        },
      };
    }

    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.main,
          borderColor: colors.main,
          color: colors.foreground,
          '&::placeholder': {
            color: colors.foreground,
            opacity: 0.7,
          },
        };
      case 'ghost':
        return {
          backgroundColor: colors.background,
          borderColor: 'transparent',
          color: colors.main,
          '&::placeholder': {
            color: cssVars.mutedForeground,
          },
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.background,
          borderColor: colors.border || cssVars.border,
          color: cssVars.foreground,
          '&::placeholder': {
            color: cssVars.mutedForeground,
          },
        };
    }
  })();

  // Focus styles
  const focusStyles: React.CSSProperties = {};
  if (focused) {
    const focusColor = error ? cssVars.error : colors.main;
    focusStyles.borderColor = focusColor;
    focusStyles.boxShadow = `0 0 0 1px ${focusColor}`;
  }

  // Disabled styles
  if (disabled) {
    baseStyles.cursor = 'not-allowed';
    baseStyles.backgroundColor = cssVars.muted;
    baseStyles.color = cssVars.mutedForeground;
  }

  return {
    ...baseStyles,
    ...variantStyles,
    ...focusStyles,
  };
};

// Label styles
export const getLabelStyles = (
  size: TextAreaSize,
  disabled: boolean,
  error: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.error : cssVars.foreground),
    marginBottom: '6px',
    userSelect: 'none',
    display: 'block',
  };
};

// Description styles
export const getDescriptionStyles = (
  size: TextAreaSize,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };
  
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    marginBottom: '6px',
    lineHeight: 1.4,
  };
};

// Helper text styles
export const getHelperTextStyles = (
  size: TextAreaSize,
  disabled: boolean,
  error: boolean,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };
  
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : (error ? cssVars.error : cssVars.mutedForeground),
    marginTop: '6px',
    lineHeight: 1.4,
  };
};

// Character count styles
export const getCharacterCountStyles = (
  size: TextAreaSize,
  disabled: boolean,
  isOverLimit: boolean,
  cssVars: any
): React.CSSProperties => {
  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  };
  
  return {
    fontSize: fontSizeMap[size],
    color: disabled 
      ? cssVars.mutedForeground 
      : isOverLimit 
        ? cssVars.error 
        : cssVars.mutedForeground,
    marginTop: '4px',
    textAlign: 'right',
    userSelect: 'none',
  };
};

// Icon styles
export const getIconStyles = (
  size: TextAreaSize,
  iconPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  clickable: boolean,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    fontSize: sizeConfig.iconSize,
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    cursor: clickable && !disabled ? 'pointer' : 'default',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Position the icon
  const offset = '12px';
  switch (iconPosition) {
    case 'top-left':
      baseStyles.top = offset;
      baseStyles.left = offset;
      break;
    case 'top-right':
      baseStyles.top = offset;
      baseStyles.right = offset;
      break;
    case 'bottom-left':
      baseStyles.bottom = offset;
      baseStyles.left = offset;
      break;
    case 'bottom-right':
      baseStyles.bottom = offset;
      baseStyles.right = offset;
      break;
  }

  if (clickable && !disabled) {
    baseStyles.transition = 'color var(--duration-fast) var(--animation-smooth)';
  }

  return baseStyles;
};

// Line numbers styles
export const getLineNumbersStyles = (
  size: TextAreaSize,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '32px',
    height: '100%',
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    backgroundColor: cssVars.muted,
    borderRight: `1px solid ${cssVars.border}`,
    padding: sizeConfig.padding.split(' ')[0] + ' 4px',
    fontFamily: 'monospace',
    textAlign: 'right',
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'pre',
    overflow: 'hidden',
  };
};

// Loading overlay styles
export const getLoadingOverlayStyles = (cssVars: any): React.CSSProperties => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: cssVars.background + '80',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
});

// Input wrapper styles (for relative positioning)
export const getInputWrapperStyles = (): React.CSSProperties => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

// Bottom section styles (for helper text and character count)
export const getBottomSectionStyles = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px',
  marginTop: '6px',
});

// Resize handle styles (custom resize handle)
export const getResizeHandleStyles = (
  resize: TextAreaResize,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  if (resize === 'none' || disabled) {
    return { display: 'none' };
  }

  return {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '16px',
    height: '16px',
    backgroundColor: cssVars.mutedForeground,
    opacity: 0.3,
    cursor: resize === 'both' ? 'nw-resize' : resize === 'horizontal' ? 'ew-resize' : 'ns-resize',
    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
    pointerEvents: 'none',
  };
};