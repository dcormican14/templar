/**
 * Mourn Configuration Types
 *
 * These types define the schema for the .mourn configuration file,
 * which allows users to customize which providers and themes are
 * included in their Templar project.
 */

export type ThemeName =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'sepia-light'
  | 'sepia-dark'
  | 'solarized-dark'
  | 'valor'
  | 'valor-dark'
  | 'system'
  | 'auto';

export type ProviderName =
  | 'auth'
  | 'theme'
  | 'toast'
  | 'loading'
  | 'modal'
  | 'settings';

/**
 * Configuration for the Authentication Provider
 */
export interface AuthProviderConfig {
  /**
   * Whether to enable the Auth provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Storage key for auth state persistence
   * @default 'templar-auth'
   */
  storageKey?: string;
}

/**
 * Configuration for the Theme Provider
 */
export interface ThemeProviderConfig {
  /**
   * Whether to enable the Theme provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Default theme to use on first load
   * @default 'system'
   */
  defaultTheme?: ThemeName;

  /**
   * HTML attribute to set theme on (e.g., 'data-theme', 'class')
   * @default 'data-theme'
   */
  attribute?: string;

  /**
   * Storage key for theme preference persistence
   * @default 'templar-theme'
   */
  storageKey?: string;

  /**
   * List of themes to make available
   * If not specified, all themes are available
   */
  availableThemes?: ThemeName[];

  /**
   * Whether to include custom theme CSS
   * @default true
   */
  includeCustomThemes?: boolean;
}

/**
 * Configuration for the Toast Provider
 */
export interface ToastProviderConfig {
  /**
   * Whether to enable the Toast provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Maximum number of toasts to display simultaneously
   * @default 5
   */
  maxToasts?: number;

  /**
   * Default duration for toasts in milliseconds
   * @default 5000
   */
  defaultDuration?: number;

  /**
   * Default position for toasts
   * @default 'top-right'
   */
  defaultPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

/**
 * Configuration for the Loading Provider
 */
export interface LoadingProviderConfig {
  /**
   * Whether to enable the Loading provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether to show a global loading spinner
   * @default true
   */
  showGlobalSpinner?: boolean;

  /**
   * Minimum loading time in milliseconds (prevents flash)
   * @default 300
   */
  minLoadingTime?: number;
}

/**
 * Configuration for the Modal Provider
 */
export interface ModalProviderConfig {
  /**
   * Whether to enable the Modal provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Maximum number of modals that can be stacked
   * @default 3
   */
  maxModals?: number;

  /**
   * Whether modals should close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether modals should close on escape key
   * @default true
   */
  closeOnEscape?: boolean;
}

/**
 * Configuration for the Settings Provider
 */
export interface SettingsProviderConfig {
  /**
   * Whether to enable the Settings provider
   * @default true
   */
  enabled?: boolean;

  /**
   * Storage key for settings persistence
   * @default 'templar-settings'
   */
  storageKey?: string;

  /**
   * Default settings to use
   */
  defaultSettings?: {
    language?: string;
    notifications?: {
      enabled?: boolean;
      sound?: boolean;
      desktop?: boolean;
    };
    appearance?: {
      animations?: boolean;
      reducedMotion?: boolean;
      fontSize?: 'sm' | 'md' | 'lg';
    };
  };
}

/**
 * Component-specific configurations
 */
export interface ComponentConfig {
  /**
   * Components to include in the build
   * If not specified, all components are included
   */
  include?: string[];

  /**
   * Components to exclude from the build
   */
  exclude?: string[];

  /**
   * Whether to include animation variants
   * @default true
   */
  includeAnimations?: boolean;

  /**
   * Whether to include glassmorphic variants
   * @default true
   */
  includeGlassmorphic?: boolean;
}

/**
 * Build and optimization configurations
 */
export interface BuildConfig {
  /**
   * Whether to tree-shake unused components
   * @default true
   */
  treeShake?: boolean;

  /**
   * Whether to include CSS variables
   * @default true
   */
  includeCSSVariables?: boolean;

  /**
   * Whether to include source maps
   * @default false
   */
  sourceMaps?: boolean;

  /**
   * Prefix for CSS class names (for avoiding conflicts)
   */
  cssPrefix?: string;
}

/**
 * Main Mourn Configuration
 * This is the root configuration object for .mourn files
 */
export interface MournConfig {
  /**
   * Configuration version (for future compatibility)
   * @default '1.0'
   */
  version?: string;

  /**
   * Project name
   */
  name?: string;

  /**
   * Provider configurations
   */
  providers?: {
    auth?: AuthProviderConfig;
    theme?: ThemeProviderConfig;
    toast?: ToastProviderConfig;
    loading?: LoadingProviderConfig;
    modal?: ModalProviderConfig;
    settings?: SettingsProviderConfig;
  };

  /**
   * Component configurations
   */
  components?: ComponentConfig;

  /**
   * Build configurations
   */
  build?: BuildConfig;

  /**
   * Custom CSS variables to override
   */
  customVariables?: Record<string, string>;
}

/**
 * Default configuration used when no .mourn file is present
 */
export const DEFAULT_MOURN_CONFIG: Required<MournConfig> = {
  version: '1.0',
  name: 'Templar Project',
  providers: {
    auth: {
      enabled: true,
      storageKey: 'templar-auth',
    },
    theme: {
      enabled: true,
      defaultTheme: 'system',
      attribute: 'data-theme',
      storageKey: 'templar-theme',
      includeCustomThemes: true,
    },
    toast: {
      enabled: true,
      maxToasts: 5,
      defaultDuration: 5000,
      defaultPosition: 'top-right',
    },
    loading: {
      enabled: true,
      showGlobalSpinner: true,
      minLoadingTime: 300,
    },
    modal: {
      enabled: true,
      maxModals: 3,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    },
    settings: {
      enabled: true,
      storageKey: 'templar-settings',
      defaultSettings: {
        language: 'en',
        notifications: {
          enabled: true,
          sound: true,
          desktop: false,
        },
        appearance: {
          animations: true,
          reducedMotion: false,
          fontSize: 'md',
        },
      },
    },
  },
  components: {
    includeAnimations: true,
    includeGlassmorphic: true,
  },
  build: {
    treeShake: true,
    includeCSSVariables: true,
    sourceMaps: false,
  },
  customVariables: {},
};

/**
 * Type guard to check if a value is a valid MournConfig
 */
export function isMournConfig(value: any): value is MournConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    (!value.version || typeof value.version === 'string') &&
    (!value.name || typeof value.name === 'string')
  );
}

/**
 * Utility to merge user config with defaults
 */
export function mergeMournConfig(
  userConfig: Partial<MournConfig>
): Required<MournConfig> {
  return {
    version: userConfig.version ?? DEFAULT_MOURN_CONFIG.version,
    name: userConfig.name ?? DEFAULT_MOURN_CONFIG.name,
    providers: {
      auth: {
        ...DEFAULT_MOURN_CONFIG.providers.auth,
        ...userConfig.providers?.auth,
      },
      theme: {
        ...DEFAULT_MOURN_CONFIG.providers.theme,
        ...userConfig.providers?.theme,
      },
      toast: {
        ...DEFAULT_MOURN_CONFIG.providers.toast,
        ...userConfig.providers?.toast,
      },
      loading: {
        ...DEFAULT_MOURN_CONFIG.providers.loading,
        ...userConfig.providers?.loading,
      },
      modal: {
        ...DEFAULT_MOURN_CONFIG.providers.modal,
        ...userConfig.providers?.modal,
      },
      settings: {
        ...DEFAULT_MOURN_CONFIG.providers.settings,
        ...userConfig.providers?.settings,
        defaultSettings: {
          ...DEFAULT_MOURN_CONFIG.providers.settings?.defaultSettings,
          ...userConfig.providers?.settings?.defaultSettings,
        },
      },
    },
    components: {
      ...DEFAULT_MOURN_CONFIG.components,
      ...userConfig.components,
    },
    build: {
      ...DEFAULT_MOURN_CONFIG.build,
      ...userConfig.build,
    },
    customVariables: {
      ...DEFAULT_MOURN_CONFIG.customVariables,
      ...userConfig.customVariables,
    },
  };
}
