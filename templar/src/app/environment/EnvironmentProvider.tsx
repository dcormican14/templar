'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { MournConfig } from './mourn.types';
import { DEFAULT_MOURN_CONFIG, mergeMournConfig } from './mourn.types';
import { readMournConfig, debugMournConfig } from './configReader';

interface EnvironmentContextType {
  config: Required<MournConfig>;
  isLoading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

interface EnvironmentProviderProps {
  children: React.ReactNode;
  /**
   * Override configuration (useful for testing or when .mourn file isn't available)
   */
  config?: Partial<MournConfig>;
  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Environment Provider
 *
 * This provider loads and manages the .mourn configuration file,
 * making it available throughout the application.
 */
export function EnvironmentProvider({
  children,
  config: overrideConfig,
  debug = false,
}: EnvironmentProviderProps) {
  const [config, setConfig] = useState<Required<MournConfig>>(
    overrideConfig ? mergeMournConfig(overrideConfig) : DEFAULT_MOURN_CONFIG
  );
  const [isLoading, setIsLoading] = useState(!overrideConfig);
  const [error, setError] = useState<Error | null>(null);

  const loadConfig = async () => {
    if (overrideConfig) {
      // If override config is provided, merge it with defaults
      const merged = mergeMournConfig(overrideConfig);
      setConfig(merged);
      setIsLoading(false);

      if (debug) {
        debugMournConfig(merged);
      }

      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const loadedConfig = await readMournConfig();
      setConfig(loadedConfig);

      if (debug) {
        debugMournConfig(loadedConfig);
      }
    } catch (err) {
      console.error('[Templar] Failed to load .mourn configuration:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading configuration'));
      setConfig(DEFAULT_MOURN_CONFIG);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []); // Only run once on mount

  const contextValue = useMemo(
    () => ({
      config,
      isLoading,
      error,
      reload: loadConfig,
    }),
    [config, isLoading, error]
  );

  return (
    <EnvironmentContext.Provider value={contextValue}>
      {children}
    </EnvironmentContext.Provider>
  );
}

/**
 * Hook to access the environment configuration
 *
 * @throws Error if used outside of EnvironmentProvider
 */
export function useEnvironment(): EnvironmentContextType {
  const context = useContext(EnvironmentContext);

  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }

  return context;
}

/**
 * Hook to access just the configuration (most common use case)
 */
export function useMournConfig(): Required<MournConfig> {
  const { config } = useEnvironment();
  return config;
}

/**
 * Hook to check if a specific provider is enabled
 */
export function useProviderEnabled(providerName: keyof Required<MournConfig>['providers']): boolean {
  const { config } = useEnvironment();
  return config.providers[providerName]?.enabled ?? true;
}

/**
 * Hook to get configuration for a specific provider
 */
export function useProviderConfig<T extends keyof Required<MournConfig>['providers']>(
  providerName: T
): Required<MournConfig>['providers'][T] {
  const { config } = useEnvironment();
  return config.providers[providerName];
}
