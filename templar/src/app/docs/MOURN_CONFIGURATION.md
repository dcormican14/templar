# Mourn Configuration Guide

The `.mourn` configuration file allows you to customize which Templar providers, themes, and features are included in your project. This enables tree-shaking, reduces bundle size, and gives you fine-grained control over your application's features.

## Table of Contents

- [Quick Start](#quick-start)
- [File Formats](#file-formats)
- [Configuration Schema](#configuration-schema)
- [Provider Configuration](#provider-configuration)
- [Component Configuration](#component-configuration)
- [Build Configuration](#build-configuration)
- [Custom Variables](#custom-variables)
- [Examples](#examples)
- [Migration Guide](#migration-guide)

---

## Quick Start

### 1. Create Configuration File

Copy one of the example files to your project root:

```bash
# JSON format
cp .mourn.example.json .mourn.json

# JavaScript format (supports comments and logic)
cp .mourn.example.js .mourn.js
```

### 2. Update Your App Wrapper

The `RoundTable` provider automatically reads the `.mourn` configuration:

```tsx
import { RoundTable } from '@templar/providers';

function App() {
  return (
    <RoundTable>
      <YourApp />
    </RoundTable>
  );
}
```

### 3. Customize Configuration

Edit your `.mourn.js` or `.mourn.json` file to enable/disable providers and customize settings.

---

## File Formats

Templar supports two configuration formats:

### JSON Format (`.mourn.json`)

Simple, declarative configuration:

```json
{
  "version": "1.0",
  "name": "My Project",
  "providers": {
    "theme": {
      "enabled": true,
      "defaultTheme": "dark"
    }
  }
}
```

### JavaScript Format (`.mourn.js`)

Supports comments, computed values, and conditional logic:

```javascript
module.exports = {
  version: '1.0',
  name: process.env.APP_NAME || 'My Project',
  providers: {
    theme: {
      enabled: true,
      defaultTheme: process.env.NODE_ENV === 'production' ? 'light' : 'dark',
    },
  },
};
```

**Priority**: If both files exist, `.mourn.js` takes precedence.

---

## Configuration Schema

### Root Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `version` | `string` | `'1.0'` | Configuration version (for future compatibility) |
| `name` | `string` | `'Templar Project'` | Project name |
| `providers` | `object` | See below | Provider configurations |
| `components` | `object` | See below | Component configurations |
| `build` | `object` | See below | Build configurations |
| `customVariables` | `object` | `{}` | CSS variable overrides |

---

## Provider Configuration

Control which providers are included and configure their behavior.

### Auth Provider

```typescript
{
  providers: {
    auth: {
      enabled: true,              // Enable/disable provider
      storageKey: 'my-app-auth'   // localStorage key for auth state
    }
  }
}
```

**When to disable**: If your app doesn't need authentication features.

---

### Theme Provider

```typescript
{
  providers: {
    theme: {
      enabled: true,
      defaultTheme: 'system',     // 'light' | 'dark' | 'high-contrast' | etc.
      attribute: 'data-theme',    // HTML attribute to set theme on
      storageKey: 'my-app-theme', // localStorage key
      availableThemes: [          // Limit available themes (optional)
        'light',
        'dark',
        'high-contrast'
      ],
      includeCustomThemes: true   // Include custom theme CSS
    }
  }
}
```

**Available Themes**:
- `light` - Light theme
- `dark` - Dark theme
- `high-contrast` - High contrast theme (accessibility)
- `sepia-light` - Sepia light theme
- `sepia-dark` - Sepia dark theme
- `solarized-dark` - Solarized dark theme
- `valor` - Custom Valor theme
- `valor-dark` - Dark Valor theme
- `system` - Follow system preference
- `auto` - Auto-detect based on time of day

**When to disable**: If your app has a single, fixed theme.

---

### Toast Provider

```typescript
{
  providers: {
    toast: {
      enabled: true,
      maxToasts: 5,                  // Max simultaneous toasts
      defaultDuration: 5000,         // Default duration (ms)
      defaultPosition: 'top-right'   // Default position
    }
  }
}
```

**Positions**: `top-left` | `top-right` | `top-center` | `bottom-left` | `bottom-right` | `bottom-center`

**When to disable**: If you're using a different notification library.

---

### Loading Provider

```typescript
{
  providers: {
    loading: {
      enabled: true,
      showGlobalSpinner: true,    // Show global loading overlay
      minLoadingTime: 300         // Minimum loading time (prevents flashing)
    }
  }
}
```

**When to disable**: If you're managing loading states differently.

---

### Modal Provider

```typescript
{
  providers: {
    modal: {
      enabled: true,
      maxModals: 3,                  // Max stacked modals
      closeOnOverlayClick: true,     // Close on overlay click
      closeOnEscape: true            // Close on Escape key
    }
  }
}
```

**When to disable**: If you're using a different modal library.

---

### Settings Provider

```typescript
{
  providers: {
    settings: {
      enabled: true,
      storageKey: 'my-app-settings',
      defaultSettings: {
        language: 'en',
        notifications: {
          enabled: true,
          sound: true,
          desktop: false
        },
        appearance: {
          animations: true,
          reducedMotion: false,
          fontSize: 'md'  // 'sm' | 'md' | 'lg'
        }
      }
    }
  }
}
```

**When to disable**: If you're managing user settings differently.

---

## Component Configuration

Control which components are included in your build.

```typescript
{
  components: {
    // Include only specific components (optional)
    include: ['Button', 'Card', 'Input', 'Dropdown'],

    // Exclude specific components (optional)
    exclude: ['FallingLeaves'],

    // Include animation variants
    includeAnimations: true,      // parallax, typewriter, isometric

    // Include glassmorphic variants
    includeGlassmorphic: true
  }
}
```

**Tree-shaking**: When `include` is specified, only those components are bundled. When `exclude` is specified, all except those are bundled.

**Bundle Impact**:
- Disabling animations: ~15KB savings
- Disabling glassmorphic: ~5KB savings
- Excluding unused components: Varies by component

---

## Build Configuration

Optimize build output and prevent CSS conflicts.

```typescript
{
  build: {
    treeShake: true,              // Remove unused components
    includeCSSVariables: true,    // Include CSS variable definitions
    sourceMaps: false,            // Generate source maps
    cssPrefix: 'tpl-'             // Prefix CSS classes (prevents conflicts)
  }
}
```

**CSS Prefix Example**:
```css
/* Without prefix */
.button { ... }

/* With prefix 'tpl-' */
.tpl-button { ... }
```

---

## Custom Variables

Override default CSS variables to customize theme colors.

```typescript
{
  customVariables: {
    // Brand colors
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    destructive: '#ef4444',
    info: '#06b6d4',

    // Background colors
    background: '#ffffff',
    foreground: '#000000',

    // Spacing and sizing
    borderRadius: '8px',
    spacingUnit: '4px',

    // Typography
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
  }
}
```

**Available Variables**: See [CSS_VARIABLES.md](./CSS_VARIABLES.md) for complete list.

---

## Examples

### Minimal Configuration

Disable all providers except theme:

```javascript
module.exports = {
  providers: {
    auth: { enabled: false },
    toast: { enabled: false },
    loading: { enabled: false },
    modal: { enabled: false },
    settings: { enabled: false },
    theme: {
      enabled: true,
      defaultTheme: 'light',
      availableThemes: ['light', 'dark'],
    },
  },
};
```

### Dashboard Application

```javascript
module.exports = {
  name: 'Analytics Dashboard',
  providers: {
    auth: {
      enabled: true,
      storageKey: 'dashboard-auth',
    },
    theme: {
      enabled: true,
      defaultTheme: 'dark',
      availableThemes: ['light', 'dark'],
    },
    toast: {
      enabled: true,
      defaultPosition: 'bottom-right',
    },
    loading: {
      enabled: true,
      showGlobalSpinner: true,
    },
  },
  components: {
    include: ['Button', 'Card', 'Dropdown', 'ProgressIndicator'],
    includeAnimations: false, // Disable for performance
  },
  customVariables: {
    primary: '#6366f1',
    background: '#0f172a',
  },
};
```

### Marketing Website

```javascript
module.exports = {
  name: 'Marketing Site',
  providers: {
    auth: { enabled: false },
    modal: { enabled: false },
    settings: { enabled: false },
    theme: {
      enabled: true,
      defaultTheme: 'light',
      availableThemes: ['light'], // Single theme only
    },
  },
  components: {
    include: ['Button', 'Card', 'Badge'],
    includeAnimations: true,      // Enable for marketing appeal
    includeGlassmorphic: true,
  },
};
```

### Accessibility-First Application

```javascript
module.exports = {
  providers: {
    theme: {
      enabled: true,
      defaultTheme: 'high-contrast',
      availableThemes: ['high-contrast', 'light', 'dark'],
    },
    settings: {
      enabled: true,
      defaultSettings: {
        appearance: {
          animations: false,
          reducedMotion: true,
          fontSize: 'lg',
        },
      },
    },
  },
  components: {
    includeAnimations: false,  // Respect reduced motion preference
  },
};
```

---

## Migration Guide

### From Manual Configuration to .mourn

**Before** (ClientProviderWrapper.tsx):
```tsx
<RoundTable
  config={{
    theme: {
      defaultTheme: 'system',
      storageKey: 'templar-theme',
    },
    auth: {
      storageKey: 'templar-auth',
    },
  }}
>
  {children}
</RoundTable>
```

**After** (.mourn.js):
```javascript
module.exports = {
  providers: {
    theme: {
      enabled: true,
      defaultTheme: 'system',
      storageKey: 'templar-theme',
    },
    auth: {
      enabled: true,
      storageKey: 'templar-auth',
    },
  },
};
```

```tsx
// Configuration now read automatically
<RoundTable>
  {children}
</RoundTable>
```

### Programmatic Override

You can still provide config programmatically to override `.mourn` file:

```tsx
<RoundTable
  config={{
    providers: {
      theme: { defaultTheme: 'dark' }
    }
  }}
>
  {children}
</RoundTable>
```

---

## Hooks and Utilities

### useEnvironment

Access the complete environment configuration:

```tsx
import { useEnvironment } from '@templar/providers';

function MyComponent() {
  const { config, isLoading, error, reload } = useEnvironment();

  if (isLoading) return <div>Loading configuration...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>App name: {config.name}</div>;
}
```

### useMournConfig

Access just the configuration object:

```tsx
import { useMournConfig } from '@templar/providers';

function MyComponent() {
  const config = useMournConfig();

  return <div>Theme: {config.providers.theme.defaultTheme}</div>;
}
```

### useProviderEnabled

Check if a provider is enabled:

```tsx
import { useProviderEnabled } from '@templar/providers';

function MyComponent() {
  const authEnabled = useProviderEnabled('auth');

  if (!authEnabled) {
    return <div>Authentication disabled</div>;
  }

  return <LoginButton />;
}
```

### useProviderConfig

Get configuration for a specific provider:

```tsx
import { useProviderConfig } from '@templar/providers';

function MyComponent() {
  const themeConfig = useProviderConfig('theme');

  return <div>Available themes: {themeConfig.availableThemes?.join(', ')}</div>;
}
```

---

## Best Practices

### 1. Use JavaScript Format for Dynamic Configuration

```javascript
// .mourn.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  providers: {
    theme: {
      defaultTheme: isProd ? 'light' : 'dark',
    },
    loading: {
      showGlobalSpinner: !isProd, // Hide in production
    },
  },
  build: {
    sourceMaps: !isProd,
  },
};
```

### 2. Version Control

Add `.mourn.json` or `.mourn.js` to version control, but create environment-specific overrides:

```javascript
// .mourn.development.js
module.exports = {
  ...require('./.mourn.js'),
  build: {
    sourceMaps: true,
  },
};
```

### 3. Document Custom Variables

```javascript
module.exports = {
  customVariables: {
    // Brand colors from design system
    primary: '#3b82f6',    // Brand blue
    secondary: '#8b5cf6',  // Brand purple

    // Accessibility requirement: AA contrast ratio
    background: '#ffffff',
    foreground: '#000000',
  },
};
```

### 4. Progressive Enhancement

Start with all providers enabled, then disable as needed:

```javascript
// Start
{ providers: { /* all enabled */ } }

// After audit
{
  providers: {
    auth: { enabled: false },  // Not using auth
    modal: { enabled: false }, // Using custom modal
  }
}
```

---

## Troubleshooting

### Configuration Not Loading

**Issue**: Changes to `.mourn` file don't take effect.

**Solutions**:
1. Restart development server
2. Clear browser cache
3. Check file is in project root (not `/src`)
4. Verify JSON syntax with linter

### Provider Not Available

**Issue**: `useAuth` throws "must be used within provider" error.

**Solutions**:
1. Check `providers.auth.enabled` is `true`
2. Ensure `<RoundTable>` wraps your app
3. Verify provider isn't disabled in `.mourn`

### TypeScript Errors

**Issue**: TypeScript doesn't recognize custom config properties.

**Solution**: Ensure types are imported:
```typescript
import type { MournConfig } from '@templar/providers';

const config: MournConfig = {
  // ... your config
};
```

---

## References

- [Provider Documentation](./PROVIDERS.md)
- [CSS Variables](./CSS_VARIABLES.md)
- [Component Design Standards](./COMPONENT_DESIGN_STANDARDS.md)
- [Theme System](./THEME_SYSTEM.md)
