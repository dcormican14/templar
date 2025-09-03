import React from 'react';
import type { ProgressIndicatorColor, ProgressIndicatorVariant, ProgressIndicatorSize, ProgressIndicatorShape, ProgressIndicatorType } from './ProgressIndicator.types';

// Get color variables based on color prop
export const getColorVariables = (color: ProgressIndicatorColor, customColor: string | undefined, cssVars: any) => {
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

// Get shape styles based on shape prop
export const getShapeStyles = (shape: ProgressIndicatorShape): React.CSSProperties => {
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
export const getSizeConfig = (size: ProgressIndicatorSize) => {
  const configs = {
    xs: {
      height: '4px',
      spinnerSize: '16px',
      spinnerThickness: '2px',
      circularSize: '24px',
      circularThickness: '2px',
      fontSize: '10px',
      dotSize: '4px',
      dotSpacing: '2px',
    },
    sm: {
      height: '6px',
      spinnerSize: '20px',
      spinnerThickness: '2px',
      circularSize: '32px',
      circularThickness: '3px',
      fontSize: '11px',
      dotSize: '6px',
      dotSpacing: '3px',
    },
    md: {
      height: '8px',
      spinnerSize: '24px',
      spinnerThickness: '3px',
      circularSize: '40px',
      circularThickness: '4px',
      fontSize: '12px',
      dotSize: '8px',
      dotSpacing: '4px',
    },
    lg: {
      height: '12px',
      spinnerSize: '32px',
      spinnerThickness: '4px',
      circularSize: '48px',
      circularThickness: '5px',
      fontSize: '14px',
      dotSize: '10px',
      dotSpacing: '5px',
    },
    xl: {
      height: '16px',
      spinnerSize: '40px',
      spinnerThickness: '5px',
      circularSize: '56px',
      circularThickness: '6px',
      fontSize: '16px',
      dotSize: '12px',
      dotSpacing: '6px',
    },
  };

  return configs[size];
};

// Container styles
export const createProgressIndicatorContainerStyles = (
  shape: ProgressIndicatorShape,
  width: string | number | undefined,
  height: string | number | undefined,
  animationsEnabled: boolean
): React.CSSProperties => {
  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: width || 'auto',
    height: height || 'auto',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)'
      : 'none',
    ...getShapeStyles(shape),
  };
};

// Bar progress styles
export const getBarProgressStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  variant: ProgressIndicatorVariant,
  size: ProgressIndicatorSize,
  shape: ProgressIndicatorShape,
  width: string | number | undefined,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    width: width || '200px',
    height: sizeConfig.height,
    overflow: 'hidden',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    ...getShapeStyles(shape),
  };

  // Variant styles
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.background,
          border: `1px solid ${colors.border || cssVars.border}`,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.background}`,
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.muted,
          border: `1px solid ${cssVars.border}`,
        };
    }
  })();

  // Disabled styles
  if (disabled) {
    baseStyles.opacity = 0.6;
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// Progress fill styles
export const getProgressFillStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  variant: ProgressIndicatorVariant,
  size: ProgressIndicatorSize,
  shape: ProgressIndicatorShape,
  progress: number,
  striped: boolean,
  stripedAnimation: boolean,
  indeterminate: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    height: '100%',
    transition: animationsEnabled && !indeterminate 
      ? 'width var(--duration-smooth) var(--animation-smooth)' 
      : 'none',
    position: 'relative',
    ...getShapeStyles(shape),
  };

  // Variant styles
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.main,
        };
      case 'ghost':
        return {
          backgroundColor: colors.main,
        };
      case 'outline':
      default:
        return {
          backgroundColor: colors.main,
        };
    }
  })();

  // Width based on progress or indeterminate state
  if (indeterminate) {
    baseStyles.width = '30%';
    baseStyles.animation = animationsEnabled 
      ? 'progress-indeterminate 2s ease-in-out infinite' 
      : 'none';
  } else {
    baseStyles.width = `${Math.max(0, Math.min(100, progress))}%`;
  }

  // Striped pattern
  if (striped) {
    baseStyles.backgroundImage = `linear-gradient(45deg,
      rgba(255,255,255,.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255,255,255,.15) 50%,
      rgba(255,255,255,.15) 75%,
      transparent 75%,
      transparent)`;
    baseStyles.backgroundSize = '1rem 1rem';
    
    if (stripedAnimation && animationsEnabled) {
      baseStyles.animation = 'progress-stripes 1s linear infinite';
    }
  }

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

// Spinner styles
export const getSpinnerStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  size: ProgressIndicatorSize,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    width: sizeConfig.spinnerSize,
    height: sizeConfig.spinnerSize,
    border: `${sizeConfig.spinnerThickness} solid ${cssVars.muted}`,
    borderTopColor: colors.main,
    borderRadius: '50%',
    animation: animationsEnabled 
      ? 'progress-spinner 1s linear infinite' 
      : 'none',
  };

  if (disabled) {
    baseStyles.opacity = 0.6;
  }

  return baseStyles;
};

// Circular progress styles
export const getCircularProgressStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  size: ProgressIndicatorSize,
  progress: number,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    width: sizeConfig.circularSize,
    height: sizeConfig.circularSize,
    opacity: disabled ? 0.6 : 1,
  };
};

// Circular progress SVG styles
export const getCircularProgressSVGStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  size: ProgressIndicatorSize,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  
  return {
    svg: {
      width: '100%',
      height: '100%',
      transform: 'rotate(-90deg)',
    } as React.CSSProperties,
    track: {
      fill: 'none',
      stroke: cssVars.muted,
      strokeWidth: sizeConfig.circularThickness,
    } as React.CSSProperties,
    progress: {
      fill: 'none',
      stroke: colors.main,
      strokeWidth: sizeConfig.circularThickness,
      strokeLinecap: 'round' as const,
      transition: 'stroke-dashoffset var(--duration-smooth) var(--animation-smooth)',
    } as React.CSSProperties,
    circumference,
    radius,
  };
};

// Dots progress styles
export const getDotsProgressStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  size: ProgressIndicatorSize,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    display: 'flex',
    gap: sizeConfig.dotSpacing,
    alignItems: 'center',
    opacity: disabled ? 0.6 : 1,
  };
};

// Individual dot styles
export const getDotStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  size: ProgressIndicatorSize,
  index: number,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  return {
    width: sizeConfig.dotSize,
    height: sizeConfig.dotSize,
    borderRadius: '50%',
    backgroundColor: colors.main,
    animation: animationsEnabled 
      ? `progress-dots 1.4s ease-in-out infinite both ${index * 0.16}s` 
      : 'none',
  };
};

// Text/Label styles
export const getTextStyles = (
  size: ProgressIndicatorSize,
  color: ProgressIndicatorColor,
  variant: ProgressIndicatorVariant,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: variant === 'solid' ? cssVars.foreground : 'currentColor',
    textAlign: 'center',
    lineHeight: 1,
  };
};

// Progress text overlay styles (for bars)
export const getProgressTextStyles = (
  size: ProgressIndicatorSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: cssVars.foreground,
    textAlign: 'center',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 1,
  };
};

// Circular progress text styles
export const getCircularTextStyles = (
  size: ProgressIndicatorSize,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: cssVars.foreground,
    textAlign: 'center',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };
};