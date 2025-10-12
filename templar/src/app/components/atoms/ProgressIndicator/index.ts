export { ProgressIndicator } from './ProgressIndicator';
export type { 
  ProgressIndicatorProps, 
  ProgressIndicatorSize, 
  ProgressIndicatorColor,
  ProgressIndicatorVariant,
  ProgressIndicatorShape,
  ProgressIndicatorType 
} from './ProgressIndicator.types';
export { 
  getSizeConfig,
  getColorVariables,
  createProgressIndicatorContainerStyles,
  getBarProgressStyles,
  getProgressFillStyles,
  getSpinnerStyles,
  getCircularProgressStyles,
  getCircularProgressSVGStyles,
  getDotsProgressStyles,
  getDotStyles,
  getTextStyles,
  getProgressTextStyles,
  getCircularTextStyles
} from './ProgressIndicator.styles';

// Legacy exports for backward compatibility
export { ProgressIndicator as LoadingSpinner } from './ProgressIndicator';
export type { 
  ProgressIndicatorProps as LoadingSpinnerProps, 
  ProgressIndicatorSize as LoadingSpinnerSize, 
  ProgressIndicatorVariant as LoadingSpinnerVariant
} from './ProgressIndicator.types';