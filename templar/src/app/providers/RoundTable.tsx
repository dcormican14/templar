'use client';

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { LoadingProvider } from './LoadingProvider';
import { ModalProvider } from './ModalProvider';
import { SettingsProvider } from './SettingsProvider';
import { EnvironmentProvider, useMournConfig, useProviderEnabled } from '../environment';
import type { MournConfig } from '../environment';

interface RoundTableProps {
  children: React.ReactNode;
  /**
   * Configuration object (overrides .mourn file if provided)
   */
  config?: Partial<MournConfig>;
  /**
   * Enable debug logging for configuration
   * @default false
   */
  debug?: boolean;
}

/**
 * Inner component that uses the environment context to render providers
 */
function RoundTableInner({ children }: { children: React.ReactNode }) {
  const config = useMournConfig();

  // Check which providers are enabled
  const authEnabled = useProviderEnabled('auth');
  const themeEnabled = useProviderEnabled('theme');
  const toastEnabled = useProviderEnabled('toast');
  const loadingEnabled = useProviderEnabled('loading');
  const modalEnabled = useProviderEnabled('modal');
  const settingsEnabled = useProviderEnabled('settings');

  // Build provider tree based on enabled providers
  let content = children;

  // Wrap with ModalProvider if enabled
  if (modalEnabled && config.providers.modal) {
    content = (
      <ModalProvider
        maxModals={config.providers.modal.maxModals}
      >
        {content}
      </ModalProvider>
    );
  }

  // Wrap with ToastProvider if enabled
  if (toastEnabled && config.providers.toast) {
    content = (
      <ToastProvider
        maxToasts={config.providers.toast.maxToasts}
        defaultDuration={config.providers.toast.defaultDuration}
      >
        {content}
      </ToastProvider>
    );
  }

  // Wrap with LoadingProvider if enabled
  if (loadingEnabled && config.providers.loading) {
    content = (
      <LoadingProvider
        showGlobalSpinner={config.providers.loading.showGlobalSpinner}
      >
        {content}
      </LoadingProvider>
    );
  }

  // Wrap with AuthProvider if enabled
  if (authEnabled && config.providers.auth) {
    content = (
      <AuthProvider storageKey={config.providers.auth.storageKey}>
        {content}
      </AuthProvider>
    );
  }

  // Wrap with ThemeProvider if enabled
  if (themeEnabled && config.providers.theme) {
    content = (
      <ThemeProvider
        defaultTheme={config.providers.theme.defaultTheme}
        attribute={config.providers.theme.attribute}
        storageKey={config.providers.theme.storageKey}
      >
        {content}
      </ThemeProvider>
    );
  }

  // Wrap with SettingsProvider if enabled (outermost)
  if (settingsEnabled && config.providers.settings) {
    content = (
      <SettingsProvider
        storageKey={config.providers.settings.storageKey}
        defaultSettings={config.providers.settings.defaultSettings as any}
      >
        {content}
      </SettingsProvider>
    );
  }

  return <>{content}</>;
}

/**
 * Combined provider component that wraps your app with all Templar providers.
 * This creates a complete context ecosystem for modern React applications.
 *
 * Configuration is loaded from the .mourn file in the project root,
 * or can be provided directly via the config prop.
 *
 * @example
 * ```tsx
 * // Using .mourn file
 * <RoundTable>
 *   <App />
 * </RoundTable>
 *
 * // With override config
 * <RoundTable config={{ providers: { theme: { defaultTheme: 'dark' } } }}>
 *   <App />
 * </RoundTable>
 * ```
 */
export function RoundTable({ children, config, debug = false }: RoundTableProps) {
  return (
    <EnvironmentProvider config={config} debug={debug}>
      <RoundTableInner>{children}</RoundTableInner>
    </EnvironmentProvider>
  );
}
