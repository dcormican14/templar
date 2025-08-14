import type { LoadingSpinnerSize, LoadingSpinnerVariant } from './LoadingSpinner.types';

export const getSizeValue = (size: LoadingSpinnerSize | number): number => {
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

export const getColorValue = (color: LoadingSpinnerVariant | 'inherit' | string, cssVars: any): string => {
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
  animation: animationsEnabled ? 'loading-spinner-spin 1s linear infinite' : 'none',
  display: 'inline-block',
});
