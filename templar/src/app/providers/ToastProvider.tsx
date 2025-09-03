'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from '../components/atoms';
import type { NotificationAction } from '../components/atoms/Notification/Notification.types';

export type ToastType = 'primary' | 'secondary' | 'warning' | 'destructive' | 'success' | 'default' | 'inverted' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: string; // Flexible to support both legacy and new variants
    disabled?: boolean;
  }>;
  showIcon?: boolean;
  dismissible?: boolean;
  showProgress?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  primary: (title: string, description?: string) => string;
  secondary: (title: string, description?: string) => string;
  destructive: (title: string, description?: string) => string;
  inverted: (title: string, description?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
}

export function ToastProvider({ 
  children, 
  maxToasts = 5,
  defaultDuration = 7000 
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      showIcon: true,
      dismissible: true,
      showProgress: false,
      ...toast,
      id,
      duration: toast.duration ?? defaultDuration,
    };

    setToasts(current => {
      const updated = [...current, newToast];
      // Remove oldest toasts if we exceed maxToasts
      if (updated.length > maxToasts) {
        return updated.slice(-maxToasts);
      }
      return updated;
    });

    // Auto-remove toast after duration (handled by Notification component now)
    // if (newToast.duration && newToast.duration > 0) {
    //   setTimeout(() => {
    //     removeToast(id);
    //   }, newToast.duration);
    // }

    return id;
  }, [defaultDuration, maxToasts, removeToast]);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, description?: string) => {
    return addToast({ type: 'success', title, description });
  }, [addToast]);

  const error = useCallback((title: string, description?: string) => {
    return addToast({ type: 'destructive', title, description });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string) => {
    return addToast({ type: 'warning', title, description });
  }, [addToast]);

  const info = useCallback((title: string, description?: string) => {
    return addToast({ type: 'primary', title, description });
  }, [addToast]);

  const primary = useCallback((title: string, description?: string) => {
    return addToast({ type: 'primary', title, description });
  }, [addToast]);

  const secondary = useCallback((title: string, description?: string) => {
    return addToast({ type: 'secondary', title, description });
  }, [addToast]);

  const destructive = useCallback((title: string, description?: string) => {
    return addToast({ type: 'destructive', title, description });
  }, [addToast]);

  const inverted = useCallback((title: string, description?: string) => {
    return addToast({ type: 'inverted', title, description });
  }, [addToast]);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
    primary,
    secondary,
    destructive,
    inverted,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  // Map legacy action variants to UniversalVariant
  const mapActionVariant = (variant?: string): 'solid' | 'ghost' | 'outline' => {
    switch (variant) {
      case 'primary':
      case 'secondary': 
      case 'success':
      case 'warning':
      case 'destructive':
      case 'info':
        return 'solid';
      case 'ghost':
        return 'ghost';
      case 'outline':
      default:
        return 'outline';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map((toast) => (
        <Notification
          key={toast.id}
          id={toast.id}
          color={toast.type === 'default' ? 'primary' : 
                 toast.type === 'inverted' ? 'secondary' : 
                 toast.type === 'info' ? 'info' :
                 toast.type}
          title={toast.title}
          description={toast.description}
          duration={toast.duration || undefined}
          actions={toast.actions?.map(action => ({
            label: action.label,
            onClick: action.onClick,
            variant: mapActionVariant(action.variant),
            disabled: action.disabled
          })) as NotificationAction[] | undefined}
          showIcon={toast.showIcon}
          dismissible={toast.dismissible}
          showProgress={toast.showProgress}
          onDismiss={() => removeToast(toast.id)}
          style={{
            minWidth: '320px',
            maxWidth: '400px'
          }}
        />
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
