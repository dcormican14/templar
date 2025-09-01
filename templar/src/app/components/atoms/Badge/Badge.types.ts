export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type BadgeVariant = 'solid' | 'ghost' | 'outline';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeShape = 'sharp' | 'round' | 'pill';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  customColor?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  icon?: React.ReactNode;
  iconPosition?: 'leading' | 'trailing';
  removable?: boolean;
  onRemove?: () => void;
  // Legacy support
  /** @deprecated Use shape prop instead */
  rounded?: boolean;
}
