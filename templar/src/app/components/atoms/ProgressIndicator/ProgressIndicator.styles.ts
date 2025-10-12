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
      accent: cssVars.primaryAccent,
      border: cssVars.primaryBorder,
      shadow: cssVars.primaryShadow,
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      border: cssVars.secondaryBorder,
      shadow: cssVars.secondaryShadow,
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      border: cssVars.successBorder,
      shadow: cssVars.successShadow,
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      border: cssVars.warningBorder,
      shadow: cssVars.warningShadow,
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      border: cssVars.destructiveBorder,
      shadow: cssVars.destructiveShadow,
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      border: cssVars.infoBorder,
      shadow: cssVars.infoShadow,
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
    },
    sm: {
      height: '6px',
      spinnerSize: '20px',
      spinnerThickness: '2px',
      circularSize: '32px',
      circularThickness: '3px',
      fontSize: '11px',
    },
    md: {
      height: '8px',
      spinnerSize: '24px',
      spinnerThickness: '3px',
      circularSize: '40px',
      circularThickness: '4px',
      fontSize: '12px',
    },
    lg: {
      height: '12px',
      spinnerSize: '32px',
      spinnerThickness: '4px',
      circularSize: '48px',
      circularThickness: '5px',
      fontSize: '14px',
    },
    xl: {
      height: '16px',
      spinnerSize: '40px',
      spinnerThickness: '5px',
      circularSize: '56px',
      circularThickness: '6px',
      fontSize: '16px',
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
): any => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    width: width || '200px',
    height: sizeConfig.height,
    overflow: 'visible', // Allow text to overflow outside the bar
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
          border: 'none',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          border: `1px solid transparent`,
        };
      case 'glassmorphic':
        const reflectionColor = colors.hover || colors.main || '#ffffff';
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;

        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            ${colors.background}
          `,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${colors.border || cssVars.border}`,
          boxShadow: `0 8px 32px 0 ${colors.shadow || 'rgba(31, 38, 135, 0.37)'}`,
          position: 'relative',
          overflow: 'visible', // Allow text to overflow even for glassmorphic
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
          backgroundColor: colors.accent || colors.main,
        };
      case 'ghost':
        return {
          backgroundColor: colors.main,
        };
      case 'glassmorphic':
        const reflectionColor = colors.hover || colors.main || '#ffffff';
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}30 20%, ${reflectionColor}25 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}35 55%, ${reflectionColor}30 65%, transparent 80%)`;

        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            ${colors.accent || colors.main}
          `,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
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
    baseStyles.width = '30%'; // Fixed width bar that will slide within track
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
  variant: ProgressIndicatorVariant,
  size: ProgressIndicatorSize,
  progress: number,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    width: sizeConfig.circularSize,
    height: sizeConfig.circularSize,
    opacity: disabled ? 0.6 : 1,
  };

  // Add glassmorphic container effects if needed
  if (variant === 'glassmorphic') {
    const reflectionColor = colors.hover || colors.main || '#ffffff';
    const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
    const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;

    return {
      ...baseStyles,
      background: `
        ${topReflectionGradient},
        ${bottomReflectionGradient},
        ${colors.background}
      `,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '50%',
      border: `1px solid ${colors.border || cssVars.border}`,
      boxShadow: `0 8px 32px 0 ${colors.shadow || 'rgba(31, 38, 135, 0.37)'}`,
      position: 'relative',
      overflow: 'hidden',
    };
  }

  return baseStyles;
};

// Circular progress SVG styles
export const getCircularProgressSVGStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  variant: ProgressIndicatorVariant,
  size: ProgressIndicatorSize,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  // Get variant-specific track and progress styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return {
          track: {
            stroke: colors.background,
          },
          progress: {
            stroke: colors.accent || colors.main,
          }
        };
      case 'ghost':
        return {
          track: {
            stroke: 'transparent',
          },
          progress: {
            stroke: colors.main,
          }
        };
      case 'glassmorphic':
        // For glassmorphic, match the bar variant styling approach
        const reflectionColor = colors.hover || colors.main || '#ffffff';
        return {
          track: {
            stroke: colors.background,
            strokeOpacity: 1,
          },
          progress: {
            stroke: `url(#glassmorphic-gradient-${color})`,
          },
          gradientDefs: {
            gradientId: `glassmorphic-gradient-${color}`,
            stops: [
              { offset: '0%', stopColor: colors.accent || colors.main, stopOpacity: 1 },
              { offset: '50%', stopColor: reflectionColor, stopOpacity: 0.8 },
              { offset: '100%', stopColor: colors.accent || colors.main, stopOpacity: 1 }
            ]
          }
        };
      case 'outline':
      default:
        return {
          track: {
            stroke: cssVars.muted,
          },
          progress: {
            stroke: colors.main,
          }
        };
    }
  };

  const variantStyles = getVariantStyles();

  return {
    svg: {
      width: '100%',
      height: '100%',
      transform: 'rotate(-90deg)',
    } as React.CSSProperties,
    track: {
      fill: 'none',
      strokeWidth: sizeConfig.circularThickness,
      ...variantStyles.track,
    } as React.CSSProperties,
    progress: {
      fill: 'none',
      strokeWidth: sizeConfig.circularThickness,
      strokeLinecap: 'round' as const,
      transition: 'stroke-dashoffset var(--duration-smooth) var(--animation-smooth)',
      ...variantStyles.progress,
    } as React.CSSProperties,
    circumference,
    radius,
    gradientDefs: variantStyles.gradientDefs,
  };
};

// Circular indeterminate progress SVG styles
export const getCircularIndeterminateProgressSVGStyles = (
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  variant: ProgressIndicatorVariant,
  size: ProgressIndicatorSize,
  animationsEnabled: boolean,
  cssVars: any
) => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  // Create a segment that's 30% of the circle (similar to bar's 30% width)
  const segmentLength = circumference * 0.3;
  const gapLength = circumference - segmentLength;

  // Get variant-specific track and progress styles (same as regular circular)
  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return {
          track: {
            stroke: colors.background,
          },
          progress: {
            stroke: colors.accent || colors.main,
          }
        };
      case 'ghost':
        return {
          track: {
            stroke: 'transparent',
          },
          progress: {
            stroke: colors.main,
          }
        };
      case 'glassmorphic':
        // For glassmorphic, match the bar variant styling approach
        const reflectionColor = colors.hover || colors.main || '#ffffff';
        return {
          track: {
            stroke: colors.background,
            strokeOpacity: 1,
          },
          progress: {
            stroke: `url(#glassmorphic-indeterminate-gradient-${color})`,
          },
          gradientDefs: {
            gradientId: `glassmorphic-indeterminate-gradient-${color}`,
            stops: [
              { offset: '0%', stopColor: colors.accent || colors.main, stopOpacity: 1 },
              { offset: '50%', stopColor: reflectionColor, stopOpacity: 0.8 },
              { offset: '100%', stopColor: colors.accent || colors.main, stopOpacity: 1 }
            ]
          }
        };
      case 'outline':
      default:
        return {
          track: {
            stroke: cssVars.muted,
          },
          progress: {
            stroke: colors.main,
          }
        };
    }
  };

  const variantStyles = getVariantStyles();

  return {
    svg: {
      width: '100%',
      height: '100%',
      transform: 'rotate(-90deg)',
      animation: animationsEnabled
        ? 'progress-circular-indeterminate 2s linear infinite'
        : 'none',
    } as React.CSSProperties,
    track: {
      fill: 'none',
      strokeWidth: sizeConfig.circularThickness,
      ...variantStyles.track,
    } as React.CSSProperties,
    progress: {
      fill: 'none',
      strokeWidth: sizeConfig.circularThickness,
      strokeLinecap: 'round' as const,
      strokeDasharray: `${segmentLength} ${gapLength}`,
      strokeDashoffset: 0,
      ...variantStyles.progress,
    } as React.CSSProperties,
    circumference,
    radius,
    segmentLength,
    gradientDefs: variantStyles.gradientDefs,
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
  const colors = getColorVariables(color, undefined, cssVars);

  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: variant === 'solid' ? colors.main : 'currentColor',
    textAlign: 'center',
    lineHeight: 1,
  };
};

// Progress text overlay styles (for bars)
export const getProgressTextStyles = (
  size: ProgressIndicatorSize,
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  const colors = getColorVariables(color, customColor, cssVars);

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: colors.main,
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
  color: ProgressIndicatorColor,
  customColor: string | undefined,
  cssVars: any
): React.CSSProperties => {
  const sizeConfig = getSizeConfig(size);
  const colors = getColorVariables(color, customColor, cssVars);

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: colors.main,
    textAlign: 'center',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };
};