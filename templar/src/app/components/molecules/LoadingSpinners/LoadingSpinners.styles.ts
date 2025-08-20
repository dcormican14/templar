import React from 'react';
import type { LoadingSpinnerSize, LoadingSpinnerColor } from './LoadingSpinners.types';

export const getSizeStyles = (size: LoadingSpinnerSize): React.CSSProperties => {
  const sizeMap = {
    xs: { width: '16px', height: '16px' },
    sm: { width: '24px', height: '24px' },
    md: { width: '48px', height: '48px' },
    lg: { width: '64px', height: '64px' },
    xl: { width: '96px', height: '96px' },
  };
  return sizeMap[size];
};

export const getColorValue = (color: LoadingSpinnerColor, cssVars: any): string => {
  switch (color) {
    case 'primary':
      return cssVars.primary;
    case 'secondary':
      return cssVars.secondary;
    case 'accent':
      return cssVars.accent;
    case 'success':
      return cssVars.success;
    case 'warning':
      return cssVars.warning;
    case 'error':
      return cssVars.error;
    case 'inherit':
      return 'currentColor';
    default:
      return cssVars.primary;
  }
};

export const createBaseStyles = (
  fullWidth: boolean,
  centered: boolean,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: fullWidth ? '100%' : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: centered ? 'center' : 'flex-start',
  position: 'relative' as const,
  transition: animationsEnabled ? 'all 0.2s ease' : 'none',
});

export const createParrotColors = (color: LoadingSpinnerColor, cssVars: any) => {
  const baseColor = getColorValue(color, cssVars);
  
  return {
    crest: baseColor, // Use selected color for crest
    face: '#fff2ff', // Fixed color as specified
    cheek: '#e7e7e7', // Fixed color as specified
    upperLip: '#f7ce42', // Fixed color as specified
    lowerLip: '#f7a500', // Fixed color as specified
    eye: '#18233e', // Fixed color as specified
  };
};

export const createSpinnerStyles = (
  size: LoadingSpinnerSize,
  color: LoadingSpinnerColor,
  cssVars: any
): React.CSSProperties => {
  const colorValue = getColorValue(color, cssVars);
  const sizeStyles = getSizeStyles(size);
  
  return {
    ...sizeStyles,
    border: `2px solid transparent`,
    borderTop: `2px solid ${colorValue}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };
};

export const createDotsStyles = (
  size: LoadingSpinnerSize,
  color: LoadingSpinnerColor,
  cssVars: any
): React.CSSProperties => {
  const colorValue = getColorValue(color, cssVars);
  const dotSize = size === 'xs' ? '4px' : size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : '12px';
  
  return {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

export const createPulseStyles = (
  size: LoadingSpinnerSize,
  color: LoadingSpinnerColor,
  cssVars: any
): React.CSSProperties => {
  const colorValue = getColorValue(color, cssVars);
  const sizeStyles = getSizeStyles(size);
  
  return {
    ...sizeStyles,
    backgroundColor: colorValue,
    borderRadius: '50%',
    animation: 'pulse 1.5s ease-in-out infinite',
  };
};
