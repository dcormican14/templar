'use client';

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { LoadingProvider } from './LoadingProvider';
import { ModalProvider } from './ModalProvider';
import { SettingsProvider } from './SettingsProvider';

interface RoundTableProps {
  children: React.ReactNode;
  config?: {
    auth?: {
      storageKey?: string;
    };
    theme?: {
      defaultTheme?: 'light' | 'dark' | 'high-contrast' | 'sepia' | 'solarized-dark' | 'system' | 'auto';
      attribute?: string;
      storageKey?: string;
    };
    toast?: {
      maxToasts?: number;
      defaultDuration?: number;
    };
    loading?: {
      showGlobalSpinner?: boolean;
    };
    modal?: {
      maxModals?: number;
    };
    settings?: {
      storageKey?: string;
      defaultSettings?: Partial<any>;
    };
  };
}

/**
 * Combined provider component that wraps your app with all Templar providers.
 * This creates a complete context ecosystem for modern React applications.
 */
export function RoundTable({ children, config = {} }: RoundTableProps) {
  return (
    <SettingsProvider
      storageKey={config.settings?.storageKey}
      defaultSettings={config.settings?.defaultSettings}
    >
      <ThemeProvider
        defaultTheme={config.theme?.defaultTheme}
        attribute={config.theme?.attribute}
        storageKey={config.theme?.storageKey}
      >
        <AuthProvider storageKey={config.auth?.storageKey}>
          <LoadingProvider showGlobalSpinner={config.loading?.showGlobalSpinner}>
            <ToastProvider
              maxToasts={config.toast?.maxToasts}
              defaultDuration={config.toast?.defaultDuration}
            >
              <ModalProvider maxModals={config.modal?.maxModals}>
                {children}
              </ModalProvider>
            </ToastProvider>
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}

// Re-export all providers and hooks for individual use
export { AuthProvider, useAuth } from './AuthProvider';
export { ThemeProvider, useTheme, DarkModeProvider } from './ThemeProvider';
export { ToastProvider, useToast } from './ToastProvider';
export { LoadingProvider, useLoading, useAsyncOperation } from './LoadingProvider';
export { ModalProvider, useModal } from './ModalProvider';
export { 
  SettingsProvider, 
  useSettings, 
  useLanguage, 
  useNotificationSettings, 
  useAppearanceSettings 
} from './SettingsProvider';

// Re-export types
export type { User, AuthContextType } from './AuthProvider';
export type { Theme, ResolvedTheme, ThemeContextType } from './ThemeProvider';
export type { Toast, ToastType } from './ToastProvider';
export type { ModalConfig } from './ModalProvider';
export type { AppSettings } from './SettingsProvider';
