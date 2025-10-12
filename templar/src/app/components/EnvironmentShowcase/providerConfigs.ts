export function getProviderDocumentation(providerName: string): string {
  const docs: Record<string, string> = {
    '.mourn Configuration': `## Overview
The \`.mourn\` configuration system allows you to customize which Templar providers and features are included in your project. This enables tree-shaking, reduces bundle size, and provides fine-grained control over your application's functionality.

## Configuration Flow

### 1. Create Configuration File
Create \`mourn.config.ts\` in your \`src/\` directory:

\`\`\`typescript
// src/mourn.config.ts
import { setGlobalMournConfig } from '@templar/environment';

setGlobalMournConfig({
  providers: {
    theme: {
      enabled: true,
      defaultTheme: 'dark'
    },
    auth: {
      enabled: false  // Disable if not needed
    }
  }
});
\`\`\`

### 2. Import Configuration Early
Import the config file at the top of your app entry point:

\`\`\`tsx
// app/layout.tsx or _app.tsx
import './mourn.config';  // Import first!
import { RoundTable } from '@templar/providers';

export default function RootLayout({ children }) {
  return (
    <RoundTable>
      {children}
    </RoundTable>
  );
}
\`\`\`

### 3. Configuration is Loaded
The \`setGlobalMournConfig()\` function sets the global configuration that \`RoundTable\` automatically uses.

## Configuration Priority

1. **Explicitly set** via \`setGlobalMournConfig()\`
2. **Direct props** passed to \`RoundTable\`
3. **Window object** \`window.__MOURN_CONFIG__\`
4. **Default configuration** (all providers enabled)

## What Can You Configure?

### Providers
Enable or disable providers to reduce bundle size:
- \`auth\` - Authentication system
- \`theme\` - Dark mode & themes
- \`toast\` - Notifications
- \`loading\` - Loading states
- \`modal\` - Modals/dialogs
- \`settings\` - User preferences

### Components
Control which components are included:
- \`include\`: Only include specific components
- \`exclude\`: Exclude specific components
- \`includeAnimations\`: Enable/disable animation variants
- \`includeGlassmorphic\`: Enable/disable glassmorphic variants

### Build Options
Optimize your build:
- \`treeShake\`: Remove unused components
- \`includeCSSVariables\`: Include CSS variable definitions
- \`sourceMaps\`: Generate source maps
- \`cssPrefix\`: Prefix CSS classes to avoid conflicts

### Custom Variables
Override theme colors and values:
\`\`\`typescript
customVariables: {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  borderRadius: '8px'
}
\`\`\`

## Configuration Methods

### Method 1: TypeScript Config File (Recommended)
\`\`\`typescript
// mourn.config.ts
import { setGlobalMournConfig } from '@templar/environment';

setGlobalMournConfig({
  providers: {
    theme: { defaultTheme: 'dark' }
  }
});
\`\`\`

### Method 2: Direct RoundTable Props
\`\`\`tsx
<RoundTable
  config={{
    providers: {
      theme: { defaultTheme: 'dark' }
    }
  }}
>
  <App />
</RoundTable>
\`\`\`

### Method 3: Window Object Injection
\`\`\`html
<script>
  window.__MOURN_CONFIG__ = {
    providers: {
      theme: { defaultTheme: 'dark' }
    }
  };
</script>
\`\`\`

## Using Configuration Hooks

### Check if Provider is Enabled
\`\`\`tsx
import { useProviderEnabled } from '@templar/providers';

function Feature() {
  const authEnabled = useProviderEnabled('auth');
  if (!authEnabled) return null;
  return <LoginButton />;
}
\`\`\`

### Access Configuration Values
\`\`\`tsx
import { useMournConfig } from '@templar/providers';

function Info() {
  const config = useMournConfig();
  return <div>Theme: {config.providers.theme.defaultTheme}</div>;
}
\`\`\`

### Get Provider-Specific Config
\`\`\`tsx
import { useProviderConfig } from '@templar/providers';

function ThemeSelector() {
  const themeConfig = useProviderConfig('theme');
  return (
    <select>
      {themeConfig.availableThemes?.map(theme => (
        <option key={theme}>{theme}</option>
      ))}
    </select>
  );
}
\`\`\`

## Environment-Based Configuration

Use environment variables for dynamic configuration:

\`\`\`typescript
const isDev = process.env.NODE_ENV === 'development';

setGlobalMournConfig({
  providers: {
    theme: {
      defaultTheme: process.env.NEXT_PUBLIC_THEME || 'system'
    },
    loading: {
      showGlobalSpinner: isDev  // Only show in development
    }
  },
  build: {
    sourceMaps: isDev
  }
});
\`\`\`

## Benefits

✅ **Smaller Bundles** - Only include what you need
✅ **Type-Safe** - Full TypeScript support
✅ **Flexible** - Multiple configuration methods
✅ **Dynamic** - Environment-based configuration
✅ **Zero Config** - Works with sensible defaults

## Documentation

- **Setup Guide**: [MOURN_SETUP.md](../../../MOURN_SETUP.md)
- **Full Reference**: [docs/MOURN_CONFIGURATION.md](../../docs/MOURN_CONFIGURATION.md)
- **Environment Module**: [environment/README.md](../../environment/README.md)

See the Config tab for complete configuration examples.`,

    ThemeProvider: `## Overview
The ThemeProvider manages theme state and provides real-time theme switching capabilities across your application. It supports multiple built-in themes, system preferences, and automatic time-based theme switching.

## Features
- **Multiple Themes**: 8 built-in themes (Light, Dark, High Contrast, Sepia Light/Dark, Solarized Dark, Valor, Valor Dark)
- **System Integration**: Automatic system preference detection
- **Auto Mode**: Time-based theme switching (dark 6 PM - 6 AM)
- **CSS Variables**: 80+ theme variables for complete customization
- **Persistence**: LocalStorage-based theme persistence
- **Type Safety**: Full TypeScript support with theme type definitions

## Props
- \`defaultTheme\`: Initial theme to use (default: 'system')
- \`attribute\`: HTML attribute to set (default: 'data-theme')
- \`storageKey\`: LocalStorage key for persistence (default: 'templar-theme')

## Hooks
### \`useTheme()\`
Returns the complete theme context:
- \`theme\`: Current theme setting
- \`resolvedTheme\`: Actual theme being applied
- \`setTheme(theme)\`: Set a specific theme
- \`toggleTheme()\`: Toggle between light/dark
- \`cycleTheme()\`: Cycle through all available themes
- \`availableThemes\`: Array of all available themes
- \`getCSSVariable(name)\`: Get specific CSS variable value
- \`themeVariables\`: Object containing all theme variables

### \`useCSSVariables()\`
Returns an object with all CSS variables for direct access:
\`\`\`tsx
const cssVars = useCSSVariables();
// Access: cssVars.primary, cssVars.background, etc.
\`\`\`

## Available Themes
- \`light\`: Default light theme
- \`dark\`: Default dark theme
- \`high-contrast\`: High contrast for accessibility
- \`sepia-light\`: Warm sepia light theme
- \`sepia-dark\`: Warm sepia dark theme
- \`solarized-dark\`: Solarized dark color scheme
- \`valor\`: Custom valor light theme
- \`valor-dark\`: Custom valor dark theme
- \`system\`: Follow system preferences
- \`auto\`: Time-based automatic switching

## CSS Variables
All theme colors are exposed as CSS variables:
- Base: \`--background\`, \`--foreground\`, \`--border\`
- Colors: \`--primary\`, \`--secondary\`, \`--success\`, \`--warning\`, \`--destructive\`, \`--info\`
- Variants: Each color has hover, accent, shadow, disabled, border, and font variants
- Shadows: \`--shadow-sm\`, \`--shadow\`, \`--shadow-md\`, \`--shadow-lg\`

## Usage Examples
See the Config tab for implementation examples.`,

    AuthProvider: `## Overview
The AuthProvider manages authentication state, user sessions, and provides methods for login, logout, and registration. It handles token storage and automatic session restoration.

## Features
- **Session Management**: Automatic session persistence and restoration
- **User State**: Centralized user state management
- **Token Handling**: Secure token storage and retrieval
- **Loading States**: Built-in loading indicators for auth operations
- **Type Safety**: Full TypeScript support for user objects

## Props
- \`storageKey\`: LocalStorage key for session persistence (default: 'templar-auth')

## Hook: \`useAuth()\`
Returns the authentication context:
- \`user\`: Current user object or null
- \`isAuthenticated\`: Boolean indicating auth status
- \`isLoading\`: Boolean indicating loading state
- \`login(email, password)\`: Login method
- \`logout()\`: Logout method
- \`register(userData)\`: Registration method
- \`updateUser(userData)\`: Update user profile

## User Type
\`\`\`tsx
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}
\`\`\`

## Usage Examples
See the Config tab for implementation examples.`,

    ToastProvider: `## Overview
The ToastProvider manages toast notifications with support for multiple simultaneous toasts, auto-dismiss, and position management. It provides a clean API for showing success, error, warning, and info messages.

## Features
- **Multiple Toasts**: Support for multiple simultaneous notifications
- **Auto Dismiss**: Configurable auto-dismiss duration
- **Toast Types**: Success, error, warning, info, and default
- **Action Buttons**: Optional action buttons in toasts
- **Queue Management**: Automatic queue management for max toasts
- **Accessibility**: Screen reader announcements and keyboard support

## Props
- \`maxToasts\`: Maximum number of simultaneous toasts (default: 5)
- \`defaultDuration\`: Default duration in ms (default: 5000)

## Hook: \`useToast()\`
Returns toast management methods:
- \`showToast(message, options)\`: Show a toast notification
- \`success(message, options)\`: Show success toast
- \`error(message, options)\`: Show error toast
- \`warning(message, options)\`: Show warning toast
- \`info(message, options)\`: Show info toast
- \`dismiss(id)\`: Dismiss specific toast
- \`dismissAll()\`: Dismiss all toasts

## Toast Options
\`\`\`tsx
interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}
\`\`\`

## Usage Examples
See the Config tab for implementation examples.`,

    LoadingProvider: `## Overview
The LoadingProvider manages global loading states and provides utilities for async operations. It includes support for operation tracking, error handling, and global loading indicators.

## Features
- **Global Loading**: Application-wide loading state management
- **Operation Tracking**: Track individual async operations
- **Error Handling**: Built-in error state management
- **Loading Indicators**: Optional global spinner display
- **Async Utilities**: Helper hooks for async operations

## Props
- \`showGlobalSpinner\`: Show global loading spinner (default: false)

## Hooks
### \`useLoading()\`
Returns loading state management:
- \`isLoading\`: Boolean indicating global loading state
- \`startLoading(operationId?)\`: Start loading for operation
- \`stopLoading(operationId?)\`: Stop loading for operation
- \`operations\`: Map of active operations
- \`error\`: Current error state
- \`setError(error)\`: Set error state
- \`clearError()\`: Clear error state

### \`useAsyncOperation()\`
Returns helper for managing async operations:
- \`execute(asyncFn, operationId?)\`: Execute async function with loading/error handling
- \`isLoading\`: Loading state for this operation
- \`error\`: Error state for this operation

## Usage Examples
See the Config tab for implementation examples.`,

    ModalProvider: `## Overview
The ModalProvider manages modal dialogs with support for multiple stacked modals, custom content, and backdrop management. It provides a clean API for showing and dismissing modals programmatically.

## Features
- **Modal Stacking**: Support for multiple stacked modals
- **Custom Content**: Render any React content in modals
- **Backdrop Control**: Configurable backdrop behavior
- **Escape Key**: Close on escape key press
- **Focus Management**: Automatic focus trapping
- **Accessibility**: Full ARIA support

## Props
- \`maxModals\`: Maximum number of stacked modals (default: 3)

## Hook: \`useModal()\`
Returns modal management methods:
- \`showModal(config)\`: Show a modal with custom content
- \`hideModal(id)\`: Hide specific modal
- \`hideAll()\`: Hide all modals
- \`modals\`: Array of active modals

## Modal Config
\`\`\`tsx
interface ModalConfig {
  id?: string;
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}
\`\`\`

## Usage Examples
See the Config tab for implementation examples.`,

    SettingsProvider: `## Overview
The SettingsProvider manages application settings including language, notifications, appearance preferences, and custom settings. It provides multiple specialized hooks for different settings categories.

## Features
- **Settings Persistence**: Automatic LocalStorage persistence
- **Type Safety**: Full TypeScript support
- **Multiple Categories**: Language, notifications, appearance, and custom
- **Default Values**: Configurable default settings
- **Live Updates**: Real-time settings updates across components

## Props
- \`storageKey\`: LocalStorage key for persistence (default: 'templar-settings')
- \`defaultSettings\`: Initial default settings object

## Hooks
### \`useSettings()\`
Returns complete settings management:
- \`settings\`: All settings object
- \`updateSettings(partial)\`: Update settings
- \`resetSettings()\`: Reset to defaults
- \`getSetting(key)\`: Get specific setting
- \`setSetting(key, value)\`: Set specific setting

### \`useLanguage()\`
Language-specific settings:
- \`language\`: Current language code
- \`setLanguage(lang)\`: Set language
- \`availableLanguages\`: List of available languages

### \`useNotificationSettings()\`
Notification preferences:
- \`notifications\`: Notification settings object
- \`updateNotifications(settings)\`: Update notification settings

### \`useAppearanceSettings()\`
Appearance preferences:
- \`appearance\`: Appearance settings object
- \`updateAppearance(settings)\`: Update appearance settings

## Settings Structure
\`\`\`tsx
interface AppSettings {
  language: string;
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  appearance: {
    compactMode: boolean;
    animations: boolean;
    fontSize: 'sm' | 'md' | 'lg';
  };
  [key: string]: any;
}
\`\`\`

## Usage Examples
See the Config tab for implementation examples.`,

    RoundTable: `## Overview
RoundTable is the unified provider wrapper that combines all Templar providers into a single, easy-to-use component. It creates a complete context ecosystem for modern React applications with proper provider composition and configuration.

## Features
- **All Providers**: Includes Theme, Auth, Toast, Loading, Modal, and Settings providers
- **Single Configuration**: Configure all providers through one config object
- **Proper Ordering**: Providers are composed in the optimal order
- **Type Safety**: Full TypeScript support for all configurations
- **Easy Setup**: One wrapper for your entire app

## Configuration Object
The RoundTable accepts a config object with provider-specific settings:

\`\`\`tsx
interface RoundTableConfig {
  auth?: {
    storageKey?: string;
  };
  theme?: {
    defaultTheme?: Theme;
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
    defaultSettings?: Partial<AppSettings>;
  };
}
\`\`\`

## Provider Composition Order
RoundTable composes providers in this order (outside to inside):
1. SettingsProvider - Application settings
2. ThemeProvider - Theme management
3. AuthProvider - Authentication
4. LoadingProvider - Loading states
5. ToastProvider - Notifications
6. ModalProvider - Modal dialogs

## Benefits
- **Single Import**: Import once, use everywhere
- **Consistent Setup**: Same setup across all projects
- **No Provider Nesting**: Clean, readable app structure
- **Centralized Config**: All provider config in one place
- **Optimal Performance**: Providers ordered for best performance

## Usage Examples
See the Config tab for implementation examples.`,
  };

  return docs[providerName] || '## Documentation not available';
}

export function getProviderConfig(providerName: string): string {
  const configs: Record<string, string> = {
    '.mourn Configuration': `// src/mourn.config.ts
import { setGlobalMournConfig } from '@templar/environment';
import type { MournConfig } from '@templar/environment';

const config: Partial<MournConfig> = {
  version: '1.0',
  name: 'My Templar Project',

  providers: {
    // Disable providers you don't need
    auth: {
      enabled: false,  // Reduces bundle size
    },

    // Configure theme provider
    theme: {
      enabled: true,
      defaultTheme: 'dark',
      availableThemes: ['light', 'dark', 'high-contrast'],
      storageKey: 'my-app-theme',
    },

    // Configure toast notifications
    toast: {
      enabled: true,
      maxToasts: 3,
      defaultDuration: 4000,
      defaultPosition: 'bottom-right',
    },

    // Configure loading provider
    loading: {
      enabled: true,
      showGlobalSpinner: true,
      minLoadingTime: 300,
    },

    // Configure modal provider
    modal: {
      enabled: true,
      maxModals: 2,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    },

    // Configure settings provider
    settings: {
      enabled: true,
      storageKey: 'my-app-settings',
      defaultSettings: {
        language: 'en',
        appearance: {
          animations: true,
          fontSize: 'md',
        },
      },
    },
  },

  components: {
    // Only include specific components (tree-shaking)
    include: ['Button', 'Card', 'Input', 'Dropdown'],

    // Or exclude specific components
    // exclude: ['FallingLeaves'],

    // Control feature variants
    includeAnimations: true,
    includeGlassmorphic: false,  // Reduces bundle size
  },

  build: {
    treeShake: true,
    includeCSSVariables: true,
    sourceMaps: false,
    cssPrefix: 'my-',  // Prefix CSS classes
  },

  customVariables: {
    // Override theme colors
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    borderRadius: '8px',
  },
};

// Set global configuration
setGlobalMournConfig(config);

export default config;

// ---

// Import config in your app entry point
// app/layout.tsx or _app.tsx
import './mourn.config';  // Must be first!
import { RoundTable } from '@templar/providers';

export default function RootLayout({ children }) {
  return (
    <RoundTable>
      {children}
    </RoundTable>
  );
}

// ---

// Using configuration hooks
import {
  useMournConfig,
  useProviderEnabled,
  useProviderConfig
} from '@templar/providers';

function ConfigAwareComponent() {
  // Check if a provider is enabled
  const authEnabled = useProviderEnabled('auth');

  // Get full configuration
  const config = useMournConfig();

  // Get provider-specific config
  const themeConfig = useProviderConfig('theme');

  return (
    <div>
      <p>Auth enabled: {authEnabled ? 'Yes' : 'No'}</p>
      <p>Default theme: {themeConfig.defaultTheme}</p>
      <p>App name: {config.name}</p>
    </div>
  );
}

// ---

// Environment-based configuration
const isDev = process.env.NODE_ENV === 'development';

setGlobalMournConfig({
  providers: {
    theme: {
      defaultTheme: process.env.NEXT_PUBLIC_THEME || 'system',
    },
    loading: {
      showGlobalSpinner: isDev,  // Only in development
    },
  },
  build: {
    sourceMaps: isDev,
  },
});`,

    ThemeProvider: `import { ThemeProvider } from '@templar/providers';

function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="data-theme"
      storageKey="my-app-theme"
    >
      {/* Your app */}
    </ThemeProvider>
  );
}

// Using the theme hook
function ThemedComponent() {
  const { theme, setTheme, toggleTheme, cycleTheme } = useTheme();
  const cssVars = useCSSVariables();

  return (
    <div style={{ background: cssVars.background, color: cssVars.foreground }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={cycleTheme}>Cycle Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
}`,

    AuthProvider: `import { AuthProvider, useAuth } from '@templar/providers';

function App() {
  return (
    <AuthProvider storageKey="my-app-auth">
      {/* Your app */}
    </AuthProvider>
  );
}

// Using the auth hook
function LoginComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={handleLogin}>Login</button>;
}`,

    ToastProvider: `import { ToastProvider, useToast } from '@templar/providers';

function App() {
  return (
    <ToastProvider
      maxToasts={5}
      defaultDuration={5000}
    >
      {/* Your app */}
    </ToastProvider>
  );
}

// Using the toast hook
function NotificationComponent() {
  const { success, error, warning, info, showToast } = useToast();

  return (
    <div>
      <button onClick={() => success('Operation successful!')}>
        Show Success
      </button>
      <button onClick={() => error('Something went wrong!')}>
        Show Error
      </button>
      <button onClick={() => warning('Please be careful!')}>
        Show Warning
      </button>
      <button onClick={() => info('Did you know...')}>
        Show Info
      </button>
      <button onClick={() => showToast('Custom message', {
        duration: 3000,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo clicked')
        }
      })}>
        Show with Action
      </button>
    </div>
  );
}`,

    LoadingProvider: `import { LoadingProvider, useLoading, useAsyncOperation } from '@templar/providers';

function App() {
  return (
    <LoadingProvider showGlobalSpinner={true}>
      {/* Your app */}
    </LoadingProvider>
  );
}

// Using the loading hook
function DataComponent() {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const fetchData = async () => {
    startLoading('fetch-data');
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      // Process data
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      stopLoading('fetch-data');
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

// Using the async operation hook
function AsyncComponent() {
  const { execute, isLoading, error } = useAsyncOperation();

  const handleOperation = () => {
    execute(async () => {
      const response = await fetch('/api/data');
      return response.json();
    });
  };

  return (
    <div>
      <button onClick={handleOperation} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Execute Operation'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}`,

    ModalProvider: `import { ModalProvider, useModal } from '@templar/providers';

function App() {
  return (
    <ModalProvider maxModals={3}>
      {/* Your app */}
    </ModalProvider>
  );
}

// Using the modal hook
function ModalComponent() {
  const { showModal, hideModal, hideAll } = useModal();

  const openSimpleModal = () => {
    showModal({
      title: 'Confirm Action',
      content: (
        <div>
          <p>Are you sure you want to proceed?</p>
          <button onClick={() => hideModal('confirm-modal')}>Cancel</button>
          <button onClick={() => {
            console.log('Confirmed!');
            hideModal('confirm-modal');
          }}>
            Confirm
          </button>
        </div>
      ),
      id: 'confirm-modal',
      size: 'md',
      closeOnBackdrop: true,
      closeOnEscape: true,
    });
  };

  const openCustomModal = () => {
    showModal({
      content: <CustomModalContent />,
      size: 'lg',
      showClose: true,
      onClose: () => console.log('Modal closed'),
    });
  };

  return (
    <div>
      <button onClick={openSimpleModal}>Open Simple Modal</button>
      <button onClick={openCustomModal}>Open Custom Modal</button>
      <button onClick={hideAll}>Close All Modals</button>
    </div>
  );
}`,

    SettingsProvider: `import { SettingsProvider, useSettings, useLanguage } from '@templar/providers';

function App() {
  return (
    <SettingsProvider
      storageKey="my-app-settings"
      defaultSettings={{
        language: 'en',
        notifications: {
          enabled: true,
          email: true,
          push: false,
          sound: true,
        },
        appearance: {
          compactMode: false,
          animations: true,
          fontSize: 'md',
        },
      }}
    >
      {/* Your app */}
    </SettingsProvider>
  );
}

// Using the settings hook
function SettingsComponent() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <div>
      <h3>Settings</h3>
      <label>
        <input
          type="checkbox"
          checked={settings.notifications.enabled}
          onChange={(e) => updateSettings({
            notifications: {
              ...settings.notifications,
              enabled: e.target.checked,
            },
          })}
        />
        Enable Notifications
      </label>
      <button onClick={resetSettings}>Reset to Defaults</button>
    </div>
  );
}

// Using specialized hooks
function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}`,

    RoundTable: `import { RoundTable } from '@templar/providers';

// Basic usage with defaults
function App() {
  return (
    <RoundTable>
      {/* Your entire app */}
    </RoundTable>
  );
}

// With custom configuration
function AppWithConfig() {
  return (
    <RoundTable
      config={{
        theme: {
          defaultTheme: 'dark',
          storageKey: 'my-theme',
        },
        auth: {
          storageKey: 'my-auth',
        },
        toast: {
          maxToasts: 3,
          defaultDuration: 3000,
        },
        loading: {
          showGlobalSpinner: true,
        },
        modal: {
          maxModals: 5,
        },
        settings: {
          storageKey: 'my-settings',
          defaultSettings: {
            language: 'en',
            notifications: {
              enabled: true,
              email: true,
              push: false,
              sound: true,
            },
            appearance: {
              compactMode: false,
              animations: true,
              fontSize: 'md',
            },
          },
        },
      }}
    >
      <YourApp />
    </RoundTable>
  );
}

// Using providers in components
function YourComponent() {
  const { theme, setTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { success, error } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showModal } = useModal();
  const { settings, updateSettings } = useSettings();
  const cssVars = useCSSVariables();

  // All providers are available!

  return (
    <div style={{ background: cssVars.background }}>
      <p>Theme: {theme}</p>
      <p>User: {user?.name || 'Guest'}</p>
      {/* Your component */}
    </div>
  );
}`,
  };

  return configs[providerName] || '// Configuration example not available';
}
