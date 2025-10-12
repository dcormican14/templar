/**
 * Configuration Reader Utility
 *
 * This module handles reading and parsing the .mourn configuration.
 * In Next.js/browser environments, configuration should be provided via:
 * 1. Direct import of mourn.config.ts/js
 * 2. window.__MOURN_CONFIG__ object
 * 3. Passed directly to RoundTable component
 */

import type { MournConfig } from './mourn.types';
import { DEFAULT_MOURN_CONFIG, mergeMournConfig, isMournConfig } from './mourn.types';

/**
 * Global configuration storage
 * Can be set via setGlobalMournConfig() or window.__MOURN_CONFIG__
 */
let globalConfig: Required<MournConfig> | null = null;

/**
 * Set the global mourn configuration
 * This should be called in your app's entry point or mourn.config.ts file
 *
 * @example
 * ```ts
 * // mourn.config.ts
 * import { setGlobalMournConfig } from '@templar/environment';
 *
 * setGlobalMournConfig({
 *   providers: {
 *     theme: { defaultTheme: 'dark' }
 *   }
 * });
 * ```
 */
export function setGlobalMournConfig(config: Partial<MournConfig>): void {
  globalConfig = mergeMournConfig(config);
}

/**
 * Get the currently loaded global configuration
 * Returns null if no configuration has been set
 */
export function getGlobalMournConfig(): Required<MournConfig> | null {
  return globalConfig;
}

/**
 * Clear the global configuration
 * Useful for testing or resetting state
 */
export function clearGlobalMournConfig(): void {
  globalConfig = null;
}

/**
 * Attempts to read the .mourn configuration
 *
 * Priority order:
 * 1. Explicitly set global config (via setGlobalMournConfig)
 * 2. window.__MOURN_CONFIG__ (for browser injection)
 * 3. Default configuration
 *
 * @returns Parsed and validated MournConfig
 */
export async function readMournConfig(): Promise<Required<MournConfig>> {
  try {
    // 1. Check if global config has been set
    if (globalConfig) {
      return globalConfig;
    }

    // 2. Check browser environment for window.__MOURN_CONFIG__
    if (typeof window !== 'undefined') {
      const browserConfig = (window as any).__MOURN_CONFIG__;

      if (browserConfig && isMournConfig(browserConfig)) {
        globalConfig = mergeMournConfig(browserConfig);
        return globalConfig;
      }
    }

    // 3. Return defaults
    if (!globalConfig) {
      console.info('[Templar] No .mourn configuration provided. Using defaults.');
      globalConfig = DEFAULT_MOURN_CONFIG;
    }

    return globalConfig;
  } catch (error) {
    console.error('[Templar] Error reading .mourn configuration:', error);
    return DEFAULT_MOURN_CONFIG;
  }
}

/**
 * Synchronous version of readMournConfig
 * Returns currently loaded config or defaults
 */
export function readMournConfigSync(): Required<MournConfig> {
  if (globalConfig) {
    return globalConfig;
  }

  if (typeof window !== 'undefined') {
    const browserConfig = (window as any).__MOURN_CONFIG__;

    if (browserConfig && isMournConfig(browserConfig)) {
      globalConfig = mergeMournConfig(browserConfig);
      return globalConfig;
    }
  }

  globalConfig = DEFAULT_MOURN_CONFIG;
  return globalConfig;
}

/**
 * Validates a MournConfig object
 *
 * @param config - Configuration to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateMournConfig(config: any): string[] {
  const errors: string[] = [];

  if (!isMournConfig(config)) {
    errors.push('Invalid configuration format');
    return errors;
  }

  // Validate version
  if (config.version && typeof config.version !== 'string') {
    errors.push('version must be a string');
  }

  // Validate providers
  if (config.providers) {
    const validProviders = ['auth', 'theme', 'toast', 'loading', 'modal', 'settings'];

    Object.keys(config.providers).forEach((key) => {
      if (!validProviders.includes(key)) {
        errors.push(`Unknown provider: ${key}`);
      }
    });

    // Validate theme config
    if (config.providers.theme?.defaultTheme) {
      const validThemes = [
        'light',
        'dark',
        'high-contrast',
        'sepia-light',
        'sepia-dark',
        'solarized-dark',
        'valor',
        'valor-dark',
        'system',
        'auto',
      ];

      if (!validThemes.includes(config.providers.theme.defaultTheme)) {
        errors.push(`Invalid theme: ${config.providers.theme.defaultTheme}`);
      }
    }

    // Validate numeric values
    if (config.providers.toast?.maxToasts !== undefined) {
      if (typeof config.providers.toast.maxToasts !== 'number' || config.providers.toast.maxToasts < 1) {
        errors.push('toast.maxToasts must be a positive number');
      }
    }

    if (config.providers.toast?.defaultDuration !== undefined) {
      if (typeof config.providers.toast.defaultDuration !== 'number' || config.providers.toast.defaultDuration < 0) {
        errors.push('toast.defaultDuration must be a non-negative number');
      }
    }

    if (config.providers.modal?.maxModals !== undefined) {
      if (typeof config.providers.modal.maxModals !== 'number' || config.providers.modal.maxModals < 1) {
        errors.push('modal.maxModals must be a positive number');
      }
    }
  }

  return errors;
}

/**
 * Pretty prints a MournConfig object for debugging
 */
export function debugMournConfig(config: MournConfig): void {
  console.group('[Templar] Configuration');
  console.log('Version:', config.version);
  console.log('Name:', config.name);

  console.group('Providers');
  Object.entries(config.providers || {}).forEach(([name, providerConfig]) => {
    console.log(`${name}:`, providerConfig);
  });
  console.groupEnd();

  if (config.components) {
    console.log('Components:', config.components);
  }

  if (config.build) {
    console.log('Build:', config.build);
  }

  if (config.customVariables && Object.keys(config.customVariables).length > 0) {
    console.log('Custom Variables:', config.customVariables);
  }

  console.groupEnd();
}
