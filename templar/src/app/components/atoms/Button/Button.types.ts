export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type ButtonVariant = 'solid' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'sharp' | 'round' | 'pill';
export type IconPosition = 'leading' | 'trailing';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  customColor?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  loadingKey?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  onAsyncClick?: () => Promise<void>;
  // Legacy support - will be deprecated
  /** @deprecated Use shape="round" instead */
  rounded?: boolean;
}
