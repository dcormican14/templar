import type { ProgressIndicatorSize, ProgressIndicatorVariant, ProgressIndicatorPreset, TrackSize } from './ProgressIndicator.types';

export interface ProgressBarSizing {
  trackHeight: number;
  fillHeight: number;
}

export interface SpinnerSizing {
  size: number;
  thickness: number;
}

export const getProgressBarPreset = (preset: ProgressIndicatorPreset): ProgressBarSizing => {
  const presets: Record<ProgressIndicatorPreset, ProgressBarSizing> = {
    sm: { trackHeight: 6, fillHeight: 6 },      // Small bar with small background
    md: { trackHeight: 6, fillHeight: 12 },     // Medium bar with small background  
    lg: { trackHeight: 12, fillHeight: 12 },    // Large bar with large background
  };
  return presets[preset];
};

export const getSpinnerPreset = (preset: ProgressIndicatorPreset): SpinnerSizing => {
  const presets: Record<ProgressIndicatorPreset, SpinnerSizing> = {
    sm: { size: 32, thickness: 2 },      // Small spinner
    md: { size: 40, thickness: 3 },      // Medium spinner
    lg: { size: 48, thickness: 4 },      // Large spinner
  };
  return presets[preset];
};

export const getSpinnerTrackThickness = (trackSize: TrackSize): number => {
  if (trackSize === 'none') return 0;
  
  const trackThickness: Record<Exclude<TrackSize, 'none'>, number> = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  return trackThickness[trackSize];
};

export const getProgressBarTrackThickness = (trackSize: TrackSize, fillHeight: number): number => {
  if (trackSize === 'none') return 0;
  
  switch (trackSize) {
    case 'sm': return 2; // Fixed 2px
    case 'md': return Math.max(fillHeight / 2, 1); // Half the bar height
    case 'lg': return fillHeight; // Same height as the bar
    default: return fillHeight / 2;
  }
};

export const shouldShowPercentageForSpinner = (preset: ProgressIndicatorPreset | undefined, showPercentage: boolean): boolean => {
  if (!showPercentage) return false;
  
  // Only show percentage for lg preset (largest size)
  return preset === 'lg';
};

export const getSizeValue = (size: ProgressIndicatorSize | number): number => {
  if (typeof size === 'number') return size;
  
  const sizeMap = {
    xs: 20,  // Increased from 12
    sm: 24,  // Increased from 16
    md: 32,  // Increased from 20
    lg: 40,  // Increased from 24
    xl: 48,  // Increased from 32
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
  position: 'absolute',
  top: 0,
  left: 0,
  width: `${size}px`,
  height: `${size}px`,
  border: `${thickness}px solid transparent`,
  borderTop: `${thickness}px solid ${color}`,
  borderRadius: '50%',
  animation: animationsEnabled ? 'progress-indicator-spin 1s linear infinite' : 'none',
  display: 'inline-block',
});

export const createSpinnerTrackStyles = (
  size: number,
  thickness: number,
  backgroundColor: string,
  trackSize: TrackSize
): React.CSSProperties => {
  if (trackSize === 'none') {
    return { display: 'none' };
  }

  const trackThickness = getSpinnerTrackThickness(trackSize);
  
  return {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    border: `${trackThickness}px solid ${backgroundColor}`,
    borderRadius: '50%',
    display: 'inline-block',
  };
};

export const createSpinnerContainerStyles = (
  size: number,
  showPercentage: boolean
): React.CSSProperties => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: `${size}px`,
  height: `${size}px`,
});

export const createSpinnerTextStyles = (
  size: number,
  secondaryColor: string,
  sizeType: ProgressIndicatorSize | number
): React.CSSProperties => {
  let fontSize = Math.max(size * 0.25, 8);
  
  // Add 2px for xl size
  if (sizeType === 'xl' || (typeof sizeType === 'number' && sizeType >= 32)) {
    fontSize += 2;
  }
  
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: `${fontSize}px`,
    fontWeight: '600',
    color: secondaryColor,
    zIndex: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };
};

export const createProgressBarStyles = (
  width: number | string,
  trackHeight: number,
  color: string,
  backgroundColor: string,
  fillHeight: number
): React.CSSProperties => {
  const containerHeight = Math.max(trackHeight, fillHeight);
  
  return {
    width: typeof width === 'number' ? `${width}px` : width,
    height: `${containerHeight}px`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent', // Container is transparent
  };
};

export const createProgressBarTrackStyles = (
  width: number | string,
  trackHeight: number,
  backgroundColor: string,
  fillHeight: number,
  showPercentage: boolean = false,
  trackSize: TrackSize = 'md'
): React.CSSProperties => {
  if (trackSize === 'none') {
    return { display: 'none' };
  }

  const actualTrackHeight = getProgressBarTrackThickness(trackSize, fillHeight);
  // Make track slightly shorter than container (90% width)
  const trackWidth = typeof width === 'number' ? `${width - 0.5*fillHeight}px` : '98%';
  
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    width: trackWidth,
    height: `${actualTrackHeight}px`,
    backgroundColor,
    borderRadius: `${actualTrackHeight / 2}px`,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  };

  // If showing percentage, use mask to create center gap sized for text
  if (showPercentage) {
    // Use CSS calc() for fixed 20px gap centered at 50%
    return {
      ...baseStyles,
      // Use CSS mask with calc() for absolute pixel gap
      mask: `linear-gradient(to right, black 0%, black calc(50% - 20px), transparent calc(50% - 18px), transparent calc(50% + 18px), black calc(50% + 20px), black 100%)`,
      WebkitMask: `linear-gradient(to right, black 0%, black calc(50% - 20px), transparent calc(50% - 18px), transparent calc(50% + 18px), black calc(50% + 20px), black 100%)`,
    };
  }

  return baseStyles;
};

export const createProgressBarFillStyles = (
  percentage: number,
  color: string,
  animationsEnabled: boolean,
  fillHeight: number,
  trackHeight: number
): React.CSSProperties => {
  return {
    position: 'absolute',
    width: `${percentage}%`,
    height: `${fillHeight}px`,
    backgroundColor: color,
    transition: animationsEnabled ? 'width 0.3s ease' : 'none',
    borderRadius: `${fillHeight / 2}px`,
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  };
};

export const createProgressBarTextStyles = (
  size: number,
  trackHeight: number,
  fillHeight: number,
  secondaryColor: string,
  sizeType: ProgressIndicatorSize | number
): React.CSSProperties => {
  // Use the larger of track or fill height for font sizing
  const containerHeight = Math.max(trackHeight, fillHeight);
  let fontSize = Math.max(containerHeight * 0.7, 12);
  
  // Add 2px for xl size
  if (sizeType === 'xl' || (typeof sizeType === 'number' && sizeType >= 32)) {
    fontSize += 2;
  }
  
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: `${fontSize}px`,
    fontWeight: '600',
    color: secondaryColor,
    zIndex: 3, // Above both track and fill
    backgroundColor: 'transparent',
    padding: '0 4px', // Small padding for breathing room
    whiteSpace: 'nowrap',
  };
};
