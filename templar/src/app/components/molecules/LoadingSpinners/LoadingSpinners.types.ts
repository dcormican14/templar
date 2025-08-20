import React from 'react';

export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerVariant = 'parrot' | 'spinner' | 'dots' | 'pulse';
export type LoadingSpinnerColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'inherit';

export interface LoadingSpinnersProps {
  // Core props
  variant?: LoadingSpinnerVariant;
  size?: LoadingSpinnerSize;
  color?: LoadingSpinnerColor;
  
  // Animation props
  duration?: number; // Animation duration in seconds
  show?: boolean; // Whether to show the spinner
  
  // Layout props
  fullWidth?: boolean;
  centered?: boolean; // Center the spinner in its container
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export interface ParrotAnimationProps {
  size: LoadingSpinnerSize;
  color: LoadingSpinnerColor;
  duration: number;
  show: boolean;
  cssVars: any;
}

export interface SpinnerAnimationProps {
  size: LoadingSpinnerSize;
  color: LoadingSpinnerColor;
  duration: number;
  show: boolean;
  cssVars: any;
}

export interface DotsAnimationProps {
  size: LoadingSpinnerSize;
  color: LoadingSpinnerColor;
  duration: number;
  show: boolean;
  cssVars: any;
}

export interface PulseAnimationProps {
  size: LoadingSpinnerSize;
  color: LoadingSpinnerColor;
  duration: number;
  show: boolean;
  cssVars: any;
}
