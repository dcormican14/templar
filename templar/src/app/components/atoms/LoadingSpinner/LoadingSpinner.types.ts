export type LoadingSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize | number;
  color?: LoadingSpinnerVariant | 'inherit' | string;
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}
