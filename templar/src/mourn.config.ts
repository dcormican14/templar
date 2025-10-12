/**
 * Templar Configuration
 *
 * This file configures which providers and features are enabled in your Templar project.
 * Import this file early in your application to set the global configuration.
 */

import { setGlobalMournConfig } from './app/environment';
import type { MournConfig } from './app/environment';

const config: Partial<MournConfig> = {
  version: '1.0',
  name: 'Templar Demo',

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

// Set the global configuration
setGlobalMournConfig(config);

// Export for direct import if needed
export default config;
