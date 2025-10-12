/**
 * Mourn Configuration File (JavaScript format)
 *
 * This file allows you to configure which Templar providers and features
 * are included in your project. You can use either .mourn.js or .mourn.json
 *
 * Copy this file to .mourn.js in your project root and customize as needed.
 */

module.exports = {
  version: '1.0',
  name: 'My Templar Project',

  /**
   * Provider configurations
   * Set enabled: false to exclude a provider from your build
   */
  providers: {
    // Authentication provider
    auth: {
      enabled: true,
      storageKey: 'my-app-auth',
    },

    // Theme provider (dark mode, multiple themes)
    theme: {
      enabled: true,
      defaultTheme: 'system', // 'light' | 'dark' | 'high-contrast' | 'sepia-light' | 'sepia-dark' | 'solarized-dark' | 'valor' | 'valor-dark' | 'system' | 'auto'
      attribute: 'data-theme', // HTML attribute to set (e.g., 'data-theme', 'class')
      storageKey: 'my-app-theme',
      availableThemes: ['light', 'dark', 'high-contrast'], // Limit available themes (optional)
      includeCustomThemes: true, // Include custom theme CSS
    },

    // Toast notification provider
    toast: {
      enabled: true,
      maxToasts: 5, // Maximum simultaneous toasts
      defaultDuration: 5000, // Default duration in milliseconds
      defaultPosition: 'top-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
    },

    // Loading state provider
    loading: {
      enabled: true,
      showGlobalSpinner: true, // Show global loading indicator
      minLoadingTime: 300, // Minimum loading time to prevent flashing
    },

    // Modal provider
    modal: {
      enabled: true,
      maxModals: 3, // Maximum stacked modals
      closeOnOverlayClick: true, // Close modal when clicking overlay
      closeOnEscape: true, // Close modal on escape key
    },

    // Settings provider (user preferences)
    settings: {
      enabled: true,
      storageKey: 'my-app-settings',
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
          fontSize: 'md', // 'sm' | 'md' | 'lg'
        },
      },
    },
  },

  /**
   * Component configurations
   */
  components: {
    // Components to include (leave empty to include all)
    // include: ['Button', 'Card', 'Input'],

    // Components to exclude
    // exclude: ['FallingLeaves'],

    // Include animation variants (parallax, typewriter, isometric)
    includeAnimations: true,

    // Include glassmorphic variants
    includeGlassmorphic: true,
  },

  /**
   * Build configurations
   */
  build: {
    // Tree-shake unused components
    treeShake: true,

    // Include CSS variables
    includeCSSVariables: true,

    // Generate source maps
    sourceMaps: false,

    // CSS class name prefix (to avoid conflicts)
    cssPrefix: 'tpl-',
  },

  /**
   * Custom CSS variables
   * Override default theme colors and values
   */
  customVariables: {
    // Brand colors
    // primary: '#3b82f6',
    // secondary: '#8b5cf6',
    // success: '#10b981',
    // warning: '#f59e0b',
    // destructive: '#ef4444',
    // info: '#06b6d4',

    // Background colors
    // background: '#ffffff',
    // foreground: '#000000',

    // Border radius
    // borderRadius: '8px',

    // Spacing
    // spacingUnit: '4px',
  },
};
