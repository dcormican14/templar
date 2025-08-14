export type ProgressIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressIndicatorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
export type ProgressIndicatorType = 'spinner' | 'progressBar';

export interface ProgressIndicatorProps {
  /** Type of progress indicator to display */
  type?: ProgressIndicatorType;
  /** Size of the progress indicator */
  size?: ProgressIndicatorSize | number;
  /** Color variant or custom color */
  color?: ProgressIndicatorVariant | 'inherit' | string;
  /** Thickness for spinner border or progress bar height */
  thickness?: number;
  /** Progress value (0-100) for progress bar, ignored for spinner */
  value?: number;
  /** Maximum value for progress bar (default: 100) */
  max?: number;
  /** Show percentage text for progress bar */
  showPercentage?: boolean;
  /** Custom label for accessibility */
  label?: string;
  /** Width for progress bar (ignored for spinner) */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
