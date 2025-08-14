import type { ProgressIndicatorSize, ProgressIndicatorVariant } from './ProgressIndicator.types';

export const getSizeValue = (size: ProgressIndicatorSize | number): number => {
  if (typeof size === 'number') return size;
  
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };
  return sizeMap[size];
};

export const getColorValue = (color: ProgressIndicatorVariant | 'inherit' | string, cssVars: any): string => {
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

export const createSpinnerStyles = (
  size: number,
  color: string,
  thickness: number,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: `${size}px`,
  height: `${size}px`,
  border: `${thickness}px solid transparent`,
  borderTop: `${thickness}px solid ${color}`,
  borderRadius: '50%',
  animation: animationsEnabled ? 'progress-indicator-spin 1s linear infinite' : 'none',
  display: 'inline-block',
});

export const createProgressBarStyles = (
  width: number | string,
  height: number,
  color: string,
  backgroundColor: string
): React.CSSProperties => ({
  width: typeof width === 'number' ? `${width}px` : width,
  height: `${height}px`,
  backgroundColor,
  borderRadius: `${height / 2}px`,
  overflow: 'hidden',
  position: 'relative',
  display: 'inline-block',
});

export const createProgressBarFillStyles = (
  percentage: number,
  color: string,
  animationsEnabled: boolean
): React.CSSProperties => ({
  width: `${percentage}%`,
  height: '100%',
  backgroundColor: color,
  transition: animationsEnabled ? 'width 0.3s ease' : 'none',
  borderRadius: 'inherit',
});

export const createProgressBarTextStyles = (
  size: number
): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: `${Math.max(size * 0.6, 10)}px`,
  fontWeight: '600',
  color: 'currentColor',
  zIndex: 1,
});
