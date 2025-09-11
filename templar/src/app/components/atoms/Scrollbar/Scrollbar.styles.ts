import React from 'react';
import type { ScrollbarColor, ScrollbarVariant, ScrollbarSize, ScrollbarShape, ScrollbarOrientation, ScrollbarAlignment } from './Scrollbar.types';

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

  // Fallback values if cssVars is undefined
  if (!cssVars) {
    return {
      main: '#3b82f6',
      background: '#e5e7eb',
      foreground: '#ffffff',
      hover: '#2563eb',
      border: '#d1d5db',
    };
  }

  const colorMap: Record<string, any> = {
    primary: {
      main: cssVars.primary || '#3b82f6',
      background: cssVars.primaryBackground || '#e5e7eb',
      foreground: cssVars.primaryForeground || '#ffffff',
      hover: cssVars.primaryHover || '#2563eb',
      border: cssVars.primaryBorder || '#d1d5db',
    },
    secondary: {
      main: cssVars.secondary || '#6b7280',
      background: cssVars.secondaryBackground || '#f3f4f6',
      foreground: cssVars.secondaryForeground || '#ffffff',
      hover: cssVars.secondaryHover || '#4b5563',
      border: cssVars.secondaryBorder || '#e5e7eb',
    },
    success: {
      main: cssVars.success || '#10b981',
      background: cssVars.successBackground || '#d1fae5',
      foreground: cssVars.successForeground || '#ffffff',
      hover: cssVars.successHover || '#059669',
      border: cssVars.successBorder || '#86efac',
    },
    warning: {
      main: cssVars.warning || '#f59e0b',
      background: cssVars.warningBackground || '#fef3c7',
      foreground: cssVars.warningForeground || '#ffffff',
      hover: cssVars.warningHover || '#d97706',
      border: cssVars.warningBorder || '#fde68a',
    },
    destructive: {
      main: cssVars.destructive || '#ef4444',
      background: cssVars.destructiveBackground || '#fee2e2',
      foreground: cssVars.destructiveForeground || '#ffffff',
      hover: cssVars.destructiveHover || '#dc2626',
      border: cssVars.destructiveBorder || '#fca5a5',
    },
    info: {
      main: cssVars.info || '#3b82f6',
      background: cssVars.infoBackground || '#dbeafe',
      foreground: cssVars.infoForeground || '#ffffff',
      hover: cssVars.infoHover || '#2563eb',
      border: cssVars.infoBorder || '#93c5fd',
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
    cursor: disabled ? 'not-allowed' : 'default',
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)'
      : 'none',
    overflow: 'hidden', // Container should hide overflow
  };
};

// Scrollable content area styles
export const getScrollableContentStyles = (
  orientation: ScrollbarOrientation,
  animationsEnabled: boolean,
  hideNative: boolean,
  smoothScrolling: boolean,
  momentum: boolean,
  disabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    transition: animationsEnabled 
      ? 'transform var(--duration-smooth) var(--animation-smooth)' 
      : 'none',
    scrollBehavior: smoothScrolling ? 'smooth' : 'auto',
    WebkitOverflowScrolling: momentum ? 'touch' : 'auto',
    // Hide native scrollbars if requested
    ...(hideNative && {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }),
  };

  const overflowValue = disabled ? 'hidden' : 'auto';

  switch (orientation) {
    case 'horizontal':
      return {
        ...baseStyles,
        overflowX: overflowValue,
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
      };
    case 'vertical':
      return {
        ...baseStyles,
        overflowX: 'hidden',
        overflowY: overflowValue,
      };
    case 'both':
    default:
      return {
        ...baseStyles,
        overflowX: overflowValue,
        overflowY: overflowValue,
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
  alignment: string,
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
        // Solid variant - bar with solid background
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: colors.foreground, // Use foreground color for background
          trackBorder: 'none',
          border: 'none',
          showButtons: false,
          buttonColor: colors.main,
        };
      case 'ghost':
        // Ghost variant - just the bar, no background
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: 'transparent',
          trackBorder: 'none',
          border: 'none',
          showButtons: false,
          buttonColor: 'transparent',
        };
      case 'glassmorphic':
        return {
          thumb: `${colors.main}80`,
          thumbHover: colors.main,
          track: `${cssVars?.background || '#ffffff'}20`,
          trackBorder: 'none',
          border: 'none',
          showButtons: false,
          buttonColor: colors.main,
          backdropFilter: 'blur(10px)',
          webkitBackdropFilter: 'blur(10px)',
        };
      case 'invisible':
        // Invisible variant - completely invisible scrollbar
        return {
          thumb: 'transparent',
          thumbHover: 'transparent',
          track: 'transparent',
          trackBorder: 'none',
          border: 'none',
          showButtons: false,
          buttonColor: 'transparent',
        };
      case 'outline':
      default:
        // Outline variant - bar with wider background (no border)
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: colors.background, // Use the color-specific background
          trackBorder: 'none',
          border: 'none',
          showButtons: false,
          buttonColor: colors.main,
          trackPadding: true, // Flag to make track wider
        };
    }
  })();

  if (disabled) {
    variantColors.thumb = (cssVars?.mutedForeground || '#6b7280') + '40';
    variantColors.thumbHover = (cssVars?.mutedForeground || '#6b7280') + '40';
  }

  // Standardize scrollbar width for all variants (wider track)
  const scrollbarThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));

  return {
    // Main scrollbar
    '&::-webkit-scrollbar': {
      width: orientation === 'vertical' || orientation === 'both' ? `${scrollbarThickness}px` : '0px',
      height: orientation === 'horizontal' || orientation === 'both' ? `${scrollbarThickness}px` : '0px',
      backgroundColor: 'transparent',
    },

    // Track (background)
    '&::-webkit-scrollbar-track': {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
      margin: variant === 'solid' ? '0' : '1px',
      border: variantColors.trackBorder || 'none',
      backdropFilter: variantColors.backdropFilter || 'none',
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || 'none',
    },

    // Thumb (draggable part)
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: variantColors.thumb,
      borderRadius: shapeStyles.borderRadius,
      // Center the thumb in the wider track for all variants
      border: `${Math.max(2, Math.floor((scrollbarThickness - sizeConfig.thumbThickness) / 2))}px solid transparent`,
      backgroundClip: 'padding-box',
      transition: animationsEnabled 
        ? 'background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)' 
        : 'none',
      opacity: variant === 'invisible' ? 0 : (isHoverOnly ? 0 : 1),
      cursor: disabled ? 'not-allowed' : (variant === 'invisible' ? 'default' : 'pointer'),
      backdropFilter: variantColors.backdropFilter || 'none',
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || 'none',
      boxShadow: variant === 'glassmorphic' ? `0 2px 4px ${cssVars?.shadow || '#000000'}20` : 'none',
    },

    // Thumb hover state
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: disabled ? variantColors.thumb : (variant === 'invisible' ? 'transparent' : variantColors.thumbHover),
      opacity: variant === 'invisible' ? 0 : 1,
      boxShadow: variant === 'glassmorphic' ? `0 4px 8px ${cssVars?.shadow || '#000000'}30` : 'none',
    },

    // Corner where scrollbars meet
    '&::-webkit-scrollbar-corner': {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
      backdropFilter: variantColors.backdropFilter || 'none',
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || 'none',
    },

    // Hide scrollbar buttons for all variants
    ...{
      '&::-webkit-scrollbar-button': {
        display: 'none',
      },
    },

    // Show scrollbar on hover - need container hover
    ...(isHoverOnly && {
      // This will be processed specially in createWebkitScrollbarCSS
      '__hover__': {
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
          track: colors.foreground, // Use foreground color for background
        };
      case 'ghost':
        // Ghost variant - completely invisible
        return {
          thumb: 'transparent',
          track: 'transparent',
        };
      case 'glassmorphic':
        return {
          thumb: `${colors.main}99`,
          track: `${cssVars?.background || '#ffffff'}33`,
        };
      case 'invisible':
        return {
          thumb: 'transparent',
          track: 'transparent',
        };
      case 'outline':
      default:
        // Outline variant - use color-specific background
        return {
          thumb: colors.main,
          track: colors.background,
        };
    }
  })();

  if (disabled) {
    variantColors.thumb = (cssVars?.mutedForeground || '#6b7280') + '40';
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
  alignment: string,
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
        // Solid variant - bar with solid background
        return {
          backgroundColor: colors.foreground, // Use foreground color for background
          border: 'none',
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`, // Standardized padding
        };
      case 'ghost':
        // Ghost variant - just the bar, no background track
        return {
          backgroundColor: 'transparent',
          border: 'none',
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`, // Standardized padding
        };
      case 'glassmorphic':
        return {
          backgroundColor: `${cssVars?.background || '#ffffff'}20`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: 'none',
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`, // Standardized padding
        };
      case 'invisible':
        // Invisible variant - completely invisible track
        return {
          display: 'none', // Hide the track completely
        };
      case 'outline':
      default:
        // Outline variant - bar with wider background (no border)
        return {
          backgroundColor: colors.background, // Use color-specific background
          border: 'none',
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`, // Add padding to make track wider
        };
    }
  })();

  if (disabled) {
    baseStyles.opacity = 0.4;
  }

  // Standardize track width for all variants (wider track)
  const trackThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));

  if (isVertical) {
    const positionProps = alignment === 'start' 
      ? { left: '2px' } 
      : { right: '2px' };
    return {
      ...baseStyles,
      ...variantStyles,
      ...positionProps,
      top: '2px',
      bottom: '2px',
      width: `${trackThickness}px`,
    };
  }

  if (isHorizontal) {
    const positionProps = alignment === 'start' 
      ? { top: '2px' } 
      : { bottom: '2px' };
    return {
      ...baseStyles,
      ...variantStyles,
      ...positionProps,
      left: '2px',
      right: '2px',
      height: `${trackThickness}px`,
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
  isDragging: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  showIndicators?: boolean
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
        // Solid variant - bar with solid background
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: 'none',
        };
      case 'ghost':
        // Ghost variant - just the bar
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: 'none',
        };
      case 'glassmorphic':
        return {
          backgroundColor: isDragging ? colors.main : `${colors.main}80`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: 'none',
          boxShadow: isDragging ? `0 0 16px ${colors.main}50` : `0 2px 8px ${cssVars?.shadow || '#000000'}15`,
        };
      case 'invisible':
        // Invisible variant - completely invisible thumb
        return {
          display: 'none', // Hide the thumb completely
        };
      case 'outline':
      default:
        // Outline variant - bar on bordered background
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: 'none',
        };
    }
  })();

  if (disabled) {
    baseStyles.opacity = 0.4;
    variantStyles.backgroundColor = cssVars?.mutedForeground || '#6b7280';
  }

  // Calculate space needed for indicators (indicator size + padding)
  const indicatorSpace = showIndicators ? (sizeConfig.thickness + 6) : 0; // Space for indicator + gap
  
  const thumbLength = Math.max(thumbSize * 100, sizeConfig.minThumbSize);
  
  // Standardize thumb width across all variants - consistent with track standardization
  const standardizedThumbWidth = sizeConfig.thumbThickness;

  if (isVertical) {
    // Calculate available space for thumb movement when indicators are shown
    const availableSpace = showIndicators ? (100 - (indicatorSpace * 2 / 4)) : 100;
    const scaledPosition = showIndicators ? 
      (position * availableSpace) : 
      (position * 100);
    
    // Calculate thumb position with indicator offset
    const thumbPosition = Math.min(scaledPosition, availableSpace - thumbLength);
    const finalTop = showIndicators ? 
      `calc(${thumbPosition}% + ${indicatorSpace}px)` : 
      `${thumbPosition}%`;
    
    return {
      ...baseStyles,
      ...variantStyles,
      right: '50%',
      top: finalTop,
      width: `${standardizedThumbWidth}px`,
      height: `${thumbLength}%`,
      transform: 'translateX(50%)',
      maxHeight: showIndicators ? `calc(100% - ${indicatorSpace * 2}px)` : '100%',
    };
  }

  if (isHorizontal) {
    // Calculate available space for thumb movement when indicators are shown
    const availableSpace = showIndicators ? (100 - (indicatorSpace * 2 / 4)) : 100;
    const scaledPosition = showIndicators ? 
      (position * availableSpace) : 
      (position * 100);
    
    // Calculate thumb position with indicator offset
    const thumbPosition = Math.min(scaledPosition, availableSpace - thumbLength);
    const finalLeft = showIndicators ? 
      `calc(${thumbPosition}% + ${indicatorSpace}px)` : 
      `${thumbPosition}%`;
    
    return {
      ...baseStyles,
      ...variantStyles,
      bottom: '50%',
      left: finalLeft,
      width: `${thumbLength}%`,
      height: `${standardizedThumbWidth}px`,
      transform: 'translateY(50%)',
      maxWidth: showIndicators ? `calc(100% - ${indicatorSpace * 2}px)` : '100%',
    };
  }

  return baseStyles;
};

// Scroll indicators styles (arrow icons in track)
export const getScrollIndicatorStyles = (
  orientation: ScrollbarOrientation,
  color: ScrollbarColor,
  customColor: string | undefined,
  size: ScrollbarSize,
  position: 'top' | 'bottom' | 'left' | 'right',
  visible: boolean,
  disabled: boolean,
  animationsEnabled: boolean,
  cssVars: any,
  alignment?: string,
  variant?: ScrollbarVariant
): React.CSSProperties => {
  const colors = getColorVariables(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  
  // Indicator size should be smaller to fit within the track
  const trackThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));
  const indicatorSize = sizeConfig.thickness; // Use base thickness for indicator

  // Get variant-specific styling for the indicator background
  const variantStyles = (() => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none',
        };
      case 'glassmorphic':
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none',
        };
      case 'outline':
      default:
        return {
          backgroundColor: 'transparent',
          color: colors.main,
          border: 'none',
        };
    }
  })();

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    ...variantStyles,
    opacity: visible ? 1 : 0.5,
    transition: animationsEnabled 
      ? 'all var(--duration-fast) var(--animation-smooth)' 
      : 'none',
    pointerEvents: disabled ? 'none' : 'auto',
    cursor: disabled ? 'not-allowed' : (visible ? 'pointer' : 'default'),
    zIndex: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Calculate centering offset for indicators within the track
  const centerOffset = Math.max(2, (trackThickness - indicatorSize) / 2);

  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        top: '2px',
        [alignment === 'start' ? 'left' : 'right']: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`,
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: '2px',
        [alignment === 'start' ? 'left' : 'right']: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`,
      };
    case 'left':
      return {
        ...baseStyles,
        left: '2px',
        [alignment === 'start' ? 'top' : 'bottom']: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`,
      };
    case 'right':
      return {
        ...baseStyles,
        right: '2px',
        [alignment === 'start' ? 'top' : 'bottom']: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`,
      };
    default:
      return baseStyles;
  }
};