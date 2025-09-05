import React from 'react';
import type { ScrollbarColor, ScrollbarVariant, ScrollbarSize, ScrollbarShape, ScrollbarOrientation } from './Scrollbar.types';

// Get color variables based on color prop
export const getColorVariables = (color: ScrollbarColor, customColor: string | undefined, cssVars: any) => {
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
export const getShapeStyles = (shape: ScrollbarShape): React.CSSProperties => {
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
export const getSizeConfig = (size: ScrollbarSize) => {
  const configs = {
    xs: {
      thickness: 4,
      thumbThickness: 2,
      borderRadius: 2,
      minThumbSize: 20,
    },
    sm: {
      thickness: 6,
      thumbThickness: 4,
      borderRadius: 3,
      minThumbSize: 30,
    },
    md: {
      thickness: 8,
      thumbThickness: 6,
      borderRadius: 4,
      minThumbSize: 40,
    },
    lg: {
      thickness: 12,
      thumbThickness: 8,
      borderRadius: 6,
      minThumbSize: 50,
    },
    xl: {
      thickness: 16,
      thumbThickness: 12,
      borderRadius: 8,
      minThumbSize: 60,
    },
  };

  return configs[size];
};

// Container styles
export const createScrollbarContainerStyles = (
  shape: ScrollbarShape,
  width: string | number | undefined,
  height: string | number | undefined,
  minWidth: string | number | undefined,
  minHeight: string | number | undefined,
  maxWidth: string | number | undefined,
  maxHeight: string | number | undefined,
  padding: string | number | undefined,
  smoothScrolling: boolean,
  hideNative: boolean,
  momentum: boolean,
  disabled: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  const formatDimension = (value: string | number | undefined) => {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
  };

  return {
    position: 'relative',
    width: formatDimension(width),
    height: formatDimension(height),
    minWidth: formatDimension(minWidth),
    minHeight: formatDimension(minHeight),
    maxWidth: formatDimension(maxWidth),
    maxHeight: formatDimension(maxHeight),
    padding: formatDimension(padding),
    overflow: disabled ? 'hidden' : 'auto',
    scrollBehavior: smoothScrolling ? 'smooth' : 'auto',
    WebkitOverflowScrolling: momentum ? 'touch' : 'auto',
    cursor: disabled ? 'not-allowed' : 'default',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)'
      : 'none',
    ...getShapeStyles(shape),
    // Hide native scrollbars if requested
    ...(hideNative && {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }),
  };
};

// Scrollable content area styles
export const getScrollableContentStyles = (
  orientation: ScrollbarOrientation,
  animationsEnabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    transition: animationsEnabled 
      ? 'transform var(--duration-smooth) var(--animation-smooth)' 
      : 'none',
  };

  switch (orientation) {
    case 'horizontal':
      return {
        ...baseStyles,
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
      };
    case 'vertical':
      return {
        ...baseStyles,
        overflowX: 'hidden',
        overflowY: 'auto',
      };
    case 'both':
    default:
      return {
        ...baseStyles,
        overflowX: 'auto',
        overflowY: 'auto',
      };
  }
};

// WebKit scrollbar styles
export const getWebKitScrollbarStyles = (
  color: ScrollbarColor,
  customColor: string | undefined,
  variant: ScrollbarVariant,
  size: ScrollbarSize,
  shape: ScrollbarShape,
  orientation: ScrollbarOrientation,
  visibility: string,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): Record<string, React.CSSProperties> => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const shapeStyles = getShapeStyles(shape);

  const isHoverOnly = visibility === 'hover';
  const isHidden = visibility === 'hidden';

  if (isHidden) {
    return {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    };
  }

  // Variant-specific colors
  const variantColors = (() => {
    switch (variant) {
      case 'solid':
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: colors.background,
        };
      case 'ghost':
        return {
          thumb: colors.main + '60',
          thumbHover: colors.main + '80',
          track: 'transparent',
        };
      case 'outline':
      default:
        return {
          thumb: cssVars.muted,
          thumbHover: colors.main,
          track: cssVars.background,
        };
    }
  })();

  if (disabled) {
    variantColors.thumb = cssVars.mutedForeground + '40';
    variantColors.thumbHover = cssVars.mutedForeground + '40';
  }

  return {
    // Main scrollbar
    '&::-webkit-scrollbar': {
      width: orientation === 'vertical' || orientation === 'both' ? `${sizeConfig.thickness}px` : '0px',
      height: orientation === 'horizontal' || orientation === 'both' ? `${sizeConfig.thickness}px` : '0px',
      backgroundColor: 'transparent',
    },

    // Track (background)
    '&::-webkit-scrollbar-track': {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
      margin: '1px',
    },

    // Thumb (draggable part)
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: variantColors.thumb,
      borderRadius: shapeStyles.borderRadius,
      border: `${Math.max((sizeConfig.thickness - sizeConfig.thumbThickness) / 2, 0)}px solid transparent`,
      backgroundClip: 'padding-box',
      transition: animationsEnabled 
        ? 'background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)' 
        : 'none',
      opacity: isHoverOnly ? 0 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    },

    // Thumb hover state
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: disabled ? variantColors.thumb : variantColors.thumbHover,
      opacity: 1,
    },

    // Corner where scrollbars meet
    '&::-webkit-scrollbar-corner': {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
    },

    // Show scrollbar on hover
    ...(isHoverOnly && {
      '&:hover::-webkit-scrollbar-thumb': {
        opacity: 1,
      },
    }),
  };
};

// Firefox scrollbar styles
export const getFirefoxScrollbarStyles = (
  color: ScrollbarColor,
  customColor: string | undefined,
  variant: ScrollbarVariant,
  size: ScrollbarSize,
  visibility: string,
  disabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);

  if (visibility === 'hidden') {
    return {
      scrollbarWidth: 'none',
    };
  }

  // Variant-specific colors
  const variantColors = (() => {
    switch (variant) {
      case 'solid':
        return {
          thumb: colors.main,
          track: colors.background,
        };
      case 'ghost':
        return {
          thumb: colors.main + '60',
          track: 'transparent',
        };
      case 'outline':
      default:
        return {
          thumb: cssVars.muted,
          track: cssVars.background,
        };
    }
  })();

  if (disabled) {
    variantColors.thumb = cssVars.mutedForeground + '40';
  }

  return {
    scrollbarWidth: size === 'xs' || size === 'sm' ? 'thin' : 'auto',
    scrollbarColor: `${variantColors.thumb} ${variantColors.track}`,
  };
};

// Custom scrollbar track styles (for custom implementation)
export const getCustomScrollbarTrackStyles = (
  orientation: ScrollbarOrientation,
  color: ScrollbarColor,
  customColor: string | undefined,
  variant: ScrollbarVariant,
  size: ScrollbarSize,
  shape: ScrollbarShape,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const shapeStyles = getShapeStyles(shape);

  const isVertical = orientation === 'vertical';
  const isHorizontal = orientation === 'horizontal';

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    ...shapeStyles,
  };

  // Variant-specific background
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.background,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.muted,
          border: `1px solid ${cssVars.border}`,
        };
    }
  })();

  if (disabled) {
    baseStyles.opacity = 0.4;
  }

  if (isVertical) {
    return {
      ...baseStyles,
      ...variantStyles,
      right: '2px',
      top: '2px',
      bottom: '2px',
      width: `${sizeConfig.thickness}px`,
    };
  }

  if (isHorizontal) {
    return {
      ...baseStyles,
      ...variantStyles,
      bottom: '2px',
      left: '2px',
      right: '2px',
      height: `${sizeConfig.thickness}px`,
    };
  }

  // Both orientations
  return baseStyles;
};

// Custom scrollbar thumb styles
export const getCustomScrollbarThumbStyles = (
  orientation: ScrollbarOrientation,
  color: ScrollbarColor,
  customColor: string | undefined,
  variant: ScrollbarVariant,
  size: ScrollbarSize,
  shape: ScrollbarShape,
  position: number,
  thumbSize: number,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const shapeStyles = getShapeStyles(shape);

  const isVertical = orientation === 'vertical';
  const isHorizontal = orientation === 'horizontal';

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    cursor: disabled ? 'not-allowed' : 'grab',
    transition: animationsEnabled 
      ? 'background-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    ...shapeStyles,
    // Active styles handled via event handlers
  };

  // Variant-specific styling
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colors.main,
          '&:hover': !disabled ? {
            backgroundColor: colors.hover,
          } : {},
        };
      case 'ghost':
        return {
          backgroundColor: colors.main + '60',
          '&:hover': !disabled ? {
            backgroundColor: colors.main + '80',
          } : {},
        };
      case 'outline':
      default:
        return {
          backgroundColor: cssVars.muted,
          border: `1px solid ${colors.border || cssVars.border}`,
          '&:hover': !disabled ? {
            backgroundColor: colors.main,
            borderColor: colors.main,
          } : {},
        };
    }
  })();

  if (disabled) {
    baseStyles.opacity = 0.4;
    variantStyles.backgroundColor = cssVars.mutedForeground;
  }

  const thumbLength = Math.max(thumbSize * 100, sizeConfig.minThumbSize);
  const thumbPosition = Math.min(position * 100, 100 - thumbLength);

  if (isVertical) {
    return {
      ...baseStyles,
      ...variantStyles,
      right: '50%',
      top: `${thumbPosition}%`,
      width: `${sizeConfig.thumbThickness}px`,
      height: `${thumbLength}%`,
      transform: 'translateX(50%)',
    };
  }

  if (isHorizontal) {
    return {
      ...baseStyles,
      ...variantStyles,
      bottom: '50%',
      left: `${thumbPosition}%`,
      width: `${thumbLength}%`,
      height: `${sizeConfig.thumbThickness}px`,
      transform: 'translateY(50%)',
    };
  }

  return baseStyles;
};

// Scroll indicators styles
export const getScrollIndicatorStyles = (
  orientation: ScrollbarOrientation,
  color: ScrollbarColor,
  customColor: string | undefined,
  size: ScrollbarSize,
  position: 'top' | 'bottom' | 'left' | 'right',
  visible: boolean,
  animationsEnabled: boolean,
  cssVars: any
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: colors.main + '20',
    opacity: visible ? 1 : 0,
    transition: animationsEnabled 
      ? 'opacity var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    pointerEvents: 'none',
    zIndex: 3,
  };

  const indicatorSize = sizeConfig.thickness;

  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        right: 0,
        height: `${indicatorSize}px`,
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        right: 0,
        height: `${indicatorSize}px`,
      };
    case 'left':
      return {
        ...baseStyles,
        top: 0,
        bottom: 0,
        left: 0,
        width: `${indicatorSize}px`,
      };
    case 'right':
      return {
        ...baseStyles,
        top: 0,
        bottom: 0,
        right: 0,
        width: `${indicatorSize}px`,
      };
    default:
      return baseStyles;
  }
};