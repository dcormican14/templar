import React from 'react';

export type NotificationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NotificationColor = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'custom';
export type NotificationVariant = 'solid' | 'ghost' | 'outline';
export type NotificationShape = 'sharp' | 'round' | 'pill';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: NotificationVariant;
  disabled?: boolean;
}

export interface NotificationProps {
  /**
   * Color scheme of the notification
   * @default 'primary'
   */
  color?: NotificationColor;
  
  /**
   * Custom color when color is set to 'custom'
   */
  customColor?: string;
  
  /**
   * Visual style variant of the notification
   * @default 'outline'
   */
  variant?: NotificationVariant;
  
  /**
   * Shape of the notification
   * @default 'round'
   */
  shape?: NotificationShape;
  
  /**
   * Size of the notification
   * @default 'md'
   */
  size?: NotificationSize;
  
  /**
   * Whether the notification is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to use rounded corners
   * @default false
   * @deprecated Use shape prop instead
   */
  rounded?: boolean;
  
  /**
   * Main title/heading of the notification
   */
  title: string;
  
  /**
   * Optional description or detailed message
   */
  description?: string;
  
  /**
   * Whether the notification can be dismissed
   * @default true
   */
  dismissible?: boolean;
  
  /**
   * Whether to show an icon based on the notification color
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Custom icon to display instead of the default color icon
   */
  icon?: React.ReactNode;
  
  /**
   * Optional action button(s)
   */
  actions?: NotificationAction[];
  
  /**
   * Callback when notification is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Auto-dismiss duration in milliseconds
   * Set to 0 or null to disable auto-dismiss
   */
  duration?: number | null;
  
  /**
   * Progress indicator for auto-dismiss
   * @default false
   */
  showProgress?: boolean;
  
  /**
   * Position of the notification for toast mode
   * @default 'top-right'
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  
  /**
   * Whether to enable slide-in animation
   * @default true
   */
  animate?: boolean;
  
  /**
   * Custom width for the notification
   */
  width?: string | number;
  
  /**
   * Custom height for the notification
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
   * Unique identifier for the notification
   */
  id?: string;
  
  /**
   * Children content for custom notification content
   */
  children?: React.ReactNode;
}
