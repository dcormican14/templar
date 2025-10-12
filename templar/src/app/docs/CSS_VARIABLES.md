# CSS Variables in Templar Design System

The Templar design system uses a comprehensive CSS variable system that provides granular control over theming across all components. The system supports 7 built-in themes and allows for extensive customization.

## Features

- **Comprehensive Variable System**: Over 80+ CSS variables per theme for complete control
- **Automatic Theme Updates**: All variables update instantly when themes change
- **TypeScript Integration**: Full type safety through the `useCSSVariables()` hook
- **Multiple Access Methods**: Direct CSS, React hooks, and utility functions
- **Cross-Component Consistency**: Universal variable naming ensures consistency

## Available Themes

- `light` - Clean light theme for bright environments
- `dark` - Low-light dark theme optimized for OLED screens
- `dark-test` - Enhanced dark theme with additional variable coverage
- `high-contrast` - Accessibility-focused high contrast theme
- `sepia-light` - Warm vintage light mode
- `sepia-dark` - Warm vintage dark mode
- `solarized-dark` - Popular Solarized dark color scheme

## CSS Variables Available

All themes include these comprehensive CSS variables:

### Base Colors (Enhanced)
```css
/* Background variations */
--background           /* Primary background */
--background-hover     /* Background hover state */
--background-accent    /* Background accent/subtle */
--background-shadow    /* Background for shadows */
--background-disabled  /* Disabled background */
--background-border    /* Background for borders */
--background-font      /* Background when used as font color */

/* Foreground variations */
--foreground           /* Primary text/foreground */
--foreground-hover     /* Foreground hover state */
--foreground-accent    /* Foreground accent/muted */
--foreground-shadow    /* Foreground for shadows */
--foreground-disabled  /* Disabled foreground */
--foreground-border    /* Foreground for borders */
--foreground-font      /* Foreground when used as background */
```

### Primary Color System
```css
--primary              /* Main primary color */
--primary-background   /* Primary background shade */
--primary-foreground   /* Text on primary backgrounds */
--primary-hover        /* Primary hover state */
--primary-accent       /* Primary accent variation */
--primary-shadow       /* Primary shadow color */
--primary-disabled     /* Disabled primary state */
--primary-border       /* Primary border color */
--primary-font         /* Primary as font color */
```

### Secondary Color System
```css
--secondary            /* Main secondary color */
--secondary-background /* Secondary background shade */
--secondary-foreground /* Text on secondary backgrounds */
--secondary-hover      /* Secondary hover state */
--secondary-accent     /* Secondary accent variation */
--secondary-shadow     /* Secondary shadow color */
--secondary-disabled   /* Disabled secondary state */
--secondary-border     /* Secondary border color */
--secondary-font       /* Secondary as font color */
```

### Status Color Systems

**Success Colors:**
```css
--success              --success-background    --success-foreground
--success-hover        --success-accent        --success-shadow
--success-disabled     --success-border        --success-font
```

**Warning Colors:**
```css
--warning              --warning-background    --warning-foreground
--warning-hover        --warning-accent        --warning-shadow
--warning-disabled     --warning-border        --warning-font
```

**Destructive Colors:**
```css
--destructive          --destructive-background --destructive-foreground
--destructive-hover    --destructive-accent     --destructive-shadow
--destructive-disabled --destructive-border     --destructive-font
```

**Info Colors:**
```css
--info                 --info-background       --info-foreground
--info-hover           --info-accent           --info-shadow
--info-disabled        --info-border           --info-font
```

### Legacy Compatibility Variables
```css
--accent / --accent-foreground   /* General accent colors */
--border / --border-hover        /* General borders */
--muted / --muted-foreground     /* Muted/subtle elements */
--error / --error-foreground     /* Error states (aliases destructive) */
--card / --card-foreground       /* Card surfaces */
--input / --input-border / --input-placeholder / --input-foreground
--progress-track / --progress-track-text
```

### Shadow System
```css
--shadow-sm            /* Subtle shadow */
--shadow               /* Standard shadow */
--shadow-md            /* Medium shadow */
--shadow-lg            /* Large shadow */
```

## Usage Methods

### 1. Direct CSS (Traditional)

```css
.my-component {
  /* Using basic variables */
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--primary-border);
  box-shadow: var(--shadow);
}

.my-button {
  /* Using comprehensive color system */
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--primary-border);
  box-shadow: var(--primary-shadow);
}

.my-button:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-accent);
}

.my-button:disabled {
  background-color: var(--primary-disabled);
  color: var(--foreground-disabled);
}

.card-surface {
  /* Comprehensive card styling */
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--background-border);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}
```

### 2. React with useCSSVariables Hook

```tsx
import { useCSSVariables } from '@/providers';

function MyComponent() {
  const cssVars = useCSSVariables();
  
  return (
    <div>
      {/* Basic usage */}
      <div style={{
        backgroundColor: cssVars.primary,
        color: cssVars.primaryForeground,
        padding: '12px 16px',
        borderRadius: '8px',
        border: `1px solid ${cssVars.primaryBorder}`
      }}>
        Primary Component
      </div>
      
      {/* Using comprehensive variables */}
      <button style={{
        backgroundColor: cssVars.secondary,
        color: cssVars.secondaryForeground,
        border: `1px solid ${cssVars.secondaryBorder}`,
        boxShadow: cssVars.secondaryShadow,
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Secondary Button
      </button>
      
      {/* Status indicators */}
      <div style={{
        backgroundColor: cssVars.successBackground,
        color: cssVars.success,
        border: `1px solid ${cssVars.successBorder}`,
        padding: '8px',
        borderRadius: '4px'
      }}>
        Success Message
      </div>
    </div>
  );
}
```

### 3. Component Styling Patterns

```tsx
import { useCSSVariables } from '@/providers';

function StyledCard({ variant = 'default', children }) {
  const cssVars = useCSSVariables();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: cssVars.primaryBackground,
          color: cssVars.primary,
          borderColor: cssVars.primaryBorder,
        };
      case 'success':
        return {
          backgroundColor: cssVars.successBackground,
          color: cssVars.success,
          borderColor: cssVars.successBorder,
        };
      case 'warning':
        return {
          backgroundColor: cssVars.warningBackground,
          color: cssVars.warning,
          borderColor: cssVars.warningBorder,
        };
      default:
        return {
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
          borderColor: cssVars.backgroundBorder,
        };
    }
  };
  
  return (
    <div style={{
      ...getVariantStyles(),
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid',
      boxShadow: cssVars.shadowSm,
    }}>
      {children}
    </div>
  );
}
```

### 4. Dynamic Theme-Aware Components

```tsx
import { useCSSVariables, useSettings } from '@/providers';

function ThemeAwareButton({ variant, children, ...props }) {
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  
  const getButtonStyles = () => {
    const baseStyles = {
      padding: '8px 16px',
      borderRadius: '6px',
      border: '1px solid',
      cursor: 'pointer',
      transition: settings.appearance.animations ? 
        'all 200ms var(--animation-spring)' : 'none',
    };
    
    switch (variant) {
      case 'solid':
        return {
          ...baseStyles,
          backgroundColor: cssVars.primary,
          color: cssVars.primaryForeground,
          borderColor: cssVars.primaryBorder,
          boxShadow: cssVars.primaryShadow,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: cssVars.primary,
          borderColor: cssVars.primaryBorder,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: cssVars.primaryBackground,
          color: cssVars.primary,
          borderColor: 'transparent',
        };
      default:
        return baseStyles;
    }
  };
  
  return (
    <button style={getButtonStyles()} {...props}>
      {children}
    </button>
  );
}
```

## Variable Access Patterns

### TypeScript-Safe Access

```tsx
import { useCSSVariables } from '@/providers';

function MyComponent() {
  const cssVars = useCSSVariables();
  
  // All variables are available as camelCase properties
  const styles = {
    // Base colors
    backgroundColor: cssVars.background,
    color: cssVars.foreground,
    
    // Primary system
    primaryColor: cssVars.primary,
    primaryBg: cssVars.primaryBackground,
    primaryText: cssVars.primaryForeground,
    primaryHover: cssVars.primaryHover,
    
    // Status colors
    successColor: cssVars.success,
    warningColor: cssVars.warning,
    errorColor: cssVars.error, // Alias for destructive
    infoColor: cssVars.info,
    
    // Shadows and effects
    shadow: cssVars.shadow,
    shadowMd: cssVars.shadowMd,
  };
  
  return <div style={styles}>Content</div>;
}
```

### CSS Custom Properties Access

```tsx
// When you need to access variables in CSS-in-JS or styled-components
const dynamicStyles = {
  // Direct CSS variable reference
  backgroundColor: 'var(--primary)',
  color: 'var(--primary-foreground)',
  
  // With fallbacks
  borderColor: 'var(--primary-border, #ccc)',
  
  // Computed values
  boxShadow: `0 2px 4px var(--primary-shadow)`,
}
```

## Variable Naming Convention

The Templar system follows a consistent naming pattern:

### CSS Variables (kebab-case)
- `--primary` (main color)
- `--primary-background` (background shade)
- `--primary-foreground` (text on primary)
- `--primary-hover` (hover state)
- `--primary-accent` (accent variation)
- `--primary-shadow` (shadow color)
- `--primary-disabled` (disabled state)
- `--primary-border` (border color)
- `--primary-font` (as font color)

### TypeScript Properties (camelCase)
- `cssVars.primary`
- `cssVars.primaryBackground`
- `cssVars.primaryForeground`
- `cssVars.primaryHover`
- `cssVars.primaryAccent`
- etc.

## Theme Structure Example

Each theme defines all variables in this structure:

```css
[data-theme="theme-name"] {
  /* Base system */
  --background: #color;
  --background-hover: #color;
  --background-accent: #color;
  --background-shadow: rgba(...);
  --background-disabled: #color;
  --background-border: #color;
  --background-font: #color;
  
  --foreground: #color;
  --foreground-hover: #color;
  --foreground-accent: #color;
  --foreground-shadow: rgba(...);
  --foreground-disabled: #color;
  --foreground-border: #color;
  --foreground-font: #color;
  
  /* Color systems (primary, secondary, success, warning, destructive, info) */
  --primary: #color;
  --primary-background: #color;
  --primary-foreground: #color;
  --primary-hover: #color;
  --primary-accent: #color;
  --primary-shadow: rgba(...);
  --primary-disabled: #color;
  --primary-border: #color;
  --primary-font: #color;
  
  /* Repeat for secondary, success, warning, destructive, info */
  
  /* Legacy compatibility */
  --accent: #color;
  --border: #color;
  --muted: #color;
  --error: #color; /* Alias for destructive */
  --card: #color;
  --input: #color;
  /* etc. */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px ...;
  --shadow: 0 1px 3px ...;
  --shadow-md: 0 4px 6px ...;
  --shadow-lg: 0 10px 15px ...;
}
```

## Benefits

1. **Comprehensive Coverage**: 80+ variables per theme for complete control
2. **Granular Control**: Separate variables for hover, disabled, accent states
3. **Theme Consistency**: All components automatically use current theme
4. **Instant Updates**: Colors change immediately when themes switch
5. **TypeScript Safety**: Full type checking prevents variable name errors
6. **Performance**: CSS variables are handled natively by the browser
7. **Flexibility**: Multiple access methods (CSS, React hooks, utility functions)
8. **Accessibility**: High-contrast and specialized accessibility themes
9. **Future-Proof**: Easy to extend with additional variables

## Adding Custom Variables

### Method 1: Extend Theme Files
Add to all theme files in `src/app/styles/themes/`:

```css
[data-theme="light"] {
  --my-custom-color: #123456;
  --my-custom-background: #f0f0f0;
}

[data-theme="dark"] {
  --my-custom-color: #abcdef;
  --my-custom-background: #2a2a2a;
}
```

### Method 2: Runtime CSS Variables
```tsx
useEffect(() => {
  document.documentElement.style.setProperty('--my-dynamic-color', computedColor);
}, [computedColor]);
```

### Method 3: Component-Level Variables
```tsx
function MyComponent() {
  return (
    <div style={{
      '--local-color': '#ff6b6b',
      backgroundColor: 'var(--local-color)',
    } as React.CSSProperties}>
      Component with local variable
    </div>
  );
}
```

## Best Practices

### 1. Use Semantic Names
```tsx
// ✅ Good - semantic and descriptive
backgroundColor: cssVars.primaryBackground,
borderColor: cssVars.successBorder,

// ❌ Bad - non-semantic
backgroundColor: '#ff0000',
borderColor: 'green',
```

### 2. Leverage the Comprehensive System
```tsx
// ✅ Good - uses specific state variables
<button style={{
  backgroundColor: cssVars.primary,
  color: cssVars.primaryForeground,
  border: `1px solid ${cssVars.primaryBorder}`,
  boxShadow: cssVars.primaryShadow,
}}>
  Primary Button
</button>

// ❌ Less ideal - generic variables
<button style={{
  backgroundColor: cssVars.primary,
  color: 'white',
  border: `1px solid ${cssVars.border}`,
}}>
  Button
</button>
```

### 3. Test Across All Themes
```tsx
// Ensure your components work with all themes
const themes = ['light', 'dark', 'high-contrast', 'sepia-light', 'sepia-dark', 'solarized-dark'];
themes.forEach(theme => {
  // Test component appearance and contrast
});
```

### 4. Use TypeScript
```tsx
import { useCSSVariables } from '@/providers';

// ✅ TypeScript will catch typos and provide autocomplete
const cssVars = useCSSVariables();
const color = cssVars.primaryBackgrond; // Error: Property doesn't exist
const correctColor = cssVars.primaryBackground; // ✅ Correct
```

### 5. Prefer Theme Variables Over Hardcoded Values
```tsx
// ✅ Good - respects user's theme choice
color: cssVars.foreground,
backgroundColor: cssVars.background,

// ❌ Bad - ignores theme settings
color: 'black',
backgroundColor: 'white',
```

## Migration Guide

### From Old System
If migrating from the basic variable system:

```tsx
// Old way
backgroundColor: cssVars.primary,
color: cssVars.primaryForeground,

// New way (more specific)
backgroundColor: cssVars.primary,
color: cssVars.primaryForeground,
borderColor: cssVars.primaryBorder, // New
boxShadow: cssVars.primaryShadow,   // New
```

### Legacy Compatibility
All existing variable names are still supported:
- `--error` → maps to `--destructive`
- `--muted` → still available
- `--border` → still available
- `--card` → still available

This ensures backward compatibility while providing enhanced theming capabilities.
