import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type ProgressIndicatorSize = UniversalSize;
export type ProgressIndicatorColor = UniversalColor;
export type ProgressIndicatorVariant = UniversalVariant;
export type ProgressIndicatorShape = UniversalShape;
export type ProgressIndicatorType = 'bar' | 'progressBar' | 'circular';

// Component-specific props (not covered by universal props)
export interface ProgressIndicatorSpecificProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Type of progress indicator to display
   * @default 'spinner'
   */
  type?: ProgressIndicatorType;
  
  /**
   * Progress value (0-100)
   * @default 0
   */
  value?: number;
  
  /**
   * Maximum value for progress calculation
   * @default 100
   */
  max?: number;
  
  /**
   * Whether to show percentage text
   * @default false
   */
  showPercentage?: boolean;
  
  /**
   * Whether to show the current value
   * @default false
   */
  showValue?: boolean;
  
  /**
   * Custom label text
   */
  label?: string;
  
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  duration?: number;
  
  /**
   * Whether to use striped pattern
   * @default false
   */
  striped?: boolean;
  
  /**
   * Whether stripes should animate
   * @default false
   */
  stripedAnimation?: boolean;
  
  /**
   * Whether to show indeterminate loading state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether to automatically increment progress value
   * @default false
   */
  autoProgress?: boolean;

  /**
   * Duration in milliseconds for auto progress to complete (0-100%)
   * @default 3000
   */
  autoProgressDuration?: number;

  // Legacy props for backward compatibility
  preset?: string;
  trackSize?: UniversalSize;
}

// Complete ProgressIndicator props interface extending universal props
export interface ProgressIndicatorProps extends WithContainerProps<ProgressIndicatorSpecificProps> {}
