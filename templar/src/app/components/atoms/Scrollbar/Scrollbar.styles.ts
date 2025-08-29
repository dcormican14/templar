import { CSSProperties } from 'react';
import { ScrollbarSize, ScrollbarVariant, ScrollbarOrientation, ScrollbarTrackSize } from './Scrollbar.types';

// Size configurations
export const getScrollbarDimensions = (size: ScrollbarSize) => {
  switch (size) {
    case 'sm':
      return {
        thickness: 6,
        thumbThickness: 4,
        borderRadius: 3,
      };
    case 'lg':
      return {
        thickness: 16,
        thumbThickness: 12,
        borderRadius: 8,
      };
    case 'md':
    default:
      return {
        thickness: 12,
        thumbThickness: 8,
        borderRadius: 6,
      };
  }
};

// Get track thickness based on track size
export const getTrackThickness = (trackSize: ScrollbarTrackSize, thumbThickness: number): number => {
  if (trackSize === 'none') return 0;
  
  switch (trackSize) {
    case 'sm': return Math.max(thumbThickness * 0.5, 2);
    case 'md': return thumbThickness;
    case 'lg': return thumbThickness * 1.5;
    default: return thumbThickness;
  }
};

// Get variant colors
export const getScrollbarColors = (variant: ScrollbarVariant, disabled: boolean, cssVars: any) => {
  if (disabled) {
    return {
      thumb: cssVars.mutedForeground,
      thumbHover: cssVars.mutedForeground,
      track: cssVars.muted,
      variantColor: cssVars.mutedForeground,
    };
  }

  let variantColor;
  let variantColorHover;
  
  switch (variant) {
    case 'primary':
      variantColor = cssVars.primary;
      variantColorHover = cssVars.primary;
      break;
    case 'secondary':
      variantColor = cssVars.secondary;
      variantColorHover = cssVars.secondary;
      break;
    case 'success':
      variantColor = cssVars.success || cssVars.primary;
      variantColorHover = cssVars.success || cssVars.primary;
      break;
    case 'warning':
      variantColor = cssVars.warning || cssVars.primary;
      variantColorHover = cssVars.warning || cssVars.primary;
      break;
    case 'error':
      variantColor = cssVars.error;
      variantColorHover = cssVars.error;
      break;
    default:
      variantColor = cssVars.primary;
      variantColorHover = cssVars.primary;
  }

  return {
    thumb: `${variantColor}80`, // 50% opacity
    thumbHover: variantColor,
    track: cssVars.muted,
    variantColor,
  };
};

// Main scrollbar container styles
export const getScrollbarContainerStyles = (
  orientation: ScrollbarOrientation,
  height?: number | string,
  width?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  smoothScrolling: boolean = true,
  disabled: boolean = false
): CSSProperties => {
  return {
    position: 'relative',
    overflow: disabled ? 'hidden' : 'auto',
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    scrollBehavior: smoothScrolling ? 'smooth' : 'auto',
    cursor: disabled ? 'not-allowed' : 'default',
  };
};

// Custom scrollbar styles (WebKit)
export const getWebKitScrollbarStyles = (
  size: ScrollbarSize,
  variant: ScrollbarVariant,
  orientation: ScrollbarOrientation,
  trackSize: ScrollbarTrackSize,
  visibility: 'always' | 'hover' | 'auto',
  disabled: boolean,
  cssVars: any
): Record<string, CSSProperties> => {
  const dimensions = getScrollbarDimensions(size);
  const colors = getScrollbarColors(variant, disabled, cssVars);
  const trackThickness = getTrackThickness(trackSize, dimensions.thumbThickness);
  
  const isHoverOnly = visibility === 'hover';
  
  return {
    // Main scrollbar
    '&::-webkit-scrollbar': {
      width: orientation === 'vertical' ? `${dimensions.thickness}px` : 'auto',
      height: orientation === 'horizontal' ? `${dimensions.thickness}px` : 'auto',
      backgroundColor: 'transparent',
    },
    
    // Track (background)
    '&::-webkit-scrollbar-track': {
      backgroundColor: trackSize === 'none' ? 'transparent' : colors.track,
      borderRadius: `${dimensions.borderRadius}px`,
      margin: '2px',
    },
    
    // Thumb (draggable part)
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.thumb,
      borderRadius: `${dimensions.borderRadius}px`,
      border: `${Math.max((dimensions.thickness - dimensions.thumbThickness) / 2, 0)}px solid transparent`,
      backgroundClip: 'padding-box',
      transition: 'background-color 0.2s ease',
      opacity: isHoverOnly ? 0 : 1,
    },
    
    // Thumb hover state
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: colors.thumbHover,
      opacity: 1,
    },
    
    // Corner where scrollbars meet
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    
    // Show scrollbar on hover
    ...(isHoverOnly && {
      '&:hover::-webkit-scrollbar-thumb': {
        opacity: 1,
      },
    }),
  };
};

// Fallback scrollbar styles for non-WebKit browsers
export const getFallbackScrollbarStyles = (
  size: ScrollbarSize,
  variant: ScrollbarVariant,
  cssVars: any
): CSSProperties => {
  const colors = getScrollbarColors(variant, false, cssVars);
  
  return {
    scrollbarWidth: size === 'sm' ? 'thin' : 'auto',
    scrollbarColor: `${colors.thumb} ${colors.track}`,
  };
};

// Content wrapper styles
export const getScrollbarContentStyles = (): CSSProperties => ({
  width: '100%',
  height: '100%',
});

// Custom scrollbar track styles (for custom implementation)
export const getCustomScrollbarTrackStyles = (
  orientation: ScrollbarOrientation,
  size: ScrollbarSize,
  trackSize: ScrollbarTrackSize,
  cssVars: any
): CSSProperties => {
  const dimensions = getScrollbarDimensions(size);
  const trackThickness = getTrackThickness(trackSize, dimensions.thumbThickness);
  
  if (trackSize === 'none') {
    return { display: 'none' };
  }
  
  const isVertical = orientation === 'vertical';
  
  return {
    position: 'absolute',
    right: isVertical ? '2px' : 'auto',
    bottom: !isVertical ? '2px' : 'auto',
    top: isVertical ? '2px' : 'auto',
    left: !isVertical ? '2px' : 'auto',
    width: isVertical ? `${trackThickness}px` : 'calc(100% - 4px)',
    height: !isVertical ? `${trackThickness}px` : 'calc(100% - 4px)',
    backgroundColor: cssVars.muted,
    borderRadius: `${dimensions.borderRadius}px`,
    zIndex: 1,
  };
};

// Custom scrollbar thumb styles (for custom implementation)
export const getCustomScrollbarThumbStyles = (
  orientation: ScrollbarOrientation,
  size: ScrollbarSize,
  variant: ScrollbarVariant,
  position: number, // 0-1
  thumbSize: number, // 0-1
  disabled: boolean,
  cssVars: any
): CSSProperties => {
  const dimensions = getScrollbarDimensions(size);
  const colors = getScrollbarColors(variant, disabled, cssVars);
  
  const isVertical = orientation === 'vertical';
  const thumbLength = `${thumbSize * 100}%`;
  const thumbPosition = `${position * 100}%`;
  
  return {
    position: 'absolute',
    right: isVertical ? '50%' : 'auto',
    bottom: !isVertical ? '50%' : 'auto',
    top: isVertical ? thumbPosition : '50%',
    left: !isVertical ? thumbPosition : '50%',
    width: isVertical ? `${dimensions.thumbThickness}px` : thumbLength,
    height: !isVertical ? `${dimensions.thumbThickness}px` : thumbLength,
    backgroundColor: colors.thumb,
    borderRadius: `${dimensions.borderRadius}px`,
    transform: isVertical ? 'translateX(50%)' : 'translateY(50%)',
    transition: 'background-color 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    zIndex: 2,
  };
};
