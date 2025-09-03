import React from 'react';
import type { 
  WithContainerProps, 
  UniversalSize, 
  UniversalColor, 
  UniversalVariant, 
  UniversalShape 
} from '../types';

// Component-specific type aliases (for backward compatibility)
export type NotificationSize = UniversalSize;
export type NotificationColor = UniversalColor;
export type NotificationVariant = UniversalVariant;
export type NotificationShape = UniversalShape;

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: UniversalVariant;
  disabled?: boolean;
}

// Component-specific props (not covered by universal props)
export interface NotificationSpecificProps {
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
   * Progress indicator for auto-dismiss
   * @default false
   */
  showProgress?: boolean;
  
  /**
   * Toast position for notifications
   * @default 'top-right'
   */
  toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  
  /**
   * @deprecated Use color prop instead. Legacy support for notification type
   * Maps to: default -> primary, primary -> primary, success -> success, warning -> warning, destructive -> destructive, etc.
   */
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'inverted';
}

// Complete Notification props interface extending universal props
export interface NotificationProps extends WithContainerProps<NotificationSpecificProps> {}
