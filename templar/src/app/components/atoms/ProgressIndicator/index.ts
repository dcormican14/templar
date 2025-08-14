export { ProgressIndicator } from './ProgressIndicator';
export type { 
  ProgressIndicatorProps, 
  ProgressIndicatorSize, 
  ProgressIndicatorVariant,
  ProgressIndicatorType 
} from './ProgressIndicator.types';
export { 
  getSizeValue, 
  getColorValue, 
  createSpinnerStyles,
  createProgressBarStyles,
  createProgressBarFillStyles,
  createProgressBarTextStyles
} from './ProgressIndicator.styles';

// Legacy exports for backward compatibility
export { ProgressIndicator as LoadingSpinner } from './ProgressIndicator';
export type { 
  ProgressIndicatorProps as LoadingSpinnerProps, 
  ProgressIndicatorSize as LoadingSpinnerSize, 
  ProgressIndicatorVariant as LoadingSpinnerVariant
} from './ProgressIndicator.types';
