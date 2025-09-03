import React from 'react';
import { Icon } from '../Icon';
import type { NotificationColor, NotificationSize } from './Notification.types';

export const getTypeIcon = (color: NotificationColor): string => {
  switch (color) {
    case 'primary':
      return 'InfoCircle';
    case 'secondary':
      return 'Bell';
    case 'warning':
      return 'WarningTriangle';
    case 'destructive':
      return 'XmarkCircle';
    case 'success':
      return 'CheckCircle';
    case 'info':
      return 'InfoCircle';
    case 'custom':
    default:
      return 'Bell';
  }
};

export const getIconSize = (notificationSize: NotificationSize): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
  switch (notificationSize) {
    case 'sm':
      return 'sm';
    case 'lg':
      return 'md';
    case 'md':
    default:
      return 'sm';
  }
};

export const getTypeColor = (color: NotificationColor, cssVars: any): string => {
  switch (color) {
    case 'primary':
      return cssVars.primary;
    case 'secondary':
      return cssVars.secondary;
    case 'warning':
      return cssVars.warning;
    case 'destructive':
      return cssVars.destructive || cssVars.error;
    case 'success':
      return cssVars.success;
    case 'info':
      return cssVars.info;
    case 'custom':
    default:
      return cssVars.foreground;
  }
};

export const createTypeIcon = (
  color: NotificationColor,
  size: NotificationSize,
  cssVars: any,
  customIcon?: React.ReactNode
): React.ReactElement => {
  if (customIcon) {
    return <span>{customIcon}</span>;
  }

  const iconName = getTypeIcon(color);
  const iconSize = getIconSize(size);
  const iconColor = getTypeColor(color, cssVars);

  return (
    <Icon 
      name={iconName as any} 
      size={iconSize}
      style={{ color: iconColor }}
    />
  );
};

export const generateNotificationId = (): string => {
  return `notification-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
};

export const handleKeyDown = (
  event: React.KeyboardEvent,
  onDismiss?: () => void
) => {
  if (event.key === 'Escape' && onDismiss) {
    event.preventDefault();
    onDismiss();
  }
};

export const setupAutoDismiss = (
  duration: number | null,
  onDismiss?: () => void
): (() => void) | null => {
  if (!duration || duration <= 0 || !onDismiss) {
    return null;
  }

  const timeoutId = setTimeout(() => {
    onDismiss();
  }, duration);

  // Return cleanup function
  return () => clearTimeout(timeoutId);
};

export const formatDuration = (duration: number): string => {
  if (duration < 1000) {
    return `${duration}ms`;
  }
  
  const seconds = Math.floor(duration / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const getAriaLabel = (
  color: NotificationColor,
  title: string,
  description?: string
): string => {
  const typeLabel = color.charAt(0).toUpperCase() + color.slice(1);
  const baseLabel = `${typeLabel} notification: ${title}`;
  
  if (description) {
    return `${baseLabel}. ${description}`;
  }
  
  return baseLabel;
};
