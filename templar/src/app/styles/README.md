# Templar Theme System

A comprehensive, accessible theme system built with CSS custom properties and TypeScript utilities.

## Theme Structure

```
src/app/styles/
├── index.css              # Main theme system imports
├── themes.ts              # TypeScript utilities and constants
└── themes/
    ├── light.css          # Light theme
    ├── dark.css           # Dark theme
    ├── high-contrast.css  # High contrast theme
    ├── sepia.css          # Sepia/warm theme
    └── solarized-dark.css # Solarized dark theme
```

## Available Themes

### Core Themes

#### 🌞 Light
- **Purpose**: Default bright theme for general use
- **Use Case**: Standard daytime usage, well-lit environments
- **Colors**: Clean whites with blue accents

#### 🌙 Dark
- **Purpose**: Low-light environments, battery saving on OLED screens
- **Use Case**: Night usage, dark environments, battery conservation
- **Colors**: Deep blacks with blue accents

### Accessibility Themes

#### ⚡ High Contrast
- **Purpose**: Maximum readability for low-vision users
- **Use Case**: Users with visual impairments, compliance requirements
- **Colors**: Pure black and white with maximum contrast ratios
- **Features**: Enhanced focus indicators, stronger borders

### Comfort Themes

#### 📖 Sepia
- **Purpose**: Comfortable reading mode, reduces eye strain
- **Use Case**: Extended reading sessions, late evening use
- **Colors**: Warm paper-like tones, reduced blue light
- **Features**: Enhanced font smoothing for readability

### Developer Themes

#### 💻 Solarized Dark
- **Purpose**: Developer-friendly balanced contrast, popular in coding tools
- **Use Case**: Code editing, terminal work, development environments
- **Colors**: Ethan Schoonover's famous Solarized palette
- **Features**: Syntax highlighting support, balanced contrast

### Utility Themes

#### 🔄 System
- **Purpose**: Follow OS preference automatically
- **Behavior**: Switches between light/dark based on system setting

#### ⏰ Auto
- **Purpose**: Time-based switching
- **Behavior**: Light during day (6 AM - 6 PM), dark at night

## Usage

### CSS Custom Properties

All themes use standardized CSS custom properties:

```css
/* Basic usage */
.my-component {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}

/* Component states */
.my-button {
  background: var(--primary);
  color: var(--primary-foreground);
}

.my-button:hover {
  background: var(--primary-hover);
}
```

### TypeScript Utilities

```typescript
import { 
  THEME_NAMES, 
  getThemeInfo, 
  isDarkTheme,
  getAccessibilityThemes 
} from '@/styles/themes';

// Get theme information
const themeInfo = getThemeInfo(THEME_NAMES.SEPIA);
console.log(themeInfo.description); // "Comfortable reading mode, reduces eye strain"

// Check if theme is dark
const isSepiaDark = isDarkTheme(THEME_NAMES.SEPIA); // false

// Get accessibility themes
const a11yThemes = getAccessibilityThemes(); // [high-contrast theme]
```

### Theme Provider Integration

```tsx
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      {availableThemes.map(t => (
        <button key={t} onClick={() => setTheme(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}
```

## CSS Variables Reference

### Colors
- `--background` / `--foreground` - Base page colors
- `--primary` / `--primary-foreground` - Primary action colors
- `--secondary` / `--secondary-foreground` - Secondary action colors
- `--accent` / `--accent-foreground` - Accent/highlight colors

### Semantic Colors
- `--success` / `--success-foreground` - Success states
- `--warning` / `--warning-foreground` - Warning states
- `--error` / `--error-foreground` - Error states
- `--info` / `--info-foreground` - Information states

### UI Elements
- `--border` / `--border-hover` - Border colors
- `--muted` / `--muted-foreground` - Muted/disabled content
- `--card` / `--card-foreground` - Card/surface colors
- `--input` / `--input-border` / `--input-placeholder` - Form controls

### Shadows
- `--shadow-sm` - Small shadows
- `--shadow` - Default shadows
- `--shadow-md` - Medium shadows
- `--shadow-lg` - Large shadows

## Component Classes

Pre-built component classes using the theme system:

```css
.templar-card { /* Card component */ }
.templar-button { /* Primary button */ }
.templar-button--secondary { /* Secondary button */ }
.templar-input { /* Input field */ }
```

## Best Practices

1. **Always use CSS variables** instead of hardcoded colors
2. **Test all themes** during development
3. **Consider accessibility** - ensure sufficient contrast
4. **Provide theme selection** for users with specific needs
5. **Respect user preferences** - default to system theme when possible

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Prefers-color-scheme media query support
- Smooth transitions between theme changes
