import React from 'react';
import type { IconSize, IconColor } from './Icon.types';

export const getSizeValue = (size: IconSize | number): number => {
  if (typeof size === 'number') {
    return size;
  }
  
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };
  return sizeMap[size];
};

export const getColorValue = (color: IconColor | string, cssVars: any): string => {
  switch (color) {
    case 'inherit':
      return 'currentColor';
    case 'primary':
      return cssVars.primary;
    case 'secondary':
      return cssVars.secondary;
    case 'success':
      return cssVars.success;
    case 'warning':
      return cssVars.warning;
    case 'error':
      return cssVars.error;
    case 'info':
      return cssVars.info;
    case 'muted':
      return cssVars.mutedForeground;
    default:
      return color;
  }
};

export const getAnimationStyles = (
  spin: boolean,
  pulse: boolean,
  animationsEnabled: boolean
): React.CSSProperties => {
  if (!animationsEnabled) return {};
  
  const animations: React.CSSProperties = {};
  
  if (spin) {
    animations.animation = 'icon-spin 2s linear infinite';
  } else if (pulse) {
    animations.animation = 'icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
  }
  
  return animations;
};

export const createIconStyles = (
  sizeValue: number,
  colorValue: string,
  animationStyles: React.CSSProperties,
  customStyle?: React.CSSProperties
): React.CSSProperties => ({
  width: sizeValue,
  height: sizeValue,
  color: colorValue,
  flexShrink: 0,
  display: 'inline-block',
  ...animationStyles,
  ...customStyle,
});
