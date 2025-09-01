export type ProgressIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressIndicatorColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type ProgressIndicatorVariant = 'solid' | 'ghost' | 'outline';
export type ProgressIndicatorShape = 'sharp' | 'round' | 'pill';
export type ProgressIndicatorType = 'spinner' | 'bar' | 'circular' | 'dots';

export interface ProgressIndicatorProps {
  /**
   * Color scheme of the progress indicator
   * @default 'primary'
   */
  color?: ProgressIndicatorColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the progress indicator
   * @default 'solid'
   */
  variant?: ProgressIndicatorVariant;
  
  /**
   * Shape of the progress indicator
   * @default 'round'
   */
  shape?: ProgressIndicatorShape;
  
  /**
   * Size of the progress indicator
   * @default 'md'
   */
  size?: ProgressIndicatorSize;
  
  /**
   * Whether the progress indicator is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Type of progress indicator to display
   * @default 'bar'
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
   * Whether to animate the progress
   * @default true
   */
  animate?: boolean;
  
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
   * Custom width for the progress indicator
   */
  width?: string | number;
  
  /**
   * Custom height for the progress indicator
   */
  height?: string | number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Unique identifier for the component
   */
  id?: string;
}
