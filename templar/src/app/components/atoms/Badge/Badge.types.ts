export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'leading' | 'trailing';
  removable?: boolean;
  onRemove?: () => void;
}
