import React from 'react';

export type NotificationType = 'primary' | 'secondary' | 'warning' | 'destructive' | 'success' | 'default' | 'inverted';
export type NotificationSize = 'sm' | 'md' | 'lg';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

export interface NotificationProps {
  /**
   * Unique identifier for the notification
   */
  id?: string;
  
  /**
   * Type of notification affecting visual styling
   * @default 'default'
   */
  type?: NotificationType;
  
  /**
   * Size of the notification
   * @default 'md'
   */
  size?: NotificationSize;
  
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
   * Whether to show an icon based on the notification type
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Custom icon to display instead of the default type icon
   */
  customIcon?: React.ReactNode;
  
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
   * Whether to use rounded corners
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Children content for custom notification content
   */
  children?: React.ReactNode;
}
