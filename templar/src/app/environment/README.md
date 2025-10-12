# Environment Module

This module provides the `.mourn` configuration system for Templar, allowing users to customize which providers, themes, and features are included in their project.

## Quick Start

```tsx
import { RoundTable } from '@templar/providers';

// Configuration is automatically loaded from .mourn file
function App() {
  return (
    <RoundTable>
      <YourApp />
    </RoundTable>
  );
}
```

## Files

- **mourn.types.ts** - TypeScript types and interfaces for configuration
- **configReader.ts** - Utilities for reading and validating .mourn files
- **EnvironmentProvider.tsx** - React context provider for configuration
- **index.ts** - Public API exports

## Usage

### Reading Configuration

```tsx
import { useMournConfig } from '@templar/providers';

function MyComponent() {
  const config = useMournConfig();

  return <div>{config.name}</div>;
}
```

### Checking Provider Status

```tsx
import { useProviderEnabled } from '@templar/providers';

function ConditionalFeature() {
  const authEnabled = useProviderEnabled('auth');

  if (!authEnabled) return null;

  return <LoginButton />;
}
```

### Accessing Provider Config

```tsx
import { useProviderConfig } from '@templar/providers';

function ThemeSelector() {
  const themeConfig = useProviderConfig('theme');

  return (
    <select>
      {themeConfig.availableThemes?.map(theme => (
        <option key={theme} value={theme}>{theme}</option>
      ))}
    </select>
  );
}
```

## Configuration Formats

### JSON (.mourn.json)

```json
{
  "version": "1.0",
  "providers": {
    "theme": {
      "enabled": true,
      "defaultTheme": "dark"
    }
  }
}
```

### JavaScript (.mourn.js)

```javascript
module.exports = {
  version: '1.0',
  providers: {
    theme: {
      enabled: true,
      defaultTheme: process.env.THEME || 'dark',
    },
  },
};
```

## API Reference

### Types

- `MournConfig` - Complete configuration interface
- `ThemeName` - Valid theme names
- `ProviderName` - Valid provider names
- `AuthProviderConfig` - Auth provider configuration
- `ThemeProviderConfig` - Theme provider configuration
- `ToastProviderConfig` - Toast provider configuration
- `LoadingProviderConfig` - Loading provider configuration
- `ModalProviderConfig` - Modal provider configuration
- `SettingsProviderConfig` - Settings provider configuration

### Functions

- `readMournConfig()` - Asynchronously read configuration
- `readMournConfigSync()` - Synchronously read configuration (Node only)
- `validateMournConfig(config)` - Validate configuration object
- `debugMournConfig(config)` - Print configuration to console
- `mergeMournConfig(config)` - Merge user config with defaults
- `isMournConfig(value)` - Type guard for configuration

### Components

- `EnvironmentProvider` - Context provider for configuration
- `RoundTable` - Main provider wrapper (now reads from .mourn)

### Hooks

- `useEnvironment()` - Full environment context
- `useMournConfig()` - Configuration object only
- `useProviderEnabled(name)` - Check if provider is enabled
- `useProviderConfig(name)` - Get provider configuration

## Default Configuration

All providers are enabled by default with sensible settings. Users only need to specify what they want to change.

See `DEFAULT_MOURN_CONFIG` in [mourn.types.ts](./mourn.types.ts) for complete defaults.

## Documentation

For complete documentation, see:
- [MOURN_CONFIGURATION.md](../docs/MOURN_CONFIGURATION.md) - Complete guide
- [.mourn.example.json](../../../.mourn.example.json) - JSON example
- [.mourn.example.js](../../../.mourn.example.js) - JavaScript example with comments
